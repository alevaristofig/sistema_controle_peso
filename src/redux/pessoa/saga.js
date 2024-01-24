import { all, takeEvery, call, put } from 'redux-saga/effects';
import { salvarSucesso, salvarError} from './slice';
import axios from 'axios';

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
    takeEvery('pessoa/salvar',salvar)
])