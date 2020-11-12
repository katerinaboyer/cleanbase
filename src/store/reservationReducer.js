import { createSlice } from '@reduxjs/toolkit';

const initialReservationState = {
  createdAt: "",
  desk_number: "",
  room_id: "",
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
