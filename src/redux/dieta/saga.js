import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarDietaAlimentoSucesso, salvarDietaAlimentoError, 
         apagarSucesso, apagarError, atualizarSucesso,
         atualizarError, apagarAlimentoDietaSucesso, apagarAlimentoDietaErro,
         atualizarDietaAlimentoSucesso, atualizarDietaAlimentoError } from './slice';

import axios from 'axios';

function setUrl() {    
    return {
              "url": JSON.parse(sessionStorage.getItem('urls'))
           }
}

function* salvarDietaAlimento(action) {
    try {

        let dados = {
            'dietaId': {
                'id': action.payload.dietaId
            },
            'alimentoId': {
                'id': action.payload.alimentoId
            },
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        let urls = yield call(setUrl);

        yield call(axios.post,`${urls.url.alimentodieta.href}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
            }
        });

        yield put(salvarDietaAlimentoSucesso());
    }catch(error) {
        yield put(salvarDietaAlimentoError());
    }
}

function* atualizar(action) {
    try {

        let dados = {
            'nome': action.payload.nome,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        let urls = yield call(setUrl);

        yield call(axios.put,`${urls.url.dietas.href}/${action.payload.id}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
            }
        });

        yield put(atualizarSucesso());
    }catch(error) {        
        yield put(atualizarError());
    }
}

function* apagar(action) {
    try {

        let urls = yield call(setUrl);

        yield call(axios.delete,`${urls.url.dietas.href}/${action.payload.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
            }
        });

        yield put(apagarSucesso());

    } catch(error) {
        yield put(apagarError());
    }
}

function* apagarAlimentoDieta(action) {
    try {

        let urls = yield call(setUrl);

        yield call(axios.delete,`${urls.url.alimentodieta.href}/${action.payload.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
            }
        });

        yield put(apagarAlimentoDietaSucesso());

    } catch(error) {
        yield put(apagarAlimentoDietaErro());
    }
}

function* atualizarDietaAlimento(action) {
    try {

        let dados = {
            'dietaId': {
                'id': action.payload.dietaId
            },
            'alimentoId': {
                'id': action.payload.alimentoId
            },
            'dataCadastro': action.payload.dataCriacao,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        let urls = yield call(setUrl);

        yield call(axios.put,`${urls.url.alimentodieta.href}/${action.payload.id}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
            }
        });

        yield put(atualizarDietaAlimentoSucesso());
    } catch(error) {        
        yield put(atualizarDietaAlimentoError());
    }

}

export default all([
    takeEvery('dieta/salvarDietaAlimento', salvarDietaAlimento),
    takeEvery('dieta/apagar', apagar),
    takeEvery('dieta/atualizar', atualizar),
    takeEvery('dieta/apagarAlimentoDieta', apagarAlimentoDieta),
    takeEvery('dieta/atualizarDietaAlimento', atualizarDietaAlimento)
]);