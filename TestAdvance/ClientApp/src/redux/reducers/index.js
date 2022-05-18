import { combineReducers } from "redux";
import authReducer from "./authReducer";
import authReducers from "./authReducers";
import authStatusReducer from "./authStatusReducer";


const reducers= combineReducers({
    authReducers,
    authStatusReducer
})

export default reducers;