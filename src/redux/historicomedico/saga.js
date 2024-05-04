import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError, apagarSucesso, apagarError,
         atualizarSucesso, atualizarError } from './slice';

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
        yield put(salvarError(error.response.data.userMessage));
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

function* atualizar(action) {
    try {
        let dados = {
            'pessoa': {
                'id': action.payload.pessoaId
            },
            'descricao': action.payload.descricao,
            'remedio': action.payload.remedio,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        yield call(axios.put,`http://localhost:8080/historicomedico/${action.payload.id}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(atualizarSucesso());
    } catch(error) {
        yield put(atualizarError(error.response.data.userMessage));
    }
}

export default all([
    takeEvery('historicomedico/salvar', salvar),
    takeEvery('historicomedico/apagar', apagar),
    takeEvery('historicomedico/atualizar', atualizar)
])