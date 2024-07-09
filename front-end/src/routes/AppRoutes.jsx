import {Navigate, Route, Routes} from "react-router-dom";
import DangNhap from "../page/DangNhap.jsx";
import App from "../components/layout/App.jsx";
import DanhGiaTinDung from "../page/danhgiatindung/DanhGiaTinDung.jsx";
import QuanLyNhanVien from "../page/quanlynhanvien/QuanLyNhanVien.jsx";
import DetailUserUnfo from "../page/quanlynhanvien/DetailUserUnfo.jsx";
import QuanLyHoSo from "../page/quanlyhoso/QuanLyHoSo.jsx";
import FormCreateHoso from "../page/quanlyhoso/FormCreateHoso.jsx";
import DetailHoso from "../page/quanlyhoso/DetailHoso.jsx";
import QuanLyKhachHang from "../page/quankhachhang/QuanLyKhachHang.jsx";
import CreateClient from "../page/quankhachhang/CreateClient.jsx";
import CreateNV from "../page/quanlynhanvien/CreateNV.jsx";
import DetailKH from "../page/quankhachhang/DetailKH.jsx";
import Dashboard from "../page/danhgiatindung/Dashboard.jsx";
import QuanLyHopDong from "../page/quanlyhopdong/QuanLyHopDong.jsx";
import TaoHopDongMoi from "../page/quanlyhopdong/TaoHopDongMoi.jsx";
import DetailHD from "../page/quanlyhopdong/DetailHD.jsx";

function AppRoutes() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="dangnhap" replace />}/>
                <Route path="/dangnhap" element={<DangNhap/>}/>
                <Route path="/home" element={<App />}>
                    <Route index element={<Navigate to="danhgiatindung" replace />} />
                    <Route path="danhgiatindung" element={<DanhGiaTinDung />} >
                        <Route path=":idDashBoard" element={<Dashboard />} />
                    </Route>
                    <Route path="quanlyhoso" element={<QuanLyHoSo />} >
                        <Route path=":idHoso" element={<DetailHoso />} />
                        <Route path="taohosomoi" element={<FormCreateHoso />} />
                    </Route>
                    <Route path="quanlynhanvien" element={<QuanLyNhanVien />} >
                        <Route path=":id" element={<DetailUserUnfo />} />
                        <Route path="themnhanvienmoi" element={<CreateNV />} />
                    </Route>
                    <Route path="quanlykhachhang" element={<QuanLyKhachHang />} >
                        <Route path="themkhachhangmoi" element={<CreateClient />} />
                        <Route path=":idKH" element={<DetailKH />} />
                    </Route>
                    <Route path="quanlyhopdong" element={<QuanLyHopDong />} >
                        <Route path="themhopdongmoi" element={<TaoHopDongMoi />} />
                        <Route path=":idHD" element={<DetailHD />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default AppRoutes;