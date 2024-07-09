const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment");

module.exports = class LoaiVay {
    constructor(loaivay) {
        this.idloaiVay = loaivay.idloaiVay
        this.TenLoaiVay = loaivay.TenLoaiVay
        this.HinhThucVay = loaivay.HinhThucVay
        this.typeClient = loaivay.typeClient
        this.LoaiTraGoc = loaivay.LoaiTraGoc
        this.LoaiTraLai = loaivay.LoaiTraLai
    }

    static getAllLoaiVay = async () => {
        const [rows, fields] = await promisePool.query("SELECT * FROM loaivay;");
        return rows;
    };
    static getidLoaiVay = async (loaivay) => {
        const [rows, fields] = await promisePool.query(
            "SELECT idloaiVay FROM loaivay WHERE TenLoaiVay =? and LoaiTraGoc =? and LoaiTraLai =? ;",
            [
                loaivay.TenLoaiVay,
                loaivay.LoaiTraGoc,
                loaivay.LoaiTraLai
            ]
        );
        return rows[0];
    };
    static getLoaiVayByID = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM loaivay WHERE idloaiVay =? ;",
            [
                id
            ]
        );
        return rows[0];
    };
}