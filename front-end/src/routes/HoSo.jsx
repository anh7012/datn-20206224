import React from 'react';
import Hoso from "../page/hoso.jsx";
import {Route} from "react-router-dom";
import HoSo5 from "../page/HoSo5.jsx";

function HoSo(props) {
    return (
        <Route path={'/hoso'} element={<Hoso/>}>
            <Route path={'/hoso/:id'} element={<HoSo5/>}/>
        </Route>
    );
}

export default HoSo;