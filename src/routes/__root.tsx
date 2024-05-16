import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <Provider store={store}>
      <Outlet />
      <TanStackRouterDevtools />
    </Provider>
  );
}
