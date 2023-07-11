import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth-slice";
import reservationReducer from "./slices/reservation/reservation-slice"

export const store = configureStore({
    reducer: {
        auth : authReducer,
        reservation: reservationReducer,
    }
});

export {loginSucces, loginFailure, logout} from "./slices/auth/auth-slice";
