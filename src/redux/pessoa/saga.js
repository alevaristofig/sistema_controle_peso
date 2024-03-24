import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError, 
         atualizarSucesso, atualizarError } from './slice';
import axios from 'axios';

function* listar() {
    try {
        const response = yield call(axios.get,"http://localhost:8080/pessoas");

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let data = {
            'nome': action.payload.nome,
            'email': action.payload.email,
            'endereco': action.payload.endereco,
            'altura': action.payload.altura
        }

        yield call(axios.post,"http://localhost:8080/pessoas",data);

        yield put(salvarSucesso());

    } catch(error) {     
        console.log(error)   
        yield put(salvarError());
    }
}

function* atualizar(action) {
    try {
        let data = {
            'nome': action.payload.nome,
            'email': action.payload.email,
            'altura': action.payload.altura,
            'endereco': action.payload.endereco
        };

        yield call(axios.put,`http://localhost:8080/pessoas/${action.payload.pessoa}`,data);

        yield put(atualizarSucesso());
    } catch(error) {
        yield put(atualizarError());
    }
}

export default all([
    takeEvery('pessoa/salvar',salvar),
    takeEvery('pessoa/listar', listar),
    takeEvery('pessoa/atualizar', atualizar)
])