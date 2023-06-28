import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, ModalBody } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { addNewUser } from "../services/UserService";
import { ToastContainer, toast } from "react-toastify";

function ModalAddNewUser(props) {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSubmit = async () => {
    let res = await addNewUser(name, job);

    if (res && res.id) {
      //success
      handleClose();
      setName("");
      setJob("");
      toast.success("Modal added successfully");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      //error
      toast.error("Modal Errors");
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Job"
                value={job}
                onChange={(e) => {
                  setJob(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNewUser;
