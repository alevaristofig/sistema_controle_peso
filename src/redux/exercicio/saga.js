import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError } from './slice';

import axios from 'axios';

function* listar(action) {
    try {
        const response = yield call(axios.get,"http://localhost:8080/exercicio");

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarError());
    }
}

export default all([
    takeEvery('exercicio/listar', listar)
])