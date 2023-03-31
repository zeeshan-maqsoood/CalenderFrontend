import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from '../Modal/ModalComponent';
import { deleteApiFunction } from '../API/EventsApi';
const data = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Mary', age: 30 },
  { id: 3, name: 'Bob', age: 40 },
];

const TableComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const login = JSON.parse(localStorage.getItem('loginUser'));
  const view = localStorage.getItem('view');
  const privateEventsData = useSelector(
    (state) => state?.events?.allData?.PrivateEvents
  );
  const publicEventsData = useSelector(
    (state) => state?.events?.allData?.PublicEvents
  );
  const sidebarValue = useSelector((state) => state?.events?.sidebarValue);
  const [eventsToShow, setEventsToShow] = useState(
    sidebarValue === 'privatecalenderview' || sidebarValue === 'privatelistview'
      ? privateEventsData
      : publicEventsData
  );
 
  const handleDateClick = (arg) => {
    alert(`Clicked on date: ${arg.date}`);
  };
  useEffect(() => {
    setEventsToShow(
      sidebarValue === 'privatecalenderview' ||
        sidebarValue === 'privatelistview'
        ? privateEventsData
        : publicEventsData
    );
  }, [eventsToShow, privateEventsData, publicEventsData]);
  const handleDeleteFunction = (e, row) => {
    e.preventDefault();
    deleteApiFunction(row._id, dispatch);
  };
  return (
    <>
      <Card bg="light">
        <Card.Body>
          <Table striped bordered hover variant="primary">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Starts At</th>
                <th>Ends At</th>
                {login && login.data.role === 'admin' ? (
                  <>
                    <th>Edit</th>
                    <th>Delete</th>
                  </>
                ) : null}
              </tr>
            </thead>
            {eventsToShow.length < 0 ? (
              <>
                <div className="NotFound">
                  <p className="ms-2">Not Found</p>
                </div>
              </>
            ) : (
              <>
                <tbody>
                  {eventsToShow?.map((row) => (
                    <tr key={row._id}>
                      <td>{row.date}</td>
                      <td>{row.title}</td>
                      <td>{row.startsAt}</td>
                      <td>{row.endsAt}</td>
                      {login && login.data.role === 'admin' ? (
                        <>
                          <td>
                            <ModalComponent edit={"edit"} row={row} />
                          </td>
                          <td>
                            <button
                              className=" btn btn-primary"
                              onClick={(e) => handleDeleteFunction(e, row)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default TableComponent;
