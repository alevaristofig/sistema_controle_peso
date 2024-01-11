import { all, delay, takeEvery } from 'redux-saga/effects';

function* buscar(){
    yield delay(2000)
}

export default all([
    takeEvery('pessoa/buscar', buscar)
])