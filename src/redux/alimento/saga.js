import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError, listarSucesso, listarError, 
         apagarSucesso, apagarError, atualizarSucesso, 
         atualizarError, listarAlimentosSucesso, listarAlimentosError } from './slice';

import axios from 'axios';

function setUrl() {    
    return {
              "url": JSON.parse(sessionStorage.getItem('urls')),
              "listaralimentospaginacao": "listaralimentospaginacao",
              "listaralimentos": "listaralimentos",
              "pessoa": JSON.parse(sessionStorage.getItem('dadosPessoa'))
           }
}

function* listar(action){
    try {

        let urls = yield call(setUrl);

        const response = yield call(axios.get,`${urls.url.alimentos.href}/${urls.listaralimentospaginacao}/${urls.pessoa.id}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        let responseAlimento = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.alimentoModelList,
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
        let urls = yield call(setUrl);

        let dados = {
            'nome': action.payload.nome,
            'quantidade': action.payload.quantidade,
            'calorias': action.payload.calorias,  
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao,
            'pessoa': {
                'id': urls.pessoa.id
            }          
        }
        
        yield call(axios.post,`${urls.url.alimentos.href}`,dados,{
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

        let urls = yield call(setUrl);
        
        let data = {
            'nome': action.payload.nome,
            'quantidade': action.payload.quantidade,
            'calorias': action.payload.calorias,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao,
            'pessoa': {
                'id': urls.pessoa.id
            }  
        };        

        yield call(axios.put,`${urls.url.alimentos.href}/${action.payload.id}`,data,{
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

        let urls = yield call(setUrl);

        yield call(axios.delete,`${urls.url.alimentos.href}/${action.payload.id}`,{
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

        let urls = yield call(setUrl);

        const response = yield call(axios.get,`${urls.url.alimentos.href}/${urls.listaralimentos}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            }
        });

        let responseAlimento = {
            dados: response.data,            
        }
        
        yield put(listarAlimentosSucesso(responseAlimento));
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
