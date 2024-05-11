import React from 'react';
import {Link, Outlet} from "react-router-dom";

function Hoso(props) {
    return (
        <div>
            here is hoso hoso
            <div>
                <Link to={'/hoso/5'} >
                    Toi ho so ng thu 5
                </Link>
                <Outlet/>
            </div>
        </div>
    );
}

export default Hoso;