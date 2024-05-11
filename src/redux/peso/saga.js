import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError,
         atualizarSucesso, atualizarError, apgarSucesso,
         apgarError, buscarPrimeiroPesoSucesso, buscarPrimeiroPesoError,
        buscarUltimoPesoSucesso, buscarUltimoPesoError } from './slice';

import axios from 'axios';

function setUrl() {    
    return {
              "url":    JSON.parse(sessionStorage.getItem('urls')),
              "primeiroPeso": 'buscarprimeiropeso',
              "ultimoPeso": 'buscarultimopeso'
           }
}

function* listar(action){
    try {      
        let urls = yield call(setUrl);  

        const response = yield call(axios.get,`${urls.url.pesos.href}?page=${action.payload.page}`,{
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
        
        let urls = yield call(setUrl);  

        yield call(axios.post,`${urls.url.pesos.href}`,action.payload.dados,{
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

        let urls = yield call(setUrl);  

        yield call(axios.put,`${urls.url.pesos.href}/${action.payload.id}`,data,{
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

        let urls = yield call(setUrl);  

        yield call(axios.delete,`${urls.url.pesos.href}/${action.payload.id}`,{
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

        let urls = yield call(setUrl); 

        const response = yield call(axios.get,`${urls.url.pesos.href}/${urls.primeiroPeso}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(buscarPrimeiroPesoSucesso(response.data));
    } catch(error) {
        console.log(error)
        yield put(buscarPrimeiroPesoError(error));
    }
}

function* buscarUltimoPeso() {
    try {

        let urls = yield call(setUrl);  

        const response = yield call(axios.get,`${urls.url.pesos.href}/${urls.ultimoPeso}`,{
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