import Dashboard from "@pages/Dashboard"
import NotFound from "@pages/NotFound"

const routes =  [
  {
    path: "/",
    element: <Dashboard/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
];

export default routes;