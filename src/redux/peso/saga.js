import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError,
         atualizarSucesso, atualizarError, apgarSucesso,
         apgarError, buscarPrimeiroPesoSucesso, buscarPrimeiroPesoError,
        buscarUltimoPesoSucesso, buscarUltimoPesoError } from './slice';

import axios from 'axios';

function* listar(action){
    try {        
        const response = yield call(axios.get,`http://localhost:8080/pesos?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        let responsePeso = {
            dados: response.data._embedded.pesoModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'peso'
        }
       
        yield put(listarSucesso(responsePeso));
    } catch(error) {
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        console.log(action.payload.dados);
        yield call(axios.post,"http://localhost:8080/pesos",action.payload.dados);

        yield put(salvarSucesso());

    } catch(error) {     
        yield put(salvarError(error.response.data.userMessage));
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

        yield call(axios.put,`http://localhost:8080/pesos/${action.payload.id}`,data);

        yield put(atualizarSucesso());
    } catch(error) {
        yield put(atualizarError(error.response.data.userMessage));
    }
}

function* apagar(action) {
    try {
        yield call(axios.delete,`http://localhost:8080/pesos/${action.payload.id}`);

        yield put(apgarSucesso());

    } catch(error) {
        yield put(apgarError());
    }
}

function* buscarPrimeiroPeso() {
    try {
        const response = yield call(axios.get,"http://localhost:8080/pesos/buscarprimeiropeso");

        yield put(buscarPrimeiroPesoSucesso(response.data));
    } catch(error) {
        yield put(buscarPrimeiroPesoError());
    }
}

function* buscarUltimoPeso() {
    try {
        const response = yield call(axios.get,"http://localhost:8080/pesos/buscarultimoropeso");

        yield put(buscarUltimoPesoSucesso(response.data));
    } catch(error) {
        yield put(buscarUltimoPesoError());
    }
}

export default all([
    takeEvery('peso/listar', listar),
    takeEvery('peso/salvar', salvar),
    takeEvery('peso/atualizar', atualizar),
    takeEvery('peso/apagar', apagar),
    takeEvery('peso/buscarPrimeiroPeso', buscarPrimeiroPeso),
    takeEvery('peso/buscarUltimoPeso', buscarUltimoPeso)
])