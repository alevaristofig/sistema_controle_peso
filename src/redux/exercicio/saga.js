import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError,
         removerSucesso, removerError, atualizarSucesso,
        atualizarError } from './slice';

import axios from 'axios';

function* listar(action) {
    try {
        const response = yield call(axios.get,`http://localhost:8080/exercicios?page=${action.payload.page}`);

        let responseExercicio = {
            dados: response.data._embedded.exercicioModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'exercicio'
        }

        yield put(listarSucesso(responseExercicio));
    } catch(error) {
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let dados = {
            'nome': action.payload.nome,
            'frequencia': action.payload.frequencia,
            'tempo': action.payload.tempo
        };

        yield call(axios.post,"http://localhost:8080/exercicios",dados);

        yield put(salvarSucesso());

    } catch(error) {        
        yield put(salvarError(error.response.data.userMessage));
    }
}

function* remover(action) {
    try {
        yield call(axios.delete,`http://localhost:8080/exercicios/${action.payload.id}`);

        yield put(removerSucesso());

    } catch(error) {
        yield put(removerError());
    }
}

function* atualizar(action) {
    try {
        let data = {
            'nome': action.payload.nome,
            'frequencia': action.payload.frequencia,
            'tempo': action.payload.tempo,
            'dataCadastro': action.payload.dataCadastro
        };

        yield call(axios.put,`http://localhost:8080/exercicios/${action.payload.id}`,data);

        yield put(atualizarSucesso());
    } catch(error) {
        console.log(error)
        yield put(atualizarError(error.response.data.userMessage));
    }
}

export default all([
    takeEvery('exercicio/listar', listar),
    takeEvery('exercicio/salvar', salvar),
    takeEvery('exercicio/remover', remover),
    takeEvery('exercicio/atualizar', atualizar)
])