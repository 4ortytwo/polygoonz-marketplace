import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@styles/theme";
import { DAppProvider } from "@usedapp/core";

// import { Web3ReactProvider } from "@web3-react/core";
// import Web3 from "web3";

// function getLibrary(provider) {
//   return new Web3(provider);
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}
export default MyApp;
