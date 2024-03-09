import { all } from "redux-saga/effects";
import pessoa from './pessoa/saga';
import peso from './peso/saga';
import exercicio from './exercicio/saga';
import treino from './treino/saga';
import alimento from './alimento/saga';
import dieta from './dieta/saga';

export default function* rootSaga(){
    return yield all([
        pessoa,
        peso,
        exercicio,
        treino,
        alimento,
        dieta
    ])
}