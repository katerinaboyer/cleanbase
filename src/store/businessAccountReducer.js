import { createSlice } from '@reduxjs/toolkit';

const initialAccountState = {
    _id: "",
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: {
    setAccountId: (state, action) => {
      state = action.payload;
      return state;
    },
    clearAccountId: (state) => {
      state = initialAccountState
      return state;
    },
  }
});

export const {setAccountId, clearAccountId} = accountSlice.actions;

export default accountSlice.reducer;
