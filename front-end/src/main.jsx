import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import {Provider} from "react-redux";
import {persistor, store} from './redux/store.js'
import Toastify from "./utils/Toastify.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <AppRoutes/>
                    <Toastify/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
