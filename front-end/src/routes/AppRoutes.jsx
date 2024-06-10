import {Navigate, Route, Routes} from "react-router-dom";
import DangNhap from "../page/DangNhap.jsx";
import App from "../components/layout/App.jsx";
import DanhGiaTinDung from "../page/DanhGiaTinDung.jsx";
import QuanLyNhanVien from "../page/quanlynhanvien/QuanLyNhanVien.jsx";
import DetailUserUnfo from "../page/quanlynhanvien/DetailUserUnfo.jsx";
import QuanLyHoSo from "../page/quanlyhoso/QuanLyHoSo.jsx";
import FormCreateHoso from "../page/quanlyhoso/FormCreateHoso.jsx";
import DetailHoso from "../page/quanlyhoso/DetailHoso.jsx";
import QuanLyKhachHang from "../page/quankhachhang/QuanLyKhachHang.jsx";
import CreateClient from "../page/quankhachhang/CreateClient.jsx";
import ModalCreateUser from "../page/quanlynhanvien/ModalCreateUser.jsx";
import CreateNV from "../page/quanlynhanvien/CreateNV.jsx";

function AppRoutes() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="dangnhap" replace />}/>
                <Route path="/dangnhap" element={<DangNhap/>}/>
                <Route path="/home" element={<App />}>
                    <Route index element={<Navigate to="danhgiatindung" replace />} />
                    <Route path="danhgiatindung" element={<DanhGiaTinDung />} />
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
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default AppRoutes;