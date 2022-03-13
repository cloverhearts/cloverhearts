import React from "react";
import { Provider } from "react-redux";
import StoreWithSaga from "@store/index";

type PlatformProviderProps = {
  children: React.ReactNode
}

function PlatformProvider(props: PlatformProviderProps): JSX.Element {
  const { children } = props;
  const store = StoreWithSaga({});
  return <Provider store={store}> {children} </Provider>;
}

type ProviderContextContainerProps = {
  children: React.ReactNode
}

export default function ProviderContextContainer(
  props: ProviderContextContainerProps
): JSX.Element {
  const { children } = props;
  return <PlatformProvider>{children}</PlatformProvider>;
}
