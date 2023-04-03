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
  const handleRequest = (params, callback) => {
    axios.post("http://localhost:3000/messages.json", params).then((response) => {
      console.log(response.data);
      setChannels(response.data.channels);
      setCurrentChannel(response.data.channels[0].name);
      setMessages(formatUsers(response.data.messages, response.data.users));
      callback();
    });
  };

  const formatUsers = (m, users) => {
    let formatted_m = {};
    for (const [key, value] of Object.entries(m)) {
      formatted_m[key] = value.map((message) => {
        if (!message.user_profile) {
          const user = users.filter((user) => user.id === message.user)?.[0];

          message.user_profile = user?.profile;
        }
        return message;
      });
    }

    return formatted_m;
  };

  return (
    <main className="content">
      <UploadForm onUploadFile={handleRequest} />
      <div className="container p-0">
        <h1 className="h3 mb-3">Messages</h1>

        <div className="card">
          <div className="row g-0">
            <Channels channels={channels} currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} />
            <Messages messages={messages} currentChannel={currentChannel} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
