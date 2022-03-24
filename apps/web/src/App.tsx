import React from "react";
import { persistor, store } from "./redux";
import { SocketProvider } from "./context";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Pages } from "./pages";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SocketProvider>
          <Pages />
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
};
