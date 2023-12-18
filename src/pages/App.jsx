import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { sweepFetch, sweeprFetch } from "@utils/contract";
import { setSweepData, setSweeprData } from "@redux/app.reducers";
import { chainList } from "@config/constants";
import routes from "@modules/routes";
import Layout from "@components/Layout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (fetchFunction) => {
      try {
        const allPromises = chainList.map(async (net) => ({
          [net.chainId]: await fetchFunction(net.chainId)
        }));

        const results = await Promise.all(allPromises);

        let data = {};
        results.forEach(response => {
          const chain = Object.keys(response)[0];
          data[chain] = { ...response[chain] };
        });

        return data;
      } catch (error) {
        console.error(error);
        return {};
      }
    };

    const initialHandler = async () => {
      const sweepData = await fetchData(sweepFetch);
      const sweeprData = await fetchData(sweeprFetch);

      dispatch(setSweepData(sweepData));
      dispatch(setSweeprData(sweeprData));
    };

    initialHandler();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            {
              routes.map(route => (
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))
            }
          </Routes>
        </Layout>
      </BrowserRouter>
    </div >
  );
}

export default App;
