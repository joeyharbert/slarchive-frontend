import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export function UploadForm(props) {
  const [show, setShow] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUploadFile(params, () => setShow(false));
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Select slack zipfile for upload</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
}
