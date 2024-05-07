import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError,
         removerSucesso, removerError, atualizarSucesso,
         atualizarError, listarSemPaginacaoSucesso, 
         listarSemPaginacaoError } from './slice';

import axios from 'axios';

const URL = JSON.parse(sessionStorage.getItem('urls'));
const LISTAREXERCICIOS = 'listarexercicios';

function* listar(action) {
    try {
        const response = yield call(axios.get,`${URL.exercicios.href}?page=${action.payload.page}`,{
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
        const response = yield call(axios.get,`${URL.exercicios.href}/${LISTAREXERCICIOS}`,{
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
        let dados = {
            'nome': action.payload.nome,
            'frequencia': action.payload.frequencia,
            'tempo': action.payload.tempo,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizar': action.payload.dataAtualizar
        };

        yield call(axios.post,`${URL.exercicios.href}`,dados,{
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
        yield call(axios.delete,`${URL.exercicios.href}/${action.payload.id}`,{
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

        let data = {
            'nome': action.payload.nome,
            'frequencia': action.payload.frequencia,
            'tempo': action.payload.tempo,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizar': action.payload.dataAtualizar
        };
        console.log(data)
        yield call(axios.put,`${URL.exercicios.href}/${action.payload.id}`,data);

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