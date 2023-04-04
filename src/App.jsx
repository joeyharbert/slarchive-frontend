import "./App.css";
import { Channels } from "./Channels";
import { Messages } from "./Messages";
import axios from "axios";
import { UploadForm } from "./UploadForm";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import logo from "./assets/slarchive.png";

function App() {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentChannel, setCurrentChannel] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleRequest = (params, hideModal, errorCallback) => {
    errorCallback([]);
    setIsLoading(true);
    hideModal();
    axios
      .post("/messages.json", params)
      .then((response) => {
        // console.log(response.data);
        setChannels(response.data.channels);
        setCurrentChannel(response.data.channels[0].name);
        setMessages(formatUsers(response.data.messages, response.data.users));
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        errorCallback(error.response.data.errors);
        setIsLoading(false);
      });
  };

  const formatUsers = (m, users) => {
    let formatted_m = {};
    for (const [key, value] of Object.entries(m)) {
      formatted_m[key] = value.map((message) => {
        //make sure each message has a user_profile
        if (!message.user_profile) {
          const user = users.filter((user) => user.id === message.user)?.[0];

          message.user_profile = user?.profile;
        }
        //replace @mentions with display name
        if (message.text.match(/<@[A-Za-z0-9]*>/)) {
          message.text.match(/<@[A-Za-z0-9]*>/).forEach((user) => {
            const userIdd = user.substr(2, 11);
            const userObject = users.filter((user) => user.id === userIdd)?.[0];
            // console.log(userObject.profile);
            const userName = userObject.profile.display_name
              ? userObject.profile.display_name
              : userObject.profile.real_name;
            message.text = message.text.replace(user, `<@${userName}>`);
          });
        }
        return message;
      });
    }

    return formatted_m;
  };

  return (
    <main className="content container mt-4">
      <UploadForm onUploadFile={handleRequest} />
      <div className="container">
        <h1 className="h3">
          slarchive <img src={logo} className="logo" />
        </h1>

        <div className="card mb-5">
          <div className="row g-0">
            <Channels
              channels={channels}
              currentChannel={currentChannel}
              setCurrentChannel={setCurrentChannel}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            />

            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center mb-5">
                <Spinner animation="border" size="lg" variant="primary" />
              </div>
            ) : (
              <Messages messages={messages} currentChannel={currentChannel} searchFilter={searchFilter} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
