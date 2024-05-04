import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError, listarSucesso, listarError, 
         apagarSucesso, apagarError, atualizarSucesso, atualizarError } from './slice';

import axios from 'axios';

function* listar(action){
    try {
        const response = yield call(axios.get,`http://localhost:8080/alimentos?page=${action.payload.page}`,{
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
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let dados = {
            'nome': action.payload.nome,
            'quantidade': action.payload.quantidade,
            'calorias': action.payload.calorias,            
        }

        yield call(axios.post,"http://localhost:8080/alimentos",dados);

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
console.log(data)
        yield call(axios.put,`http://localhost:8080/alimentos/${action.payload.id}`,data,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
            }
        });
    
        yield put(atualizarSucesso());
    } catch(error) {
        console.log(error)
        yield put(atualizarError(error.response.data.userMessage));
    }

}

function* apagar(action) {
    try {
        yield call(axios.delete,`http://localhost:8080/alimentos/${action.payload.id}`);

        yield put(apagarSucesso());

    } catch(error) {
        yield put(apagarError());
    }
}

export default all([
    takeEvery('alimento/salvar', salvar),
    takeEvery('alimento/listar', listar),
    takeEvery('alimento/apagar', apagar),
    takeEvery('alimento/atualizar', atualizar)
])
