import {CartReducer} from './CartReducer';
import {combineReducers} from 'redux';

export const reducers=combineReducers({
    items:CartReducer
});