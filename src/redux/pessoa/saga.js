import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, atualizarSucesso, atualizarError } from './slice';
import axios from 'axios';

function* listar() {
    try {
        const response = yield call(axios.get,"http://localhost:8080/pessoas");

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
console.log(data)
        yield call(axios.put,`http://localhost:8080/pessoas/${action.payload.pessoa}`,data,{
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