import store from "@/rtk/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/assets/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
