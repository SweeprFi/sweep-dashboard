import { configureStore } from "@reduxjs/toolkit";
import reducer from './app.reducers';

export default configureStore({ reducer });

