import { all } from "redux-saga/effects";
import pessoa from './pessoa/saga';
import peso from './peso/saga';

export default function* rootSaga(){
    return yield all([
        pessoa,
        peso
    ])
}