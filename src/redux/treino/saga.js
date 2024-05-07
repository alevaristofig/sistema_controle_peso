import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError} from './slice';

import axios from 'axios';

const URL = JSON.parse(sessionStorage.getItem('urls'));

function* listarTreino(action) {
    try {
        const response = yield call(axios.get,`${URL.pessoaexercicio.href}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        let responsePessoaExercicio = {
            dados: response.data._embedded.pessoaExercicioModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'treino'
        }

        yield put(listarSucesso(responsePessoaExercicio));
    } catch(error) {
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let dados = {
            'pessoaId': {
                'id': action.payload.dados.pessoaId
            },
            'exercicioId': {
                'id': action.payload.dados.exercicioId
            },
            'treino': action.payload.dados.treino,
            'data': action.payload.dados.data
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
