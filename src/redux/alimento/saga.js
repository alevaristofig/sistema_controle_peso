import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError, listarSucesso, listarError, 
         apagarSucesso, apagarError, atualizarSucesso, 
         atualizarError, listarAlimentosSucesso, listarAlimentosError } from './slice';

import axios from 'axios';

const URL = JSON.parse(sessionStorage.getItem('urls'));
const LISTAR_ALIMENTOS = 'listaralimentos';

function* listar(action){
    try {
        const response = yield call(axios.get,`${URL.alimentos.href}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        let responseAlimento = {
            dados: response.data._embedded.alimentoModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'alimento'
        }

        yield put(listarSucesso(responseAlimento));
    } catch(error) {
        console.log(error)
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let dados = {
            'nome': action.payload.nome,
            'quantidade': action.payload.quantidade,
            'calorias': action.payload.calorias,  
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao          
        }

        yield call(axios.post,`${URL.alimentos.href}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
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
            'nome': action.payload.nome,
            'quantidade': action.payload.quantidade,
            'calorias': action.payload.calorias,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        yield call(axios.put,`${URL.alimentos.href}/${action.payload.id}`,data,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
            }
        });
    
        yield put(atualizarSucesso());
    } catch(error) {
        yield put(atualizarError(error.response.data.userMessage));
    }

}

function* apagar(action) {
    try {
            yield call(axios.delete,`${URL.alimentos.href}/${action.payload.id}`,{
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
                }
            });

        yield put(apagarSucesso());

    } catch(error) {
        yield put(apagarError());
    }
}

function* listarAlimentos(action) {
    try {
        const response = yield call(axios.get,`${URL.alimentos.href}/${LISTAR_ALIMENTOS}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });
        
        yield put(listarAlimentosSucesso(response.data));
    } catch(error) {
        yield put(listarAlimentosError());
    }
}

export default all([
    takeEvery('alimento/salvar', salvar),
    takeEvery('alimento/listar', listar),
    takeEvery('alimento/apagar', apagar),
    takeEvery('alimento/atualizar', atualizar),
    takeEvery('alimento/listarAlimentos', listarAlimentos)
])
