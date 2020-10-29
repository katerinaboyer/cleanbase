import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    email: "",
    name: "",
    role: "",
    id: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    storeLogin: (state, action) => {
      state = action.payload;
      return state;
    },
    storeLogout: (state) => {
      state = initialUserState
      return state;
    },
  }
});

export const {storeLogin, storeLogout} = userSlice.actions;

export default userSlice.reducer;
