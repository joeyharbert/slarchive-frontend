export function Channels(props) {
  const onClick = (channel) => {
    props.setCurrentChannel(channel.name);
  };
  return (
    <div className="col-12 col-lg-5 col-xl-3 border-right">
      <div className="px-4 d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Search..."
              value={props.searchFilter}
              onChange={(e) => props.setSearchFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="d-grid gap-1">
        {props.channels.map((channel) => {
          if (channel.name === props.currentChannel) {
            return (
              <div key={channel.id} className="p-2 mx-auto">
                <a onClick={() => onClick(channel)} className="list-group-item list-group-item-action border-0 fw-bold">
                  <div className="d-flex">
                    <div className="flex-grow-1 ml-3">#{channel.name}</div>
                  </div>
                </a>
              </div>
            );
          }
          return (
            <div key={channel.id} className="p-2 mx-auto">
              <a onClick={() => onClick(channel)} className="list-group-item list-group-item-action border-0">
                <div className="d-flex">
                  <div className="flex-grow-1 ml-3">#{channel.name}</div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
}
