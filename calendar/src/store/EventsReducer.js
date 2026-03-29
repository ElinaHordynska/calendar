import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: [],
  loading: false,
  error: null
};

const EventReducer = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events = [...state.events, action.payload]
    }
  },
  extraReducers: (builder)=> {
    builder.addCase(addNewEvent.pending, (state)=>{
      state.loading = true
      state.error = null
    })
    builder.addCase(addNewEvent.rejected, (state,action)=>{
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(addNewEvent.fulfilled, (state,action)=>{
      state.loading = false
      state.events = action.payload
    })

  }
});


export const addNewEvent = createAsyncThunk("events/addNewEvent", async (data, {getState, rejectWithValue})=> {
  try{
    const response = await fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`
      },
      body: JSON.stringify(data)
    })
    let result = await response.json()
    if (!response.ok){
      throw rejectWithValue({error: result.error})
    }
    return result
  }catch(error){
    throw error
  }
})

export const { addEvent } = EventReducer.actions

export default EventReducer.reducer