import React from 'react'
import ViewportSPYWrap from '@components/Wrap/ViewportSPY'
import ProviderContextContainer from '@components/Wrap/ProviderContextContainer'

type AppContainerProps = {
  children: React.ReactNode
}

export default function AppContainer(props: AppContainerProps): JSX.Element {
  const { children } = props
  return (
    <>
      <ProviderContextContainer>
        <ViewportSPYWrap>
          {children}
        </ViewportSPYWrap>
      </ProviderContextContainer>
    </>
  )
}
