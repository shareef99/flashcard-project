import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RootLayout from "./_layout";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayout />
        <TanStackRouterDevtools />
      </PersistGate>
    </Provider>
  );
}
