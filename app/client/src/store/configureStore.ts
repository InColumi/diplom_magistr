import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
 import { composeWithDevTools } from 'redux-devtools-extension';

import { appReducer as rootReducer }  from './rootReducer';
import rootSagas from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );

sagaMiddleware.run(rootSagas);

export default store;