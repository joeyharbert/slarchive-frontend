import "./App.css";
import { Channels } from "./Channels";
import { Messages } from "./Messages";
import axios from "axios";
import { UploadForm } from "./UploadForm";
import { useState } from "react";

function App() {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentChannel, setCurrentChannel] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const handleRequest = (params, callback, errorCallback) => {
    errorCallback([]);
    axios
      .post("http://localhost:3000/messages.json", params)
      .then((response) => {
        console.log(response.data);
        setChannels(response.data.channels);
        setCurrentChannel(response.data.channels[0].name);
        setMessages(formatUsers(response.data.messages, response.data.users));
        callback();
      })
      .catch((error) => {
        console.log(error);
        errorCallback(error.response.data.errors);
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
            console.log(userObject.profile);
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
    <main className="content container mt-5">
      <UploadForm onUploadFile={handleRequest} />
      <div className="container p-0">
        <h1 className="h3 mb-3">slarchive</h1>

        <div className="card">
          <div className="row g-0">
            <Channels
              channels={channels}
              currentChannel={currentChannel}
              setCurrentChannel={setCurrentChannel}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            />
            <Messages messages={messages} currentChannel={currentChannel} searchFilter={searchFilter} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
