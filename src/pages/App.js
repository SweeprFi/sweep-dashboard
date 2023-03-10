import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import routes from "@modules/routes";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div >
  );
}

export default App;
