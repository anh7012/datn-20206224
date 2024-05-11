const promisePool = require("../config/db/db");

module.exports = class ModelBIDV {
  constructor(mhey) {
    this.id = mhey.idMHEY;
    this.idHoSo = mhey.idHoSo;
    this.idDGTD = mhey.idDGTD;
    this.DuNoTrenTongTS = mhey.DuNoTrenTongTS;
    this.TinhHinhTraNo = mhey.TinhHinhTraNo;
    this.TinhHinhTraLai = mhey.TinhHinhTraLai;
    this.CacDVSD = mhey.CacDVSD;
    this.DanhGiaKNTra = mhey.DanhGiaKNTra;
    this.LoiNhuanTrenTN = mhey.LoiNhuanTrenTN;
    this.TienKeHoachTrenNguonTraNo = mhey.TienKeHoachTrenNguonTraNo;
    this.populationDate = mhey.populationDate;
  }
  static getAll = async () => {
    const [rows, fields] = await promisePool.query("SELECT * FROM mhey;");
    return rows;
  };
};
