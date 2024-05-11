import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError} from './slice';

import axios from 'axios';

function setUrl() {    
    return {
              "url": JSON.parse(sessionStorage.getItem('urls'))
           }
}

function* listarTreino(action) {
    try {

        let urls = yield call(setUrl);

        const response = yield call(axios.get,`${urls.url.pessoaexercicio.href}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        let responsePessoaExercicio = {
            dados: response.data._embedded.pessoaExercicioModelList,
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
            'data': action.payload.dados.data
        };

        let urls = yield call(setUrl);

        yield call(axios.post,`${urls.url.pessoaexercicio.href}`,dados);

        yield put(salvarSucesso());

    } catch(error) {
        yield put(salvarError);
    }
}

export default all([
    takeEvery('treino/listarTreino', listarTreino),
    takeEvery('treino/salvar', salvar),
])
