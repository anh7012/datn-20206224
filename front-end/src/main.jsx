import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import {Provider} from "react-redux";
import store from './redux/store.js'
import Toastify from "./utils/Toastify.jsx";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
          <AppRoutes />
          <Toastify />
      </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
