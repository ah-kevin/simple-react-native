import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {autoRehydrate, persistStore} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import createLogger from 'redux-logger';
import reducers from '../reducers'

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});
let middlewares = [
  logger,
  thunk
]
let createAppStore = applyMiddleware(...middlewares)(createStore);

export default function configureStore (onComplete:?() => void) {
  const store = autoRehydrate()(createAppStore)(reducers);
  let opt = {
    storage: AsyncStorage,
    transform: []
  }
  persistStore(store, opt, onComplete);
  return store;
}

