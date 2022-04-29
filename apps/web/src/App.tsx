import React from "react";
import { persistor, store } from "./redux";
import { SocketProvider, ApiProvider } from "./context";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Pages } from "./pages";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <PersistGate persistor={persistor} loading={null}>
        <ApiProvider>
          <SocketProvider>
            <Pages />
          </SocketProvider>
        </ApiProvider>
      </PersistGate>
    </Provider>
  );
};
