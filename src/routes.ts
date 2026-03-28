import { createBrowserRouter } from "react-router";
import { inventoryLoader } from "./loaders/inventoryLoader";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: '/',
    loader: inventoryLoader,
    Component: App,
  },
]);

