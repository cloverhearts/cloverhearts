import _initstate from './state'
import ACTION_TYPES from './types'

export default function TrackingReducer(_state = _initstate, action): any {
  const state = { ..._state }
  switch (action.type) {
    case ACTION_TYPES.RES_SET_VIEWPORT:
      state.viewPort = {
        scroll: parseInt(action.value.scroll),
        leave: parseInt(action.value.leave),
        show: parseInt(action.value.show),
        available: parseInt(action.value.available)
      }
      return { ...state }
    default:
      return state
  }
}

