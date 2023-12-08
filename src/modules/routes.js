import Dashboard from "@pages/Dashboard"
import Asset from "@pages/Asset"
import NotFound from "@pages/NotFound"

const routes =  [
  {
    path: "/",
    element: Dashboard
  },
  {
    path: "/asset/:network/:address",
    element: Asset
  },
  {
    path: "*",
    element: NotFound
  }
];

export default routes;