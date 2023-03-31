import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginError: null,
  signupError: null,
  isLogin:false
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setLoginError: (state, action) => {
      state.loginError = action.payload;
      state.signupError = null;
    },
    setSignupError: (state, action) => {
      state.loginError = null;
      state.signupError = action.payload;
    },
    setIsLoginUser:(state,action)=>{
      state.loginError=null;
      state.signupError=null;
      state.isLogin=action.payload
    }
  },
});

export const { setLoginError, setSignupError,setIsLoginUser } = signupSlice.actions;

export default signupSlice.reducer;
