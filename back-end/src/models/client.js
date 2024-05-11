const promisePool = require("../config/db/db");

module.exports = class Client {
  constructor(client) {
    this.idClient = client.idClient;
    this.idUser = client.idUser;
    this.HoTen = client.HoTen;
    this.NgaySinh = client.NgaySinh;
    this.Tuoi = client.Tuoi;
    this.GioiTinh = client.GioiTinh;
    this.DiaChi = client.DiaChi;
    this.sdt = client.sdt;
    this.email = client.email;
    this.CCCD = client.CCCD;
    this.typeClient = client.typeClient;
    this.populationDate = client.populationDate;
  }
  static getAll = async () => {
    const [rows, fields] = await promisePool.query("SELECT * FROM client;");
    return rows;
  };
};
