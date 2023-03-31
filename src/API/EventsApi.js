import axios from 'axios';
import { setEvents } from '../Redux/EventsSlice';

export const AddEventApi = async (values, dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000', {
      headers: {
        'Content-Type': 'application/json',
      },
      values,
    });

    if (res.status === 200) {
      localStorage.setItem('events', JSON.stringify(res.status));

      dispatch(
        setEvents({
          PublicEvents: res.data.PublicEvents,
          PrivateEvents: res.data.PrivateEvents,
        })
      );
    }
  } catch (error) {}
};

export const getEventsAPi = async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch(
      setEvents({
        PublicEvents: res.data.PublicEvents,
        PrivateEvents: res.data.PrivateEvents,
      })
    );
  } catch (error) {
    console.log(error, 'error');
  }
};
export const deleteApiFunction = async (id, dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:5000/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(
      setEvents({
        PublicEvents: res.data.PublicEvents,
        PrivateEvents: res.data.PrivateEvents,
      })
    );
  } catch (error) {}
};

export const EditDataApi = async (values, dispatch) => {
  try {
    const res = await axios.put('http://localhost:5000', {
      headers: {
        'Content-Type': 'application/json',
      },
      values,
    });
    dispatch(
      setEvents({
        PublicEvents: res.data.PublicEvents,
        PrivateEvents: res.data.PrivateEvents,
      })
    );
  } catch (error) {}
};
