import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    freeTime: "",
    breakTime: "",
    totalTime: "",
  },
  reducers: {
    setFreeTime: (state, action) => {
      state.freeTime = action.payload;
    },
    setBreakTime: (state, action) => {
      state.breakTime = action.payload;
    },
    setTotalTime: (state, action) => {
      state.totalTime = action.payload;
    },
  },
});

export const { setFreeTime, setBreakTime, setTotalTime } = timeSlice.actions;

export default timeSlice.reducer;
