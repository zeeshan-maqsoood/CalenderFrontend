import { createSlice } from '@reduxjs/toolkit';

const initialValues = {
  allData: null,
  newData:null,
  sidebarValue:null
};

const EventSlice = createSlice({
  name: 'events',
  initialState: initialValues,
  reducers: {
    setEvents: (state, action) => {
      state.allData = action.payload;
      state.newData=null
    },
    setSideBarValue:(state,action)=>{
      
      state.sidebarValue=action.payload
    }
  },
});

export const { setEvents,setSideBarValue } = EventSlice.actions;
export default EventSlice.reducer;
