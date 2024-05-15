import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError,
         removerSucesso, removerError, atualizarSucesso,
         atualizarError, listarSemPaginacaoSucesso, 
         listarSemPaginacaoError } from './slice';

import axios from 'axios';

function setUrl() {    
    return {
              "url":    JSON.parse(sessionStorage.getItem('urls')),
              "listarexercicios": "listarexercicios", 
              "listarexerciciospaginacao": "listarexerciciospaginacao",
              "pessoa": JSON.parse(sessionStorage.getItem('dadosPessoa'))             
           }
}

function* listar(action) {
    try {

        let urls = yield call(setUrl);

        const response = yield call(axios.get,`${urls.url.exercicios.href}/${urls.listarexerciciospaginacao}/${urls.pessoa.id}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

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

function* listarSemPaginacao() {
    try {

        let urls = yield call(setUrl);

        const response = yield call(axios.get,`${urls.url.exercicios.href}/${urls.listarexercicios}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(listarSemPaginacaoSucesso(response.data))
    } catch(error) {
        yield put(listarSemPaginacaoError());
    }
    
}

function* salvar(action) {
    try {
        let urls = yield call(setUrl);

        let dados = {
            'nome': action.payload.nome,
            'frequencia': action.payload.frequencia,
            'tempo': action.payload.tempo,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizar': action.payload.dataAtualizar,
            'pessoa': {
                'id': urls.pessoa.id
            }
        };        

        yield call(axios.post,`${urls.url.exercicios.href}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(salvarSucesso());

    } catch(error) {        
        yield put(salvarError(error.response.data.userMessage));
    }
}

function* remover(action) {
    try {

        let urls = yield call(setUrl);

        yield call(axios.delete,`${urls.url.exercicios.href}/${action.payload.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(removerSucesso());

    } catch(error) {
        yield put(removerError());
    }
}

function* atualizar(action) {
    try {

        let urls = yield call(setUrl);
        
        let data = {
            'nome': action.payload.nome,
            'frequencia': action.payload.frequencia,
            'tempo': action.payload.tempo,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizar': action.payload.dataAtualizar,
            'pessoa': {
                'id': urls.pessoa.id
            }
        };       

        yield call(axios.put,`${urls.url.exercicios.href}/${action.payload.id}`,data, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(atualizarSucesso());
    } catch(error) {
        console.log(error)
        yield put(atualizarError(error.response.data.userMessage));
    }
}

export default all([
    takeEvery('exercicio/listar', listar),
    takeEvery('exercicio/listarSemPaginacao', listarSemPaginacao),
    takeEvery('exercicio/salvar', salvar),
    takeEvery('exercicio/remover', remover),
    takeEvery('exercicio/atualizar', atualizar)
])