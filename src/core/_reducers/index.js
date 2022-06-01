import { combineReducers } from "redux";
import test from "./test";
import register from "./register";

const rootReducer = combineReducers({
    test,
    register,
});

export default rootReducer;