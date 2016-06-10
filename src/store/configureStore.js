import {applyMiddleware, createStore, compose} from 'redux';
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
export default function configureStore (onComplete:?() => void) {
  const store = createStore(
    reducers,
    autoRehydrate(),
    compose(
      applyMiddleware(thunk, logger)
    )
  );
  let opt = {
    storage: AsyncStorage,
    transform: []
  }
  persistStore(store, opt, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

