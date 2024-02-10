import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError,
         buscarSucesso, buscarError, atualizarSucesso,
        atualizarError } from './slice';

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

function* buscar(action) {
    try {
        const response = yield call(axios.get,`http://localhost:8080/peso/${action.payload.id}`);

        yield put(buscarSucesso(response.data));
    } catch(error) {
        console.log(error.message)
        yield put(buscarError());
    }
}

function* atualizar(action) {
    try {
        let data = {
            'valor': action.payload.valor,
            'imc': action.payload.imc,
            'data': action.payload.data,
            'pessoa': action.payload.pessoa
        };

        yield call(axios.put,`http://localhost:8080/peso/${action.payload.id}`,data);

        yield put(atualizarSucesso());
    } catch(error) {
        yield put(atualizarError());
    }
}

export default all([
    takeEvery('peso/listar', listar),
    takeEvery('peso/salvar', salvar),
    takeEvery('peso/buscar', buscar),
    takeEvery('peso/atualizar', atualizar)
])