import { combineReducers } from "redux";
import itemSlice from "./itemSlice";

const rootReducer = combineReducers({
    item: itemSlice,
});

export default rootReducer;