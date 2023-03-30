export function Channels(props) {
  return (
    <div className="col-12 col-lg-5 col-xl-3 border-right">
      <div className="px-4 d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <input type="text" className="form-control my-3" placeholder="Search..." />
          </div>
        </div>
      </div>
      <div className="d-grid gap-1">
        {props.channels.map((channel) => (
          <div key={channel.id} className="p-2 mx-auto">
            <a href="#" className="list-group-item list-group-item-action border-0">
              <div className="d-flex">
                <div className="flex-grow-1 ml-3">#{channel.name}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
}
