import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./AuthReducer"
import EventsReducer from "./EventsReducer"
import logger from "redux-logger"

export default configureStore({
    reducer: {
        auth: AuthReducer,
        events: EventsReducer
    },
    middleware: (def) => def().concat(logger)
})