const HoSo = require("../models/hoso");
const Client = require("../models/client");
const {generateUniqueHoSo} = require("../utils/hoso");
const {DVSD} = require("../utils/typeAccount");
const LoaiVay = require("../models/loaivay");
const {tinhGocLaiTBTheoThang} = require("../utils/TinhGocLaiTheoThang");
const Diem = require('../utils/Diem')
const MoHinhBIDV = require('../models/mhbidv')
const Loan = require('../models/loan')
const MoHinhEY = require('../models/mhey')
const User = require("../models/user");
const {mergeFields} = require("../utils/mergeField");
const {updateIfNull} = require("../utils/updateIfNull");


const hoSoController = {
    // [GET] /hoso/
    listHoSo: async (req, res, next) => {
        try {
            const listHoSo = await HoSo.getAllHoSo();
            res.json({
                code: 1000,
                data: listHoSo,
                message: "Danh sách hồ sơ tìm thấy thành công"
            })
        } catch (error) {
            res.json({
                code: 9992,
                data: {message: "Không tìm thấy danh sách hồ sơ"},
            });
        }
    },

//     [Post] /hoso/createHoSo
    createHoSo: async (req, res, next) => {
        try {
            const existClient = await Client.getClientByMaKH(req.body.MaKH)
            if (!existClient) {
                res.json({
                    code: 9998,
                    data: {
                        message: "Khách hàng chưa đăng ký",
                    },
                });
            }
            const loaivay = {
                TenLoaiVay: req.body.TenLoaiVay,
                LoaiTraGoc: req.body.LoaiTraGoc,
                LoaiTraLai: req.body.LoaiTraLai
            }
            const idLoaiVay = await LoaiVay.getidLoaiVay(loaivay)
            const maHoSo = await generateUniqueHoSo()
            const dichvusudung = await DVSD(req.body.MaKH)
            const sotientra = await tinhGocLaiTBTheoThang({
                tongtientra: req.body.TongTienVay,
                laisuatvay: req.body.LaiSuatVay,
                kyhan: req.body.KyHan,
                loaitragoc: loaivay.loaitragoc,
                loaitralai: loaivay.loaitralai
            })
            const diemTuoi = await Diem.DiemTuoi(existClient.Tuoi)
            const hoso = {
                idClient: existClient.idClient,
                MaKH: req.body.MaKH,
                maHoSo: maHoSo,
                typeTienTra: req.body.typeTienTra,
                LaiSuatVay: req.body.LaiSuatVay,
                TongTienVay: req.body.TongTienVay,
                KyHan: req.body.KyHan,
                TrinhDoHocVan: req.body.TrinhDoHocVan?.trinhdohocvan,
                DiemTrinhDoHocVan: req.body.TrinhDoHocVan?.diem,
                TienAn: req.body.TienAn?.tienan,
                DiemTienAn: req.body.TienAn?.diem,
                TinhTrangCuTru: req.body.TinhTrangCuTru?.tinhtrangcutru,
                DiemTTCuTru: req.body.TinhTrangCuTru?.diem,
                SoNguoiAnTheo: req.body.SoNguoiAnTheo?.songuoiantheo,
                DiemSoNguoiAnTheo: req.body.SoNguoiAnTheo?.diem,
                CoCauGD: req.body.CoCauGD?.cocaugd,
                DiemCoCauGD: req.body.CoCauGD?.diem,
                BHNhanTho: req.body.BHNhanTho?.bhnhantho,
                DiemBHNhanTho: req.body.BHNhanTho?.diem,
                CongViec: req.body.CongViec?.congviec,
                DiemCongViec: req.body.CongViec?.diem,
                ThoiGianLamViec: req.body.ThoiGianLamViec?.thoigianlamviec,
                DiemTGLamViec: req.body.ThoiGianLamViec?.diem,
                RuiRoNN: req.body.RuiRoNN?.ruironn,
                DiemRuiRoNN: req.body.RuiRoNN?.diem,
                ThuNhapRong: req.body.ThuNhapRong?.thunhaprong,
                DiemThuNhapRong: req.body.ThuNhapRong?.diem,
                CacDVSD: dichvusudung.dichvusudung,
                DiemCacDVSD: dichvusudung.diem,
                idloaiVay: idLoaiVay.idloaiVay,
                SoTienTraHangThang: sotientra.TBthang,
                DiemTuoi: diemTuoi
            }
            // Kiểm tra các trường trong hoso
            for (const [key, value] of Object.entries(hoso)) {
                if (value === undefined || value === null || value === '') {
                    return res.status(400).json({error: `Thiếu thông tin: ${key}`});
                }
            }

            const existHoSo = await HoSo.getHoSoByMaHoSo(maHoSo)
            if (existHoSo) {
                res.json({
                    code: 9993,
                    message: "Hệ thống đã có hồ sơ này",
                });
            } else {
                const newHoSo = await HoSo.createHoSo(hoso)
                res.json({
                    code: 1000,
                    message: "Thêm hồ sơ mới thành công",
                    data: newHoSo
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Không thể thêm hồ sơ mới",
            });
        }
    },

    // [POST] /hoso/createMHBIDVAndEY
    createMHBIDVAndEY: async (req, res, next) => {
        try {
            const hoso = await HoSo.getHoSoByMaHoSo(req.body.MaHoSo)
            const TyLeTienTraTrenThuNhap = (hoso.SoTienTraHangThang / hoso.ThuNhapRong).toFixed(2)
            const DiemTyleTienTraTrenTN = await Diem.DiemTyleTienTraTrenTN(TyLeTienTraTrenThuNhap)
            const TSDBTrenTongNo = (req.body.GiaTriTSDB / hoso.TongTienVay).toFixed(2)
            const DiemTSDBTrenTongNo = await Diem.DiemTSDBTrenTongNo(TSDBTrenTongNo)
            const mhbidv = {
                idHoSo: hoso.idHoSo,
                TyLeTienTraTrenThuNhap: TyLeTienTraTrenThuNhap,
                DiemTyleTienTraTrenTN: DiemTyleTienTraTrenTN,
                LoaiTSDB: req.body.LoaiTSDB?.loaitsdb,
                TenTSDB: req.body.TenTSDB,
                GiaTriTSDB: req.body.GiaTriTSDB,
                RuiRoGiamGiaTSDB: req.body.RuiRoGiamGiaTSDB?.ruirogiamgiatsdb,
                DiemLoaiTSDB: req.body.LoaiTSDB?.diem,
                TSDBTrenTongNo: TSDBTrenTongNo,
                DiemTSDBTrenTongNo: DiemTSDBTrenTongNo,
                DiemRuiRoGiamGiaTSDB: req.body.RuiRoGiamGiaTSDB?.diem,
                TinhHinhTraNo: req.body.TinhHinhTraNoLai?.tinhhinhtranolai,
                DiemTinhHinhTraNo: req.body.TinhHinhTraNoLai?.diem,
            }
            const newmhbidv = await MoHinhBIDV.createBIDV(mhbidv)
            const duno = await Loan.getTongNoByID(hoso.idClient)
            const diemDuNoTrenTSRong = await Diem.DiemDuNoTrenTSRong(duno.TongNo, req.body.TaiSanRong)
            const diemLoiNhuanTrenTN = await Diem.DiemLoiNhuanTrenTN(req.body.LoiNhuan, req.body.DoanhThu, hoso.ThuNhapRong)
            const loaivay = await LoaiVay.getLoaiVayByID(hoso.idloaiVay)
            const sotientra = await tinhGocLaiTBTheoThang({
                tongtientra: hoso.TongTienVay,
                laisuatvay: hoso.LaiSuatVay,
                kyhan: hoso.KyHan,
                loaitragoc: loaivay.loaitragoc,
                loaitralai: loaivay.loaitralai
            })
            const diemTienKeHoachTrenNguonTraNo = await Diem.DiemTienKeHoachTrenNguonTraNo(sotientra.tonggoclaitra, req.body.NguonTraNo)
            const mhey = {
                idHoSo: hoso.idHoSo,
                DuNo: parseFloat(duno.TongNo),
                TaiSanRong: req.body.TaiSanRong,
                DiemDuNoTrenTSRong: diemDuNoTrenTSRong,
                TinhHinhTraNo: req.body.TinhHinhTraNo?.tinhhinhtrano,
                DiemTinhHinhTraNo: req.body.TinhHinhTraNo?.diem,
                TinhHinhTraLai: req.body.TinhHinhTraLai?.tinhhinhtralai,
                DiemTinhHinhTraLai: req.body.TinhHinhTraLai?.diem,
                DanhGiaKNTra: req.body.DanhGiaKNTra?.danhgiakntra,
                DiemDanhGiaKNTra: req.body.DanhGiaKNTra?.diem,
                LoiNhuan: req.body.LoiNhuan,
                DoanhThu: req.body.DoanhThu,
                DiemLoiNhuanTrenTN: diemLoiNhuanTrenTN,
                NguonTraNo: req.body.NguonTraNo,
                DiemTienKeHoachTrenNguonTraNo: diemTienKeHoachTrenNguonTraNo
            }
            const newmhey = await MoHinhEY.createEY(mhey)
            return res.json({
                code: 1000,
                message: "Thêm hồ sơ mới thành công",
                data: newmhbidv, newmhey
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Không thể thêm hồ sơ mới",
            });
        }
    },
    // [PUT] /hoso/updateHoSo
    updateHoSo: async (req, res) => {
        try {
            const result = await HoSo.getHoSoFullByIdHoSo(req.params.id)
            if (result.length === 0) {
                return res.json({
                    code: 9998,
                    data: {
                        message: "Không tìm thấy hồ sơ",
                    },
                });
            }
            const updateResults = await HoSo.updateHoSoDetails(req.params.id, req.body);
            if (updateResults) {
                return res.json({
                    code: 1000,
                    message: "Bổ sung hồ sơ thành công",
                    data: updateResults
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Bổ sung hồ sơ thất bại"
                });
            }
        } catch (err) {
            return res.json({
                code: 9999,
                data: {
                    message: "Không thể thay đổi thông tin hồ sơ",
                },
            });
        }
    },
    // [GET] /hoso/inforHoSo
    getInforHoSo: async (req, res) => {
        try {
            const hoso = await HoSo.getHoSoFullByIdHoSo(req.params.id)
            return res.json({
                code: 1000,
                data: {
                    hoso: hoso,
                    message: "Lấy thông tin thành công",
                },
            });
        } catch (err) {
            return res.json({
                code: 9999,
                data: {
                    message: "Không thể lấy thông tin hồ sơ",
                },
            });
        }
    }

}
module.exports = hoSoController;
