import React from "react";
import { store, persistor } from "./redux";
import { SocketProvider } from "./context";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Pages } from "./pages";
import { Load } from "components/src/native/Loader";

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Load />} persistor={persistor}>
        <SocketProvider>
          <Pages />
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
};
