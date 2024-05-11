import React from 'react';
import {Link} from "react-router-dom";

function Nav(props) {
    return (
        <div>
            <Link to={'/home'}>
                Home
            </Link>
            <Link to={'/hoso'}>
                Hoso
            </Link>
            <Link to={'/danhgia'}>
                Danhgia
            </Link>
        </div>
    );
}

export default Nav;