import ReactMarkdown from "react-markdown";

export function Messages(props) {
  const formatMessage = (message) => {
    message = message.replace(/`</g, "`");
    message = message.replace(/>`/g, "`");
    message = message.replace(/(?<!\n)\n•/g, "\n\n•");
    message = message.replace(/(?<=:)\n/g, "\n\n");
    message = message.replace(/(?<!\n)```/g, "\n```");
    message = message.replace(/```(?!\n)/g, "```\n");

    return message;
  };

  return (
    <div className="col-12 col-lg-7 col-xl-9">
      <div className="py-2 px-4 border-bottom d-none d-lg-block"></div>
      <div className="position-relative">
        <div className="chat-messages p-4">
          {props.currentChannel
            ? props.messages[props.currentChannel].map((message) => {
                return (
                  <div className="chat-message-left pb-4" key={message.client_msg_id} id={message.client_msg_id}>
                    <div>
                      <img
                        src={message.user_profile?.image_72?.replace(/\\\//g, "/")}
                        className="rounded-circle ms-1"
                        alt={message.user_profile?.display_name}
                        width="40"
                        height="40"
                      />
                      <div className="text-muted small text-nowrap mt-1 me-2">
                        {message.user_profile?.display_name
                          ? message.user_profile?.display_name
                          : message.user_profile?.real_name}
                      </div>
                    </div>
                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 text-left">
                      {/* <div className="font-weight-bold mb-1">{message.user_profile?.display_name}</div> */}
                      <ReactMarkdown>{formatMessage(message.text)}</ReactMarkdown>
                      {message.files
                        ? message.files.map((file) => {
                            if (file.mimetype?.substr(0, 5) === "image") {
                              return <img src={file.thumb_360} />;
                            }
                          })
                        : null}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
