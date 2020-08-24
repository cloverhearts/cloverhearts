import React, { useEffect, createRef } from 'react'
import { useDispatch } from 'react-redux'
import { throttle } from 'lodash'
import styles from './index.module.scss'
import { setViewPortValue } from '@store/Tracking/actions'

type ViewportSPYWrapProps = {
  children: React.ReactNode
}

export default function ViewportSPYWrap(props: ViewportSPYWrapProps): JSX.Element {
  const dispatch = useDispatch()
  const viewportSpyRef = createRef<HTMLDivElement>()
  const { children } = props
  const delayWaitMS = 200

  const setScrollPositionValueFunction = () => {
    const { current } = viewportSpyRef
    if (current) {
      const leaveEle = current.children[0]
      const showEle = current.children[1]
      const availableEle = current.children[2]
      const onScrollEvent = throttle(() => {
        const leaveElePosY = window.scrollY + leaveEle.getBoundingClientRect().y
        const showElePosY = window.scrollY + showEle.getBoundingClientRect().y
        const availableElePosY = window.scrollY + availableEle.getBoundingClientRect().y
        dispatch(setViewPortValue({
          scroll: window.scrollY,
          leave: leaveElePosY,
          show: showElePosY,
          available: availableElePosY
        }))
      }, delayWaitMS)
      window.addEventListener('scroll', onScrollEvent)
      onScrollEvent()
    }
  }

  useEffect(setScrollPositionValueFunction, [viewportSpyRef])
  useEffect(setScrollPositionValueFunction, [])
  return (
    <>
      <div
        ref={viewportSpyRef}
        className={styles.viewportSpy}
      >
        <div className={styles.leave}>LEAVE :</div>
        <div className={styles.show}>SHOW :</div>
        <div className={styles.available}>AVAILABLE :</div>
      </div>
      {children}
    </>
  )
}
