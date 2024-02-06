import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError } from './slice';

import axios from 'axios';

function* listar(){
    try {
        const response = yield call(axios.get,"http://localhost:8080/peso");

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        yield call(axios.post,"http://localhost:8080/peso",action.payload.dados);

        yield put(salvarSucesso());

    } catch(error) {
        yield put(salvarError());
    }
}

export default all([
    takeEvery('peso/listar', listar),
    takeEvery('peso/salvar', salvar),
])