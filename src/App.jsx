import "./App.css";
import { Channels } from "./Channels";
import { Messages } from "./Messages";

function App() {
  return (
    <main className="content">
      <div className="container p-0">
        <h1 className="h3 mb-3">Messages</h1>

        <div className="card">
          <div className="row g-0">
            <Channels channels={[]} />
            <Messages messages={[]} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
