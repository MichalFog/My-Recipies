// import { Email } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'
const initUser = {
  name: null,
  email: null
};

const UserSlice = createSlice({
  name: "user_Slice",
  initialState: initUser,
  reducers: {
    createUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});
export const { createUser } = UserSlice.actions;
export default UserSlice.reducer;
