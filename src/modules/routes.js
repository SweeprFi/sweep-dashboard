import Home from "@pages/Home"
import Dashboard from "@pages/Dashboard"
import Asset from "@pages/Asset"
import NotFound from "@pages/NotFound"
import Swap from "@pages/Swap"
import Bridge from "@pages/Bridge"

const routes =  [
  { element: Home,      path: "/" },

  { element: Dashboard, path: "/dashboard/:network" },

  { element: Asset,     path: "/asset/:network/:address" },

  { element: Swap,      path: "/swap/*" },

  { element: Bridge,      path: "/move" },

  { element: NotFound,  path: "/*" },
];

export default routes;