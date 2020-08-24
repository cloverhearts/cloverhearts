import { all } from 'redux-saga/effects'

import Tracking from './Tracking'

export default function* rootSagas(context) {
  return yield all([Tracking(context)])
}
