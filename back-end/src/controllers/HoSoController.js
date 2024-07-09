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
const cloudinary = require('../config/cloud');
const {extname} = require("node:path");

let index = 0;


const hoSoController = {
    // [GET] /hoso/
    listHoSo: async (req, res, next) => {
        try {
            const listHoSo = await HoSo.getAllHoSo();
            if (listHoSo) {
                res.json({
                    code: 1000,
                    data: listHoSo,
                    message: "Danh sách hồ sơ tìm thấy thành công"
                })
            } else {
                res.json({
                    code: 9992,
                    message: "Không tìm thấy danh sách hồ sơ",
                });
            }
        } catch (error) {
            console.log(error)
            res.json({
                code: 9999,
                message: "Không tìm thấy danh sách hồ sơ",
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
            console.log('>>', loaivay)
            const idLoaiVay = await LoaiVay.getidLoaiVay(loaivay)
            console.log('>>>>', idLoaiVay)
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
                DiemTuoi: diemTuoi,
                trangthaihoso: "Cần bổ sung"
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
            // Kết hợp hai đối tượng thành một mảng các cặp khóa-giá trị để kiểm tra
            const combinedMH = [
                ...Object.entries(mhbidv),
                ...Object.entries(mhey)
            ];
            // Kiểm tra trạng thái hồ sơ
            let trangthaihoso
            for (const [key, value] of combinedMH) {
                if (value === null || value === undefined) {
                    trangthaihoso = await HoSo.updateTrangThai({
                        trangthaihoso: "Cần bổ sung",
                        idHoSo: hoso.idHoSo
                    });
                    break;
                } else {
                    trangthaihoso = await HoSo.updateTrangThai({
                        trangthaihoso: "Hoàn thiện",
                        idHoSo: hoso.idHoSo
                    });
                }
            }
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
            console.log('>>>>>', hoso)
            return res.json({
                code: 1000,
                data: hoso,
                message: "Lấy thông tin thành công"
            });
        } catch (err) {
            console.log(err)
            return res.json({
                code: 9999,
                data: {
                    message: "Không thể lấy thông tin hồ sơ",
                },
            });
        }
    },
    updateTrangThai: async (req, res) => {
        try {
            const hoso = await HoSo.getHoSoByIdHoSo(req.params.id)
            if (!hoso) {
                return res.json({
                    code: 9992,
                    message: "Không tìm thấy hồ sơ",
                })
            }
            const trangthai = await HoSo.updateTrangThai({
                trangthaihoso: req.body.trangthaihoso,
                idHoSo: req.params.id
            })
            const newHoSo = await HoSo.getHoSoByIdHoSo(req.params.id)
            if (trangthai.affectedRows == 1) {
                return res.json({
                    code: 1000,
                    data: newHoSo,
                    message: "Thay đổi trạng thái hồ sơ thành công",
                })
            } else {
                return res.json({
                    code: 9992,
                    message: "Thay đổi trạng thái hồ sơ thất bại",
                })
            }
        } catch (err) {
            console.log(err)
            return res.json({
                code: 9999,
                message: "Không thể thay đổi trạng thái hồ sơ",
            })
        }
    },

    uploadFiles: async (req, res) => {
        try {
            const { files } = req;
            if (!files || files.length === 0) {
                throw new Error("No files received");
            }

            const myFiles = Array.isArray(files?.HoSoFiles) ? files?.HoSoFiles : [files?.HoSoFiles];
            const filesUploadPromise = myFiles.map(file => {
                const fileName = file?.originalFilename.replace(/\.[^/.]+$/, ""); // Loại bỏ phần mở rộng tệp
                const timestamp = Date.now();
                const newFileName = `${fileName}_${timestamp}_${index++}`; // Tạo tên tệp mới với dấu thời gian và chỉ số

                return cloudinary.uploader.upload(file?.filepath, {
                    resource_type: "auto",
                    public_id: `${newFileName}` // Đặt tên tệp trong Cloudinary
                });
            });

            const idClouds = await Promise.all(filesUploadPromise);
            const cloudIdsString = idClouds.map(cloudRes => cloudRes.public_id).join(',');

            const existUrl = await HoSo.getIdCloud(req.params.idHoSo)
            if (existUrl) {
                // Append new Cloud IDs to existing ones
                const existingCloudIds = existUrl.split(',');
                const updatedCloudIds = existingCloudIds.concat(cloudIdsString.split(',')).join(',');

                // Update the record with new Cloud IDs
                await HoSo.saveIdCloud({
                    urlHoSo: updatedCloudIds,
                    idHoSo: req.params.idHoSo
                });
            } else {
                await HoSo.saveIdCloud({
                    urlHoSo: cloudIdsString,
                    idHoSo: req.params.idHoSo
                });
            }

            return res.json({
                code: 1000,
                data: {
                    public_id: idClouds.map(cloudRes => cloudRes.public_id)
                },
                message: "Tải lên tệp hồ sơ và cập nhật cloud_id thành công",
            });
        } catch (err) {
            console.error('Error uploading files', err);
            return res.status(500).json({
                code: 9999,
                message: "Không thể tải lên tệp hồ sơ và cập nhật cloud_id",
            });
        }
    },
    getFiles: async (req, res) => {
        try {
            const idCloud = await HoSo.getIdCloud(req.params.idHoSo)
            if (!idCloud) {
                return res.json({
                    code: 9992,
                    message: "Hồ sơ không tồn tại hoặc không có dữ liệu idCloud",
                })
            }
            let idPublics = [];
            if (typeof idCloud === 'string') {
                idPublics = idCloud.split(',');
            } else {
                console.error('Invalid idCloud:', idCloud);
                return res.json({
                    code: 9993,
                    message: "Lỗi khi lấy đường dẫn URL của hồ sơ",
                });
            }
            const urls = idPublics.map(public_id => {
                return cloudinary.url(public_id + '.pdf', {
                    secure: true, // Sử dụng HTTPS để đảm bảo an toàn
                    resource_type: 'image'
                });
            })
            if (urls) {
                return res.json({
                    code: 1000,
                    data: urls,// Chuyển hướng người dùng đến URL của tệp PDF để xem nó trong trình duyệt
                    message: "Đã lấy danh sách đường dẫn URL thành công",
                })
            } else {
                return res.json({
                    code: 9993,
                    data: urls,// Chuyển hướng người dùng đến URL của tệp PDF để xem nó trong trình duyệt
                    message: "Lỗi khi lấy đường dẫn URL của hồ sơ",
                })
            }
        } catch (err) {
            console.log(err)
            return res.json({
                code: 9999,
                message: "Không thể hiển thị tệp hồ sơ",
            })
        }
    }
}

module.exports = hoSoController;
