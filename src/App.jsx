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
  const handleRequest = (params) => {
    axios.post("http://localhost:3000/messages.json", params).then((response) => {
      console.log(response.data);
      setChannels(response.data.channels);
      setCurrentChannel(response.data.channels[0].name);
      setMessages(response.data.messages);
    });
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
