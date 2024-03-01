import { combineReducers } from "redux";
import pessoaSlice from './pessoa/slice';
import pesoSlice from './peso/slice';
import exercicioSlice  from "./exercicio/slice";
import treinoSlice  from "./treino/slice";

export default combineReducers({
    pessoa: pessoaSlice,
    peso: pesoSlice,
    exercicio: exercicioSlice,
    treino: treinoSlice
});