import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from "@modules/routes";
import Layout from "@components/Layout";

import { useWallet } from "@utils/walletHelper";

const App = () => {
  const walletProps = useWallet();

  return (
    <div className="App">
      <BrowserRouter>
        <Layout walletProps={walletProps}>
          <Routes>
            {
              routes.map(route => (
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                  element={<route.element walletProps={walletProps} />}
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
