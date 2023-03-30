export function UploadForm(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUploadFile(params);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="slackFile" className="form-label">
          Slack Zip File
        </label>
        <input className="form-control" id="slackFile" type="file" name="slack_file" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
