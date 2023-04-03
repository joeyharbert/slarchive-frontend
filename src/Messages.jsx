import ReactMarkdown from "react-markdown";

export function Messages(props) {
  const formatMessage = (messageObject) => {
    let message = messageObject.text;
    message = message.replace(/`</g, "`");
    message = message.replace(/>`/g, "`");
    message = message.replace(/(?<!\n)\n•/g, "\n\n•");
    message = message.replace(/(?<=:)\n/g, "\n\n");
    message = message.replace(/(?<!\n)```/g, "\n```");
    message = message.replace(/```(?!\n)/g, "```\n");

    return message;
  };

  const isIncludesFilter = (message) => {
    return (
      message.text.toLowerCase().includes(props.searchFilter.toLowerCase()) ||
      message.user_profile?.display_name.toLowerCase().includes(props.searchFilter.toLowerCase()) ||
      message.date.includes(props.searchFilter)
    );
  };

  return (
    <div className="col-12 col-lg-7 col-xl-9">
      <div className="py-2 px-4 border-bottom d-none d-lg-block"></div>
      <div className="position-relative">
        <div className="chat-messages p-4">
          {props.currentChannel
            ? props.messages[props.currentChannel]
                .filter((message) => isIncludesFilter(message))
                .map((message) => {
                  return (
                    <div className="chat-message-left pb-4 row" key={message.client_msg_id} id={message.client_msg_id}>
                      <div className="col-2">
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
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 text-left col-10">
                        <div className="text-muted small mb-1">{message.date}</div>
                        <ReactMarkdown>{formatMessage(message)}</ReactMarkdown>
                        {message.files
                          ? message.files.map((file) => {
                              if (file.mimetype?.substr(0, 5) === "image") {
                                return <img src={file.thumb_360} key={file.id} />;
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
