import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducer: {
    test: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = userSlice;
export const { test } = actions;
export default reducer;
