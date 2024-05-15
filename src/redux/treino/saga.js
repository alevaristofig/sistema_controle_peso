import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError} from './slice';

import axios from 'axios';

function setUrl() {    
    return {
              "url": JSON.parse(sessionStorage.getItem('urls')),
              "pessoa": JSON.parse(sessionStorage.getItem('dadosPessoa'))
           }
}

function* listarTreino(action) {
    try {

        let urls = yield call(setUrl);

        const response = yield call(axios.get,`${urls.url.pessoaexercicio.href}/${urls.pessoa.id}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });
       
        let responsePessoaExercicio = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.pessoaExercicioModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'treino'
        }

        yield put(listarSucesso(responsePessoaExercicio));
    } catch(error) {
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let dados = {
            'pessoaId': {
                'id': action.payload.dados.pessoaId
            },
            'exercicioId': {
                'id': action.payload.dados.exercicioId
            },
            'treino': action.payload.dados.treino,
            'dataCadastro': action.payload.dados.dataCadastro
        };

        let urls = yield call(setUrl);

        yield call(axios.post,`${urls.url.pessoaexercicio.href}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(salvarSucesso());

    } catch(error) {
        yield put(salvarError);
    }
}

export default all([
    takeEvery('treino/listarTreino', listarTreino),
    takeEvery('treino/salvar', salvar),
])
