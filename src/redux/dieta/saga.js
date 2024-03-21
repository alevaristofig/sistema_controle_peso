import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarDietaAlimentoSucesso, salvarDietaAlimentoError, 
         apagarSucesso, apagarError, atualizarSucesso,
         atualizarError, apagarAlimentoDietaSucesso, apagarAlimentoDietaErro,
         atualizarDietaAlimentoSucesso, atualizarDietaAlimentoError } from './slice';

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

function* apagarAlimentoDieta(action) {
    try {
        yield call(axios.delete,`http://localhost:8080/alimentodieta/${action.payload.id}`);

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
            'dataCriacao': action.payload.dataCriacao
        };

        yield call(axios.put,`http://localhost:8080/alimentodieta/${action.payload.id}`,dados);

        yield put(atualizarDietaAlimentoSucesso());
    } catch(error) {
        alert('erro')
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