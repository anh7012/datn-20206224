const promisePool = require("../config/db/db");

module.exports = class Account {
  constructor(account) {
    this.idAccount = account.idAccount;
    this.idClient = account.idClient;
    this.typeAccount = account.typeAccount;
    this.effDate = account.effDate;
    this.endDate = account.endDate;
    this.accountName = account.accountName;
    this.accountNumber = account.accountNumber;
    this.currentBalance = account.currentBalance;
    this.currency = account.currency;
    this.openDate = account.openDate;
    this.lastUpdatedDate = account.lastUpdatedDate;
    this.accountStatus = account.accountStatus;
    this.interestRate = account.interestRate;
    this.maturityDate = account.maturityDate;
    this.feesAndCharges = account.feesAndCharges;
  }
  static getAll = async () => {
    const [rows, fields] = await promisePool.query("SELECT * FROM account;");
    return rows;
  };
};
