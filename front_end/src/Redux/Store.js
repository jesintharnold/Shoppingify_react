import thunk from 'redux-thunk';
import {compose,applyMiddleware,createStore} from 'redux';
import {reducers} from './reduxindex';

const componseEnhance=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export const redux_store=createStore(reducers,componseEnhance(applyMiddleware(thunk)));


