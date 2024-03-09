import { combineReducers } from "redux";
import pessoaSlice from './pessoa/slice';
import pesoSlice from './peso/slice';
import exercicioSlice  from "./exercicio/slice";
import treinoSlice  from "./treino/slice";
import alimentoSlice  from "./alimento/slice";
import dietaSlice  from "./dieta/slice";

export default combineReducers({
    pessoa: pessoaSlice,
    peso: pesoSlice,
    exercicio: exercicioSlice,
    treino: treinoSlice,
    alimento: alimentoSlice,
    dieta: dietaSlice
});