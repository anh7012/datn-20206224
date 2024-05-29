import {refreshToken} from "../utils/axiosInterceptor.js";

function DanhGiaTinDung() {
    return (
        <div>
            <div>aaa</div>
            <button onClick={refreshToken}>refresh Token</button>
        </div>
    );
}

export default DanhGiaTinDung;