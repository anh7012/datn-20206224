const Client = require('../models/client')
const {mergeFields} = require("../utils/mergeField");
const validator = require('validator');


const ClientController = {
    // [GET] /hoso/loaiKH
    getLoaiKH: async (req, res) => {
        try {
            const khachhang = await Client.getloaiClientByMaKH(req.body.maKH)
            if (khachhang){
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
            if (khachhang){
                return res.json({
                    code: 1000,
                    data: khachhang,
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
            if (listClient){
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
            const client = {
                HoTen: req.body.HoTen,
                NgaySinh: req.body.NgaySinh,
                GioiTinh: req.body.GioiTinh,
                DiaChi: req.body.DiaChi,
                sdt: req.body.sdt,
                email: req.body.email,
                CCCD: req.body.CCCD,
                typeClient: req.body.typeClient,
                HoKhau: req.body.HoKhau,
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
            const old_data = await Client.getInforClientById(req.params.id)
            const new_data = await mergeFields(req.body, old_data)
            if(!validator.isEmail(new_data.email)) {
                res.json({
                    code: 1006, error: "Invalid email address"
                });
            } else {
                const data = await Client.updateClient({
                    HoTen: new_data.HoTen,
                    NgaySinh: new_data.NgaySinh,
                    GioiTinh: new_data.GioiTinh,
                    DiaChi: new_data.DiaChi,
                    sdt: new_data.sdt,
                    email: new_data.email,
                    id: req.params.id
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
    }
}
module.exports = ClientController;