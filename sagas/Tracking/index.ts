import { takeLatest, put } from 'redux-saga/effects'
import ACTION_TYPES from '@store/Tracking/types'

function* setViewPortValue(context, action) {
  try {
    yield put({ type: ACTION_TYPES.RES_SET_VIEWPORT, value: action.value })
  } catch (error) {
    console.error(error)
  }
}

export default function* rootSaga(externalContext) {
  yield takeLatest(
    ACTION_TYPES.REQ_SET_VIEWPORT,
    setViewPortValue,
    externalContext
  )
}
