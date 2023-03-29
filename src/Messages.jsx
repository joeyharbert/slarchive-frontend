import ReactMarkdown from "react-markdown";

export function Messages(props) {
  const channel = "exercises";
  const formatMessage = (message) => {
    message = message.replace(/`</g, "`");
    message = message.replace(/>`/g, "`");

    const linebreakArray = message.split("\n").map((i, key) => {
      return <ReactMarkdown key={key}>{i}</ReactMarkdown>;
    });
    return linebreakArray;
  };
  return (
    <div className="col-12 col-lg-7 col-xl-9">
      <div className="py-2 px-4 border-bottom d-none d-lg-block"></div>
      <div className="position-relative">
        <div className="chat-messages p-4">
          {props.messages.map((message) => (
            <div className="chat-message-left pb-4" key={message.client_msg_id}>
              <div>
                <img
                  src={message.user_profile.image_72.replace(/\\\//g, "/")}
                  className="rounded-circle mr-1"
                  alt="Sharon Lessman"
                  width="40"
                  height="40"
                />
                <div className="text-muted small text-nowrap mt-2">2:34 am</div>
              </div>
              <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3 text-left">
                <div className="font-weight-bold mb-1">{message.user_profile.display_name}</div>
                {formatMessage(message.text)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
