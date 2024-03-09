import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError, apagarSucesso, apagarError } from './slice';

import axios from 'axios';

function* salvar(action) {
    try {

        let dados = {
            'nome': action.payload.nome
        };

        yield call(axios.post,"http://localhost:8080/dietas",dados);

        yield put(salvarSucesso());
    }catch(error) {
        yield put(salvarError());
    }
}

function* apagar(action) {
    try {
        yield call(axios.delete,`http://localhost:8080/dietas/${action.payload.id}`);

        yield put(apagarSucesso());

    } catch(error) {
        yield put(apagarError());
    }
}

export default all([
    takeEvery('dieta/salvar', salvar),
    takeEvery('dieta/apagar', apagar)
]);