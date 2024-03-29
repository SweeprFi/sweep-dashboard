import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { sweepFetch, sweeprFetch } from "@utils/contract";
import { setSweepData, setSweeprData, setIsLoading } from "@redux/app.reducers";
import { chainList } from "@config/constants";

import routes from "@modules/routes";
import Layout from "@components/Layout";
import Loader from "@components/Loader";
import BridgeModal from "@components/BridgeModal";
import BuySweepModal from "@components/BuySweepModal";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyMsg, notifyMsgWithLink } from "@components/Message";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const sweepUpdates = useSelector((state) => state.sweepUpdates);
  const sweeprUpdates = useSelector((state) => state.sweeprUpdates);
  const notification = useSelector((state) => state.notification);
  const init = useRef(1);

  const fetchData = async (fetchFunction) => {
    try {
      const allPromises = chainList.map(async (net) => ({
        [net.chainId]: await fetchFunction(net.chainId)
      }));

      const results = await Promise.all(allPromises);

      let data = {};
      results.forEach(response => {
        const chain = Object.keys(response)[0];
        if(response[chain]?.chain)
          data[chain] = { ...response[chain] };
      });

      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  useEffect(() => {
    const initialHandler = async () => {
      dispatch(setIsLoading(true));
      const sweepData = await fetchData(sweepFetch);
      const sweeprData = await fetchData(sweeprFetch);

      dispatch(setSweepData(sweepData));
      dispatch(setSweeprData(sweeprData));
      dispatch(setIsLoading(false));
    };

    if(init.current === 1) {
      initialHandler();
      init.current = 0;
    }
  }, [dispatch]);

  useEffect(() => {
    const updateHandler = async () => {
      if(sweepUpdates > 0) {
        const sweepData = await fetchData(sweepFetch);
        dispatch(setSweepData(sweepData));
      }
    };

    updateHandler();
  }, [dispatch, sweepUpdates]);

  useEffect(() => {
    const updateHandler = async () => {
      if(sweeprUpdates > 0) {
        const sweeprData = await fetchData(sweeprFetch);
        dispatch(setSweeprData(sweeprData));
      }
    };

    updateHandler();
  }, [dispatch, sweeprUpdates]);

  useEffect(() => {
    if(notification?.type) {
      if(notification.type === 'info') {
        notifyMsgWithLink(notification.msg, notification.network, notification.value)
      } else {
        notifyMsg(notification.msg, notification.type)
      }
    }
  }, [notification]);

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
          { isLoading && <Loader /> }
          <ToastContainer className='z-20' toastClassName="z-20" />
          <BridgeModal />
          <BuySweepModal />
        </Layout>
      </BrowserRouter>
    </div >
  );
}

export default App;
