import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavSidebar from '../Components/NavSidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FullCalenderComponent from '../Components/FullCalender';
import NavbarComponent from '../Components/NavbarComponent';
import TableComponent from '../Components/TableComponent';
import { getEventsAPi } from '../API/EventsApi';
import { useDispatch, useSelector } from 'react-redux';
// import NavSidebar from '../Components/NavSidebar';
const Home = () => {
  const [tab, setTab] = useState();
  const [view, setView] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [privateEvents, setPrivateEvents] = useState([]);
  const [publicEvents, setPublicEvents] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    getEventsAPi(dispatch);
  }, []);
  
  return (
    <>
      <Container fluid>
        <NavbarComponent setIsLogin={setIsLogin} isLogin={isLogin} />
        <Row>
          <Col>
            <NavSidebar setView={setView} isLogin={isLogin} />
          </Col>
          <Col xs={6} className="me-2">
            {view === true ? (
              <>
                <FullCalenderComponent />
              </>
            ) : (
              <>
                <TableComponent />
              </>
            )}
          </Col>
          <Col className="mt-3">
            <div>
              <Calendar value={new Date()} />
            </div>
          </Col>
        </Row>
      </Container>
      {/* <NavSidebar /> */}
      {/* <NavbarComponent /> */}
      {/* <Calendar /> */}

      {/* <FullCalenderComponent /> */}
      {/* <TableComponent /> */}
    </>
  );
};

export default Home;
