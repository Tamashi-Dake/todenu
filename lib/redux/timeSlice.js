import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    freeTime: "",
    breakTime: "",
    totalTime: "",
    counter: false,
    pomodoro: false,
    billData: [],
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
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    setPomodoro: (state, action) => {
      state.pomodoro = action.payload;
    },
    setBillData: (state, action) => {
      state.billData = action.payload;
    },
  },
});

export const {
  setFreeTime,
  setBreakTime,
  setTotalTime,
  setCounter,
  setPomodoro,
  setBillData,
} = timeSlice.actions;

export default timeSlice.reducer;
