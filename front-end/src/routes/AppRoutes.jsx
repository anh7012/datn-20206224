import React from 'react';
import {Route, Routes} from "react-router-dom";
import App from "../page/App.jsx";
import AppTest from "../page/AppTest.jsx";
import Home from "../page/home.jsx";
import Hoso from "../page/hoso.jsx";
import Danhgia from "../page/danhgia.jsx";
import HoSo5 from "../page/HoSo5.jsx";

function AppRoutes(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path={'/home'} element={<Home/>}/>
                    <Route path={'/hoso'} element={<Hoso/>}/>
                    <Route path={'/hoso/:id'} element={<HoSo5/>}/>
                    <Route path={'/danhgia'} element={<Danhgia/>}/>
                </Route>
                <Route path="/test" element={<AppTest/>}/>
            </Routes>
        </div>
    );
}

export default AppRoutes;