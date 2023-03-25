import { combineReducers } from 'redux';

import { default as testList } from '../store/test/reducers'

  export const appReducer = combineReducers({
    testList,
  });
