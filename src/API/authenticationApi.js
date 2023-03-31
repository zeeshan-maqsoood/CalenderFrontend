import axios from 'axios';
import { setLoginError, setSignupError,setIsLoginUser } from '../Redux/AuthenticationSlice';
export const SignupApi = async (values, dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      values,
    });
    
    localStorage.setItem('signup', JSON.stringify(res.status));
    
  } catch (error) {
    console.log(error, 'error');
    dispatch(setSignupError(error.response.data));
  }
};

export const LoginAPi = async (values, dispatch, navigate) => {
  
  try {
    const res = await axios.post('http://localhost:5000/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      values,
    });
    if (res.status === 200 && res.data.role === 'admin') {
      navigate('/');
      localStorage.removeItem('loginError');
      dispatch(setIsLoginUser(true))
      localStorage.setItem('loginUser', JSON.stringify(res));
    }
    if (res.status === 200 && res.data.role === 'User') {
      navigate('/');
      localStorage.setItem('loginUser', JSON.stringify(res));
      localStorage.removeItem('loginError');
    }
  } catch (error) {
    console.log(error);
    dispatch(setLoginError(error.response.data));
    localStorage.setItem('loginError', JSON.stringify(error.response.data));
  }
};
