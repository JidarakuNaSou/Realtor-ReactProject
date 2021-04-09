import { combineReducers } from "redux";
import signtouserReducer from "./SingUserToggler/reducers";



export default combineReducers({
    signtouser: signtouserReducer
})