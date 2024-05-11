import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError, apagarSucesso, apagarError,
         atualizarSucesso, atualizarError } from './slice';

import axios from 'axios';

function setUrl() {    
    return {
              "url": JSON.parse(sessionStorage.getItem('urls'))
           }
}

function* salvar(action) {
    try {
        let dados = {
            'pessoa': {
                'id': action.payload.id
            },
            'descricao': action.payload.descricao,
            'remedio': action.payload.remedio,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        let urls = yield call(setUrl);

        yield call(axios.post,`${urls.url.historicomedico.href}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(salvarSucesso());
    } catch(error) {
        yield put(salvarError(error.response.data.userMessage));
    }
}

function* apagar(action) {
    try {

        let urls = yield call(setUrl);

        yield call(axios.delete,`${urls.url.historicomedico.href}/${action.payload.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(apagarSucesso());

    } catch(error) {
        yield put(apagarError());
    }
}

function* atualizar(action) {
    try {
        let dados = {
            'pessoa': {
                'id': action.payload.pessoaId
            },
            'descricao': action.payload.descricao,
            'remedio': action.payload.remedio,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        let urls = yield call(setUrl);

        yield call(axios.put,`${urls.url.historicomedico.href}/${action.payload.id}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(atualizarSucesso());
    } catch(error) {
        yield put(atualizarError(error.response.data.userMessage));
    }
}

export default all([
    takeEvery('historicomedico/salvar', salvar),
    takeEvery('historicomedico/apagar', apagar),
    takeEvery('historicomedico/atualizar', atualizar)
])