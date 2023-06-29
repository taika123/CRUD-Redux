import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchDataUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import "./TableUser.scss";
import ModalAddNewUser from "../Modal/ModalCreateUser";
import ModalEditUser from "../Modal/ModalEditUser";
import _, { debounce, result } from "lodash";
import ModalDelete from "../Modal/ModalDelete";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  PlusCircleOutlined,
  DownloadOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { toast } from "react-toastify";

function TableUser() {
  const [listUsers, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totolPages, setTotolPages] = useState(0);

  //dataexport
  const [dataExport, setDataExport] = useState([]);

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
  const handleSeach = _.debounce((e) => {
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
  }, 300);

  //handle export csv
  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First_name", "Last_name"]);
      listUsers.map((item) => {
        let arr = [];
        (arr[0] = item.id),
          (arr[1] = item.email),
          (arr[2] = item.first_name),
          (arr[3] = item.last_name);
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  //handle import csv
  const handleImportCSV = (e) => {
    // console.log(e);
    let file = e.target.files[0];
    if (file.type !== "text/csv") {
      toast.error("Cannot import file csv because file maximum size");
      return;
    }

    //parse local csv file
    Papa.parse(file, {
      // header: true,
      complete: (result) => {
        let rawCSV = result.data;
        if (rawCSV.length > 0) {
          if (rawCSV[0] && rawCSV[0].length === 4) {
            if (
              rawCSV[0][0] !== "id" ||
              rawCSV[0][1] !== "email" ||
              rawCSV[0][2] !== "first_name" ||
              rawCSV[0][3] !== "last_name"
            ) {
              toast.error("Wrong data header import csv!!!");
            } else {
              let result = [];
              // console.log(rawCSV);
              rawCSV.map((item, i) => {
                if (i > 0 && item.length === 4) {
                  let obj = {};
                  obj.id = item[0];
                  obj.email = item[1];
                  obj.first_name = item[2];
                  obj.last_name = item[3];
                  result.push(obj);
                }
              });
              setListUser(result);
              // console.log(result, "check result");
            }
          } else {
            toast.error("Wrong Format import csv!!!");
          }
        } else {
          toast.error("Not Found import csv!!!");
        }
        // console.log("rawCSV", rawCSV);
        // console.log("finished", result.data);
      },
    });
  };

  //   console.log(listUsers, "listUsers");
  return (
    <>
      <div className="my-3 btn-right">
        <span>List Users:</span>
        <div className="group-btn">
          <label htmlFor="import" className="btn btn-warning">
            <ImportOutlined />
            Import
            <input type="file" className="file" hidden />
            <input
              type="file"
              id="import"
              hidden
              onChange={(e) => handleImportCSV(e)}
            />
          </label>

          {/* <button className="btn btn-warning">
          
          </button> */}
          <CSVLink
            filename={"users.csv"}
            className="btn btn-primary"
            target="_blank"
            data={dataExport}
            asyncOnClick={true}
            onClick={(event, done) => getUsersExport(event, done)}
          >
            <DownloadOutlined />
            Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => {
              setShow(true);
            }}
          >
            <PlusCircleOutlined />
            Create Users
          </button>
        </div>
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
