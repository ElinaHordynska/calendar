import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./AuthReducer"
import EventsReducer from "./EventsReducer"

export default configureStore({
    reducer: {
        auth: AuthReducer,
        events: EventsReducer
    }
})