import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function UploadForm(props) {
  const [modalShow, setModalShow] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    const successCallback = () => {
      setModalShow(false);
    };
    const failCallback = (errors) => {
      setModalShow(true);
      setErrors(errors);
    };
    props.onUploadFile(params, successCallback, failCallback);
  };

  return (
    <Modal show={modalShow} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Select slack zipfile for parsing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {errors.map((error) => (
            <li key={error} className="text-danger">
              {error}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="slackFile" className="form-label">
              Slack Zip File
            </label>
            <input className="form-control" id="slackFile" type="file" name="slack_file" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
