import { createSlice } from '@reduxjs/toolkit';

const initialReservationState = {
  createdAt: "",
  room_id: "",
  room_number: "",
  room_type: "",
  desk_id: "",
  desk_number: "",
  start_time: "",
  end_time: "",
  date: "",
  updatedAt: "",
  __v: 0,
  _id: "",
};

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: initialReservationState,
  reducers: {
    setReservation: (state, action) => {
      state = action.payload;
      return state;
    },
    clearReservation: (state) => {
      state = initialReservationState;
      return state;
    },
  }
});

export const {setReservation, clearReservation} = reservationSlice.actions;

export default reservationSlice.reducer;
