import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import Tracking from './Tracking'
import rootSagas from '../sagas'

function run(context = {}): any {
  const sagaMiddleware = createSagaMiddleware({ context })
  const store = createStore(
    combineReducers({ tracking: Tracking.reducer }),
    compose(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(rootSagas, context)
  return store
}

export default run
