import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, atualizarSucesso, atualizarError } from './slice';

import axios from 'axios';

function setUrl() {    
    return {
              "url":    JSON.parse(sessionStorage.getItem('urls')),
           }
}

function* listar() {
    try {

        let urls = yield call(setUrl);  

        const response = yield call(axios.get,`${urls.url.pessoas.href}`);

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarError());
    }
}

function* atualizar(action) {
    try {
        let data = {
            'nome': action.payload.nome,
            'email': action.payload.email,
            'altura': action.payload.altura,
            'endereco': action.payload.endereco,
            'senha': action.payload.senha,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        let urls = yield call(setUrl);

        yield call(axios.put,`${urls.url.pessoas.href}/${action.payload.pessoa}`,data,{
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
    takeEvery('pessoa/listar', listar),
    takeEvery('pessoa/atualizar', atualizar)
])