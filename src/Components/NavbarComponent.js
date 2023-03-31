import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ModalComponent from '../Modal/ModalComponent';


const NavbarComponent = ({ setIsLogin, isLogin }) => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);

  const loginUser = JSON.parse(localStorage.getItem('loginUser'));

  useEffect(() => {
    if (loginUser) {
      setIsLogin(true);
    } else if (loginUser && loginUser?.data?.role === 'admin') {
      setAdmin(true);
      setIsLogin(true);
    } else if (!loginUser) {
      navigate('/');
    }
  }, []);
 

  const handleLogoutFunction = () => {
    localStorage.removeItem('loginUser');
    setIsLogin(false);
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Zee Calender</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 px-3"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {loginUser && loginUser?.data.role === 'admin' ? (
                <>
                  <ModalComponent navbar={'navbar'} />
                </>
              ) : null}

              {isLogin ? (
                <>
                  <Link
                    to="/"
                    onClick={handleLogoutFunction}
                    className="signup"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="signup">
                    Login
                  </Link>
                  <Link to="/signup" className="ms-3 signup">
                    Sign Up
                  </Link>
                </>
              )}
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>{' '}
    </>
  );
};

export default NavbarComponent;
