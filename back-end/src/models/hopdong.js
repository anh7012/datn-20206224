const promisePool = require("../config/db/db");

module.exports = class HopDong {
  constructor(hopdong) {
    this.id = hopdong.idHopDong;
    this.idHoSo = hopdong.idHoSo;
    this.type = hopdong.typeHopDong;
    this.startDate = hopdong.NgayBatDau;
    this.soHD = hopdong.SoHD;
    this.LaiTamThoi = hopdong.LaiVayTamThoi;
    this.LaiCoDinh = hopdong.LaiCoDinh;
    this.maturityDate = hopdong.NgayDaoHan;
    this.effDate = hopdong.effDate;
    this.endDate = hopdong.endDate;
  }
  static getAllHD = async () => {
    const [rows, fields] = await promisePool.query("SELECT * FROM hopdong;");
    return rows;
  };
};
