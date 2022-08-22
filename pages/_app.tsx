import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize}
  @font-face {
    font-family: 'RIDIBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  };
  body {
    font-family: 'RIDIBatang';
  }
`;

const GlobalFonts = createGlobalStyle`
  html body {
    
  }
  
`;
function CloverHeartsBlogRoot({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalFonts />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default CloverHeartsBlogRoot;
