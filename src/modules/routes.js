import Home from "@pages/Home"
import Dashboard from "@pages/Dashboard"
import Asset from "@pages/Asset"
import NotFound from "@pages/NotFound"

const routes =  [
  { element: Home,      path: "/" },
  { element: Dashboard, path: "/dashboard/:network" },
  { element: Asset,     path: "/asset/:network/:address" },

  { element: NotFound,  path: "*" },
];

export default routes;