import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError, apagarSucesso, apagarError } from './slice';

import axios from 'axios';

function* salvar(action) {
    try {
        let dados = {
            'pessoa': {
                'id': action.payload.id
            },
            'descricao': action.payload.descricao,
            'remedio': action.payload.remedio
        };

        yield call(axios.post,"http://localhost:8080/historicomedico",dados);

        yield put(salvarSucesso());
    } catch(error) {
        yield put(salvarError());
    }
}

function* apagar(action) {
    try {
        yield call(axios.delete,`http://localhost:8080/historicomedico/${action.payload.id}`);

        yield put(apagarSucesso());

    } catch(error) {
        yield put(apagarError());
    }
}

export default all([
    takeEvery('historicomedico/salvar', salvar),
    takeEvery('historicomedico/apagar', apagar)
])