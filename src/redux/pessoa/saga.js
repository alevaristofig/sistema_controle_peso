import { all, takeEvery, call, put } from 'redux-saga/effects';
//import { salvar } from './slice';

function* salvar() {
    alert('chegou saga')
}

export default all([
    takeEvery('pessoa/salvar',salvar)
])