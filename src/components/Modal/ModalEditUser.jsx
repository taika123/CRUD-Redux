import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, ModalBody } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { addNewUser, putUpdateUser } from "../services/UserService";
import { ToastContainer, toast } from "react-toastify";

function ModalEditUser(props) {
  const { show, handleClose, dataUserEdit, handleEditModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updatedAt) {
      //success
      handleEditModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      handleClose();
      toast.success("Edit successfully");
    }
    console.log(res, "edit user");
  };

  // console.log(dataUserEdit, "dataUserEdit");
  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
      setJob(dataUserEdit.email);
    }
  }, [dataUserEdit]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit New User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
