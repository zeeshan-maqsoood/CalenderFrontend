import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { signupSchema } from '../YupSchema/index';
import { SignupApi } from '../API/authenticationApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';

export default function Signup() {
  const [error, setError] = useState(false);
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  setTimeout(() => {
    setError(false);
  }, 8000);
  const res = useSelector((state) => state.signup);
 
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: async (values, action) => {
        try {
          await SignupApi(values, dispatch);
          const signupData = JSON.parse(localStorage.getItem('signup'));
         
          if (signupData === 200) {
            setError(false);
            navigate('/login');
          } else {
            setError(true);
          }
        } catch (error) {
          
        }
        
      },
    });

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Zee Calender</h2>
                  <p className=" mb-2">Please Register Yourself</p>
                  <div className="mb-1">
                    <Form onSubmit={handleSubmit}>
                      {error ? (
                        <>
                          <Alert variant="danger">{res.signupError}</Alert>
                        </>
                      ) : null}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Name"
                        />
                        <p className="mt-2 text-danger">
                          {errors.name && touched.name ? errors.name : null}
                        </p>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter email"
                        />
                        <p className="mt-2 text-danger">
                          {errors.email && touched.email ? errors.email : null}
                        </p>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Password"
                        />
                        <p className="mt-2 text-danger">
                          {errors.password && touched.password
                            ? errors.password
                            : null}
                        </p>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Password"
                        />
                        <p className="mt-2 text-danger">
                          {errors.confirmPassword && touched.confirmPassword
                            ? errors.confirmPassword
                            : null}
                        </p>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Signup
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{' '}
                        <Link to="/login" className="text-primary fw-bold">
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
