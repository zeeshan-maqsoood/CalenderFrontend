import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector } from 'react-redux';


const Calendar = () => {
  const privateEventsData = useSelector(
    (state) => state?.events?.allData?.PrivateEvents
  );
  const publicEventsData = useSelector(
    (state) => state?.events?.allData?.PublicEvents
  );
  const sidebarValue = useSelector((state) => state?.events?.sidebarValue);

  const [eventsData, setEventsData] = useState(
    sidebarValue === 'privatecalenderview' || sidebarValue === 'privatelistview'
      ? privateEventsData
      : sidebarValue === 'calenderview' || sidebarValue === 'calenderlistview'
      ? publicEventsData
      : sidebarValue === null
      ? publicEventsData
      : null
  );

 

  useEffect(() => {
    setEventsData(
      sidebarValue === 'privatecalenderview' ||
        sidebarValue === 'privatelistview'
        ? privateEventsData
        : sidebarValue === 'calenderview' || sidebarValue === 'calenderlistview'
        ? publicEventsData
        : sidebarValue === null
        ? publicEventsData
        : null
    );
  }, [privateEventsData, publicEventsData, eventsData]);

  const handleDateClick = (arg) => {
    alert(`Clicked on date: ${arg.date}`);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventsData}
        dateClick={handleDateClick}
      />
    </>
  );
};

export default Calendar;
