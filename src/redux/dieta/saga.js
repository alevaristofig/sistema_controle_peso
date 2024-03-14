import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarDietaAlimentoSucesso, salvarDietaAlimentoError, 
         apagarSucesso, apagarError, atualizarSucesso,
        atualizarError } from './slice';

import axios from 'axios';

function* salvarDietaAlimento(action) {
    try {

        let dados = {
            'dietaId': {
                'id': action.payload.dietaId
            },
            'alimentoId': {
                'id': action.payload.alimentoId
            }
        };

        yield call(axios.post,"http://localhost:8080/alimentodieta",dados);

        yield put(salvarDietaAlimentoSucesso());
    }catch(error) {
        console.log(error)
        yield put(salvarDietaAlimentoError());
    }
}

function* atualizar(action) {
    try {

        let dados = {
            'nome': action.payload.nome
        };

        yield call(axios.put,`http://localhost:8080/dietas/${action.payload.id}`,dados);

        yield put(atualizarSucesso());
    }catch(error) {
        console.log(error)
        yield put(atualizarError());
    }
}

function* apagar(action) {
    try {
        yield call(axios.delete,`http://localhost:8080/dietas/${action.payload.id}`);

        yield put(apagarSucesso());

    } catch(error) {
        yield put(apagarError());
    }
}

export default all([
    takeEvery('dieta/salvarDietaAlimento', salvarDietaAlimento),
    takeEvery('dieta/apagar', apagar),
    takeEvery('dieta/atualizar', atualizar)
]);