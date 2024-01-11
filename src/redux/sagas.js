import { all } from 'redux-saga/effects';
import pessoa from './pessoa/saga';

export default function* rootSaga(){
    return yield all([
        pessoa,
    ]);
}