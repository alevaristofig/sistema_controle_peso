import { all, takeEvery, call, put } from 'redux-saga/effects';
import { listarSucesso, listarError, salvarSucesso, salvarError} from './slice';
import axios from 'axios';

function* listar() {
    try {
        const response = yield call(axios.get,"http://localhost:8080/pessoas");

        yield put(listarSucesso(response.data));
    } catch(error) {
        console.log(error);
        yield put(listarError());
    }
}

function* salvar(action) {
    try {
        let data = {
            'nome': action.payload.nome,
            'email': action.payload.email,
            'endereco': action.payload.endereco,
            'altura': action.payload.altura
        }

        yield call(axios.post,"http://localhost:8080/pessoas",data);

        yield put(salvarSucesso());

    } catch(error) {     
        console.log(error)   
        yield put(salvarError());
    }
}

export default all([
    takeEvery('pessoa/salvar',salvar),
    takeEvery('pessoa/listar', listar)
])