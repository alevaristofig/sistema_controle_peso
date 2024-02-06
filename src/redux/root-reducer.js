import { combineReducers } from "redux";
import pessoaSlice from './pessoa/slice';
import pesoSlice from './peso/slice';

export default combineReducers({
    pessoa: pessoaSlice,
    peso: pesoSlice
});