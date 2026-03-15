import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: []
}

const EventReducer = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events = [...state.events, action.payload]
    }
  }
});

export const {addEvent} = EventReducer.actions

export default EventReducer.reducer