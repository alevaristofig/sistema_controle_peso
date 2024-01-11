import { combineReducers } from "redux";
import pessoaSlice from './pessoa/slice';

export default combineReducers({
    pessoa: pessoaSlice,
});