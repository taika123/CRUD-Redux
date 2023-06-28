import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalDelete(props) {
  const { show, handleClose, dataUserDelete, handleDeleleFormUser } = props;

  const handleSubmit = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      //success
      handleDeleleFormUser(dataUserDelete);
      handleClose();
      toast.success("User deleted successfully");
    }
    console.log(res, "res");
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete user!</h5>
        <p>
          name: <b>{dataUserDelete.first_name}</b> and email:
          <b> {dataUserDelete.email}</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
