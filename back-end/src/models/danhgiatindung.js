const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment/moment");

module.exports = class DanhGiaTinDung {
    constructor(danhgiatindung) {
        this.id = danhgiatindung.idDGTD
        this.idHoSo = danhgiatindung.idHoSo
        this.XHCaNhanBIDV = danhgiatindung.XHCaNhanBIDV
        this.XHEY = danhgiatindung.XHEY
        this.DanhGiaXH = danhgiatindung.DanhGiaXH
        this.MucDoRuiRo = danhgiatindung.MucDoRuiRo
        this.populationDate = danhgiatindung.populationDate
        this.DanhGiaCaNhanBIDV = danhgiatindung.DanhGiaCaNhanBIDV
        this.XHTSDBBIDV = danhgiatindung.XHTSDBBIDV
        this.DanhGiaTSDBBIDV = danhgiatindung.DanhGiaTSDBBIDV
        this.KetQuaDanhGiaBIDV = danhgiatindung.KetQuaDanhGiaBIDV
    }
    static getAllDanhGia = async () => {
        const [rows, fields] = await promisePool.query("SELECT hoso.maHoSo, danhgiatindung.idDGTD, hoso.idHoSo, client.idClient, client.HoTen, hoso.created_at, danhgiatindung.populationDate FROM danhgiatindung JOIN hoso ON hoso.idHoSo = danhgiatindung.idHoSo JOIN client ON client.idClient = hoso.idClient");
        return rows;
    }

    static getDanhGiaByMaHoSo = async (maHoSo) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM danhgiatindung JOIN hoso ON hoso.idHoSo = danhgiatindung.idHoSo WHERE hoso.maHoSo = ?",
            [maHoSo]
        );
        return rows[0];
    }

    static getDanhGiaById = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM danhgiatindung WHERE idDGTD = ?; ",
            [id]
        );
        return rows[0];
    }

    static createDanhGiaTinDung = async (danhgia) => {
        const idDGTD = uuidv4({format: "hex"}).substring(0, 32);
        const [result] = await promisePool.query(
            "INSERT INTO danhgiatindung (idDGTD, idHoSo, XHCaNhanBIDV, XHEY, DanhGiaXH, MucDoRuiRo, populationDate, DanhGiaCaNhanBIDV, XHTSDBBIDV, DanhGiaTSDBBIDV, KetQuaDanhGiaBIDV) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP,?,?,?,?);",
            [
                idDGTD,
                danhgia.idHoSo,
                danhgia.XHCaNhanBIDV,
                danhgia.XHEY,
                danhgia.DanhGiaXH,
                danhgia.MucDoRuiRo,
                danhgia.DanhGiaCaNhanBIDV,
                danhgia.XHTSDBBIDV,
                danhgia.DanhGiaTSDBBIDV,
                danhgia.KetQuaDanhGiaBIDV,
            ]
        )
        const newData = {id: idDGTD, ...danhgia};
        return newData;
    }
}