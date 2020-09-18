import ACTION_TYPES, { EVENT_TYPE } from './types'

type viewPortValueType = {
  scroll: number
  leave: number
  show: number
  available: number
}

export function setViewPortValue(viewPortValue: viewPortValueType): EVENT_TYPE {
  return { type: ACTION_TYPES.REQ_SET_VIEWPORT, value: viewPortValue }
}
