import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchDataUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import "./TableUser.scss";
import ModalAddNewUser from "../Modal/ModalCreateUser";
import ModalEditUser from "../Modal/ModalEditUser";
import _ from "lodash";
import ModalDelete from "../Modal/ModalDelete";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";

function TableUser() {
  const [listUsers, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totolPages, setTotolPages] = useState(0);

  const [show, setShow] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setdataUserEdit] = useState([]);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setdataUserDelete] = useState([]);

  //state sort by user
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  // search
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setIsShowModalEdit();
    setShow();
    setIsShowModalDelete();
  };

  //get data users
  const getUsers = async (page) => {
    let res = await fetchDataUser(page);

    if (res && res.data) {
      setTotalUsers(res.total);
      setTotolPages(res.total_pages);
      setListUser(res.data);
    }
  };

  const handleUpdateTable = (user) => {
    // console.log(user, "users updated");
    setListUser([user, ...listUsers]);
  };

  //handle edit form modal
  const handleEditModal = (user) => {
    // let cloneListUser = [...listUsers];
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;

    setListUser(cloneListUser);
    // console.log(listUsers, "listUsers ");
    // console.log(index, "index", cloneListUser, "cloneListUser");
    // console.log(user, "handleEditModal");
  };

  const handleEditUser = (user) => {
    // console.log(user, "users");
    setdataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleDeleteUser = (user) => {
    setdataUserDelete(user);
    setIsShowModalDelete(true);
  };

  const handleDeleleFormUser = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = listUsers.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };

  //sort by
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);

    console.log(cloneListUser);
  };

  //   call api
  useEffect(() => {
    getUsers(1);
  }, []);

  const handlePageClick = (event) => {
    console.log(`Event selected ${event.selected}}`);
    getUsers(+event.selected + 1);
  };

  //handle search field
  const handleSeach = (e) => {
    // setSearch(e.target.value);
    console.log(e.target.value);
    let term = e.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
      console.log(cloneListUser);
    } else {
      getUsers(1);
    }
  };

  //   console.log(listUsers, "listUsers");
  return (
    <>
      <div className="my-3 btn-right">
        <span>List Users:</span>
        <button
          className="btn btn-success "
          onClick={() => {
            setShow(true);
          }}
        >
          Create Users
        </button>
      </div>
      <Search
        placeholder="seach by email address..."
        allowClear
        // onSearch={onSearch}
        // value={search}
        onChange={(e) => handleSeach(e)}
        style={{
          width: 250,
          marginBottom: 15,
        }}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="css-sort">
                <span>ID</span>
                <span>
                  <SortAscendingOutlined
                    onClick={() => handleSort("desc", "id")}
                  />
                  <SortDescendingOutlined
                    onClick={() => handleSort("asc", "id")}
                  />
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>First Name</th>
            <th>
              <div className="css-sort">
                <span>Last Name</span>
                <span>
                  <SortAscendingOutlined
                    onClick={() => handleSort("desc", "first_name")}
                  />
                  <SortDescendingOutlined
                    onClick={() => handleSort("asc", "first_name")}
                  />
                </span>
              </div>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totolPages}
        previousLabel="< "
        renderOnZeroPageCount={null}
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      <ModalAddNewUser
        show={show}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditModal={handleEditModal}
      />
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleleFormUser={handleDeleleFormUser}
      />
    </>
  );
}

export default TableUser;
