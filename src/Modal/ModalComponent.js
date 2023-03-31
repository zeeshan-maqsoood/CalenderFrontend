import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { eventSchema } from '../YupSchema/EventsSchema';
import { AddEventApi } from '../API/EventsApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { EditDataApi } from '../API/EventsApi';

function ModalComponent({ edit, row, navbar }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues = {
    title: '',
    description: '',
    data: '',
    startsAt: '',
    endsAt: '',
    type: '',
  };
  const [editData, setEditData] = useState(row);
  const SidebarValue = useSelector((state) => state.events.SidebarValue);
  const eventStatus = JSON.parse(localStorage.getItem('events'));
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: eventSchema,
      onSubmit: (values, action) => {
        try {
          AddEventApi(values, dispatch);
          setShow(false);
          if (eventStatus === 200) {
            toast.success('Your Event has been Added', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          action.resetForm();
        } catch (error) {}
      },
    });

  const handleChangeFunction = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  
  const handleSubmitFunction = () => {
    EditDataApi(editData, dispatch);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {edit === 'edit' ? 'Edit Events' : 'Add Event'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {edit === 'edit' ? 'Edit Event' : 'Add Event'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {edit === 'edit' ? (
            <>
              {' '}
              <Form onSubmit={handleSubmitFunction}>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    // defaultValue={row.title}
                    value={editData.title}
                    onChange={handleChangeFunction}
                    // onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    // defaultValue={row.description}
                    value={editData.description}
                    onChange={handleChangeFunction}
                    // onBlur={handleBlur}
                  />
                </Form.Group>
                <p className="text-danger"></p>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    placeholder="Enter Date"
                    // defaultValue={row.date}
                    value={editData.date}
                    onChange={handleChangeFunction}
                    // onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Starts at</Form.Label>
                  <Form.Control
                    type="time"
                    name="startsAt"
                    placeholder=" Enter starts At Data"
                    // defaultValue={row.startsAt}
                    value={editData.startsAt}
                    onChange={handleChangeFunction}
                    // onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Ends at</Form.Label>
                  <Form.Control
                    type="time"
                    name="endsAt"
                    placeholder="Enter Ends At Date"
                    // defaultValue={row.endsAt}
                    value={editData.endsAt}
                    onChange={handleChangeFunction}
                    // onBlur={handleBlur}
                  />
                </Form.Group>

                <Form.Label>Type of:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="type"
                  // defaultValue={row.typeOf}
                  value={editData.typeOf}
                  onChange={handleChangeFunction}
                  // onBlur={handleBlur}
                >
                  <option>Select type</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </Form.Select>
              </Form>
            </>
          ) : (
            <>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <p className="text-danger">
                  {errors.title && touched.title ? errors.title : null}
                </p>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <p className="text-danger">
                  {errors.description && touched.description
                    ? errors.description
                    : null}
                </p>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    placeholder="Enter Date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <p className="text-danger">
                  {errors.date && touched.date ? errors.date : null}
                </p>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Starts at</Form.Label>
                  <Form.Control
                    type="time"
                    name="startsAt"
                    placeholder=" Enter starts At Data"
                    value={values.startsAt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <p className="text-danger">
                  {errors.startsAt && touched.startsAt ? errors.startsAt : null}
                </p>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Ends at</Form.Label>
                  <Form.Control
                    type="time"
                    name="endsAt"
                    placeholder="Enter Ends At Date"
                    value={values.endsAt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <p className="text-danger">
                  {errors.endsAt && touched.endsAt ? errors.endsAt : null}
                </p>
                <Form.Label>Type of:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Select type</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.type && touched.type ? errors.type : null}
                </p>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={edit === 'edit' ? handleSubmitFunction : handleSubmit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default ModalComponent;
