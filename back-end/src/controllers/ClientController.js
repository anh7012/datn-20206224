const Client = require('../models/client')
const {mergeFields} = require("../utils/mergeField");
const validator = require('validator');
const Account = require("../models/account");
<<<<<<< HEAD

=======
const Wards = require("../models/ward");
const District = require("../models/district");
const Province = require("../models/province");
>>>>>>> origin/main


const ClientController = {
    // [GET] /hoso/loaiKH
    getLoaiKH: async (req, res) => {
        try {
            const khachhang = await Client.getloaiClientByMaKH(req.body.maKH)
<<<<<<< HEAD
            if (khachhang){
=======
            if (khachhang) {
>>>>>>> origin/main
                return res.json({
                    code: 1000,
                    data: khachhang,
                    message: "Tìm thấy khách hàng thành công"
                });
            } else {
                return res.json({
                    code: 9992,
                    data: khachhang,
                    message: "Không tìm thấy khách hàng"
                });
            }
        } catch (err) {
            return res.json({
                code: 9999,
                message: "Không tìm thấy khách hàng "
            });
        }

    },
    // [GET] Client/ -- list khach hang
    inforClient: async (req, res, next) => {
        try {
            const khachhang = await Client.getClientById(req.params.id)
<<<<<<< HEAD
            if (khachhang){
                return res.json({
                    code: 1000,
                    data: khachhang,
=======
            // Tách chuỗi DiaChi bằng dấu , và loại bỏ khoảng trắng thừa
            const diaChiParts = khachhang.DiaChi ? khachhang.DiaChi.split(',').map(part => part.trim()) : [];
            const diaChi = diaChiParts[0] || '';
            const xa = diaChiParts[1] || '';
            const huyen = diaChiParts[2] || '';
            const tinh = diaChiParts[3] || '';
            const idXa = await Wards.getWardsBy(xa)
            const idHuyen = await District.getDistrictById(huyen)
            const idTinh = await Province.getProvinceById(tinh)
            // Tách chuỗi DiaChi bằng dấu , và loại bỏ khoảng trắng thừa
            const hoKhauParts = khachhang.HoKhau ? khachhang.HoKhau.split(',').map(part => part.trim()) : [];
            const diaChiHK = hoKhauParts[0] || '';
            const xaHK = hoKhauParts[1] || '';
            const huyenHK = hoKhauParts[2] || '';
            const tinhHK = hoKhauParts[3] || '';
            const idXaHK = await Wards.getWardsBy(xaHK)
            const idHuyenHK = await District.getDistrictById(huyenHK)
            const idTinhHk = await Province.getProvinceById(tinhHK)
            if (khachhang) {
                return res.json({
                    code: 1000,
                    data: {
                        khachhang: khachhang,
                        diaChi: diaChi,
                        xa: xa,
                        huyen: huyen,
                        tinh: tinh,
                        idXa: idXa,
                        idHuyen: idHuyen,
                        idTinh: idTinh,
                        idXaHK: idXaHK,
                        idHuyenHK: idHuyenHK,
                        idTinhHk: idTinhHk,
                        diaChiHK: diaChiHK,
                        xaHK: xaHK,
                        huyenHK: huyenHK,
                        tinhHK: tinhHK
                    },
>>>>>>> origin/main
                    message: "Tìm thấy khách hàng thành công"
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Không tìm thấy khách hàng"
                });
            }
        } catch (error) {
            res.json({
                code: 9992,
                data: {message: "Không tìm thấy khách hàng"},
            });
        }
    },
    // [GET]
    listClient: async (req, res) => {
        try {
            const listClient = await Client.getAllClient();
<<<<<<< HEAD
            if (listClient){
=======
            if (listClient) {
>>>>>>> origin/main
                return res.json({
                    code: 1000,
                    data: listClient,
                    message: "Tìm thấy danh sách khách hàng thành công"
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Không tìm thấy danh sách khách hàng"
                });
            }
        } catch (error) {
            res.json({
                code: 9992,
                data: {message: "Không tìm thấy danh sách khách hàng"},
            });
        }
    },
    // [post] client/themkhachhang
    createClient: async (req, res, next) => {
        try {
<<<<<<< HEAD
            const diaChi = {
                DiaChi: req.body.DiaChi,
                xa: req.body.xa,
                huyen: req.body.huyen,
                tinh: req.body.tinh,
            }
            const hoKhau = {
                DiaChi: req.body.HoKhauDiaChi,
                xa: req.body.HoKhauXa,
                huyen: req.body.HoKhauHuyen,
                tinh: req.body.HoKhauTinh,
=======
            const xa = await Wards.getWardsById(req.body.xa)
            const huyen = await District.getDistrictById(req.body.huyen)
            const tinh = await Province.getProvinceById(req.body.tinh)
            const diaChi = {
                DiaChi: req.body.DiaChi,
                xa: xa,
                huyen: huyen,
                tinh: tinh,
            }
            const xaHK = await Wards.getWardsById(req.body.HoKhauXa)
            const huyenHK = await District.getDistrictById(req.body.HoKhauHuyen)
            const tinhHK = await Province.getProvinceById(req.body.HoKhauTinh)
            const hoKhau = {
                DiaChi: req.body.HoKhauDiaChi,
                xa: xaHK,
                huyen: huyenHK,
                tinh: tinhHK,
>>>>>>> origin/main
            }
            let concatenatedDiaChi = '';
            let concatenatedHoKhau = '';
            if (typeof diaChi === 'object' && diaChi !== null) {
                const diaChiValues = Object.values(diaChi);
                concatenatedDiaChi = diaChiValues.join(','); // Nối các giá trị với dấu phẩy
            }

            if (typeof hoKhau === 'object' && hoKhau !== null) {
                const hoKhauValues = Object.values(hoKhau);
                concatenatedHoKhau = hoKhauValues.join(','); // Nối các giá trị với dấu phẩy
            }

            const client = {
                HoTen: req.body.HoTen,
                NgaySinh: req.body.NgaySinh,
                GioiTinh: req.body.GioiTinh,
                DiaChi: concatenatedDiaChi,
                sdt: req.body.sdt,
                email: req.body.email,
                CCCD: req.body.CCCD,
                typeClient: req.body.typeClient,
                HoKhau: concatenatedHoKhau,
                NoiCapCCCD: req.body.NoiCapCCCD,
                NgayCapCCCD: req.body.NgayCapCCCD

            }
            const existClient = await Client.getClientByEmail(client.email)
            if (
                !client.HoTen ||
                !client.NgaySinh ||
                !client.email ||
                !client.CCCD ||
                !client.typeClient
            ) {
                res.json({
                    code: 9998,
                    data: {
                        message: "Vui lòng nhập đầy đủ thông tin",
                    },
                });
            } else if (existClient) {
                res.json({
                    code: 9993,
                    message: "Hệ thống đã có khách hàng này",
                });
            } else {
                const newClient = await Client.createClient(client)
                res.json({
                    code: 1000,
                    message: "Thêm khách hàng mới thành công",
                    data: newClient
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Không thể thêm khách hàng mới",
            });
        }
    },
    // [put] client/:id/suakhachhang
    updateClient: async (req, res) => {
        try {
<<<<<<< HEAD
            const diaChi = {
                DiaChi: req.body.DiaChi,
                xa: req.body.xa,
                huyen: req.body.huyen,
                tinh: req.body.tinh,
            }
            const hoKhau = {
                DiaChi: req.body.HoKhauDiaChi,
                xa: req.body.HoKhauXa,
                huyen: req.body.HoKhauHuyen,
                tinh: req.body.HoKhauTinh,
=======
            const xa = await Wards.getWardsById(req.body.xa)
            const huyen = await District.getDistrictById(req.body.huyen)
            const tinh = await Province.getProvinceById(req.body.tinh)
            const diaChi = {
                DiaChi: req.body.DiaChi,
                xa: xa,
                huyen: huyen,
                tinh: tinh,
            }
            const xaHK = await Wards.getWardsById(req.body.HoKhauXa)
            const huyenHK = await District.getDistrictById(req.body.HoKhauHuyen)
            const tinhHK = await Province.getProvinceById(req.body.HoKhauTinh)
            const hoKhau = {
                DiaChi: req.body.HoKhauDiaChi,
                xa: xaHK,
                huyen: huyenHK,
                tinh: tinhHK,
>>>>>>> origin/main
            }
            let concatenatedDiaChi = '';
            let concatenatedHoKhau = '';
            if (typeof diaChi === 'object' && diaChi !== null) {
                const diaChiValues = Object.values(diaChi);
                concatenatedDiaChi = diaChiValues.join(','); // Nối các giá trị với dấu phẩy
            }

            if (typeof hoKhau === 'object' && hoKhau !== null) {
                const hoKhauValues = Object.values(hoKhau);
                concatenatedHoKhau = hoKhauValues.join(','); // Nối các giá trị với dấu phẩy
            }
            const new_data = {
                HoTen: req.body.HoTen,
                NgaySinh: req.body.NgaySinh,
                GioiTinh: concatenatedDiaChi,
                DiaChi: req.body.DiaChi,
                sdt: req.body.sdt,
                email: req.body.email,
<<<<<<< HEAD
                HoKhau:concatenatedHoKhau
            }
            const old_data = await Client.getInforClientById(req.params.id)
            const final_data = await mergeFields(new_data, old_data)
            if(!validator.isEmail(final_data.email)) {
=======
                HoKhau: concatenatedHoKhau
            }
            const old_data = await Client.getInforClientById(req.params.id)
            const final_data = await mergeFields(new_data, old_data)
            if (!validator.isEmail(final_data.email)) {
>>>>>>> origin/main
                res.json({
                    code: 1006, error: "Invalid email address"
                });
            } else {
                const data = await Client.updateClient({
                    HoTen: final_data.HoTen,
                    NgaySinh: final_data.NgaySinh,
                    GioiTinh: final_data.GioiTinh,
                    DiaChi: final_data.DiaChi,
                    sdt: final_data.sdt,
                    email: final_data.email,
                    id: req.params.id,
                    HoKhau: final_data.HoKhau
                });
                if (data.affectedRows == 1) {
                    res.json({
                        code: 1000,
                        data: {
                            message: "Thông tin khách hàng đã được cập nhật thành công!",
                        },
                    });
                } else {
                    res.json({
                        code: 1001,
                        data: {
                            message: "Thông tin khách hàng cập nhật thất bại",
                        },
                    });
                }
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({
                message: "Không thể thay đổi thông tin khách hàng",
            });
        }
    },
    listAccount: async (req, res, next) => {
        try {
            const listAccount = await Account.getAccountByIdClient(req.params.id)
            if (listAccount) {
                return res.json({
                    code: 1000,
                    data: listAccount,
                    message: "Tìm thấy danh sách tài khoản khách hàng thành công"
                });
            } else {
                return res.json({
                    code: 9992,
                    message: "Không tìm thấy danh sách tài khoản khách hàng"
                });
            }
        } catch (error) {
            res.json({
                code: 9992,
                data: {message: "Không tìm thấy khách hàng"},
            });
        }
    },
}
module.exports = ClientController;