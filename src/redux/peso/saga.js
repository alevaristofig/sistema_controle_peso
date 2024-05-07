import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError,
         atualizarSucesso, atualizarError, apgarSucesso,
         apgarError, buscarPrimeiroPesoSucesso, buscarPrimeiroPesoError,
        buscarUltimoPesoSucesso, buscarUltimoPesoError } from './slice';

import axios from 'axios';

const URL = JSON.parse(sessionStorage.getItem('urls'));
const PRIMEIROPESO = "buscarprimeiropeso";
const ULTIMOPESO = "buscarultimopeso";

function* listar(action){
    try {      
        const response = yield call(axios.get,`${URL.pesos.href}?page=${action.payload.page}`,{
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
        yield call(axios.post,`${URL.pesos.href}`,action.payload.dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

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
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao,
            'pessoa': action.payload.pessoa
        };

        yield call(axios.put,`${URL.pesos.href}/${action.payload.id}`,data,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(atualizarSucesso());
    } catch(error) {
        yield put(atualizarError(error.response.data.userMessage));
    }
}

function* apagar(action) {
    try {
        yield call(axios.delete,`${URL.pesos.href}/${action.payload.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(apgarSucesso());

    } catch(error) {
        yield put(apgarError());
    }
}

function* buscarPrimeiroPeso() {
    try {        
        const response = yield call(axios.get,`${URL.pesos.href}/${PRIMEIROPESO}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(buscarPrimeiroPesoSucesso(response.data));
    } catch(error) {
        yield put(buscarPrimeiroPesoError(error));
    }
}

function* buscarUltimoPeso() {
    try {
        const response = yield call(axios.get,`${URL.pesos.href}/${ULTIMOPESO}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(buscarUltimoPesoSucesso(response.data));
    } catch(error) {
        yield put(buscarUltimoPesoError(error));
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