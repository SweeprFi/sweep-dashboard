import Home from "@pages/Home"
import Dashboard from "@pages/Dashboard"
import Asset from "@pages/Asset"
import NotFound from "@pages/NotFound"
import Swap from "@pages/Swap"

const routes =  [
  { element: Home,      path: "/" },
  { element: Dashboard, path: "/dashboard/:network" },
  { element: Asset,     path: "/asset/:network/:address" },
  { element: Swap,  path: "/swap/*" },

  { element: NotFound,  path: "*" },
];

export default routes;