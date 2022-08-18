import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize}
  body { background: green };
`;
function CloverHeartsBlogRoot({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default CloverHeartsBlogRoot;
