import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError, listarSucesso, listarError } from './slice';

import axios from 'axios';

function* listar(){
    try {
        const response = yield call(axios.get,"http://localhost:8080/alimentos");

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let dados = {
            'nome': action.payload.nome,
            'quantidade': action.payload.quantidade,
            'caloria': action.payload.caloria
        }

        yield call(axios.post,"http://localhost:8080/alimentos",dados);

        yield put(salvarSucesso());

    } catch(error) {
        yield put(salvarError());
    }
}

export default all([
    takeEvery('alimento/salvar', salvar),
    takeEvery('alimento/listar', listar)
])
