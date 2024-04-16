import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError} from './slice';

import axios from 'axios';

function* listarTreino() {
    try {
        const response = yield call(axios.get,"http://localhost:8080/pessoaexercicio");

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let dados = {
            'pessoaId': {
                'id': action.payload.pessoaId
            },
            'exercicioId': {
                'id': action.payload.exercicioId
            },
            'treino': action.payload.treino,
            'data': action.payload.data
        };

        yield call(axios.post,"http://localhost:8080/pessoaexercicio",dados);

        yield put(salvarSucesso());

    } catch(error) {
        yield put(salvarError);
    }
}

export default all([
    takeEvery('treino/listarTreino', listarTreino),
    takeEvery('treino/salvar', salvar),
])
