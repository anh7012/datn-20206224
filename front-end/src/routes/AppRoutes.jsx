import {Navigate, Route, Routes} from "react-router-dom";
import DangNhap from "../page/DangNhap.jsx";
import App from "../page/App.jsx";
import DanhGiaTinDung from "../page/DanhGiaTinDung.jsx";
import QuanLyNhanVien from "../page/QuanLyNhanVien.jsx";


function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/dangnhap" element={<DangNhap/>}/>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to="danhgiatindung" replace />} />
                    <Route path="danhgiatindung" element={<DanhGiaTinDung />} />
                    <Route path="quanlynhanvien" element={<QuanLyNhanVien />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AppRoutes;