import {Navigate, Route, Routes} from "react-router-dom";
import DangNhap from "../page/DangNhap.jsx";
import App from "../page/App.jsx";
import DanhGiaTinDung from "../page/DanhGiaTinDung.jsx";
import QuanLyNhanVien from "../page/QuanLyNhanVien.jsx";
import DetailUserUnfo from "../page/DetailUserUnfo.jsx";
import QuanLyHoSo from "../page/QuanLyHoSo.jsx";
import FormCreateHoso from "../page/FormCreateHoso.jsx";

function AppRoutes() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="dangnhap" replace />}/>
                <Route path="/dangnhap" element={<DangNhap/>}/>
                <Route path="/home" element={<App />}>
                    <Route index element={<Navigate to="danhgiatindung" replace />} />
                    <Route path="danhgiatindung" element={<DanhGiaTinDung />} />
                    <Route path="quanlyhoso" element={<QuanLyHoSo />} />
                    <Route path="quanlynhanvien" element={<QuanLyNhanVien />} />
                    <Route path=":id" element={<DetailUserUnfo />} />
                    <Route path="toahosomoi" element={<FormCreateHoso />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AppRoutes;