const promisePool = require("../config/db/db");
const {v4: uuidv4} = require("uuid");
const moment = require("moment/moment");
const {generateUniqueNumber, generateUniqueAccount} = require("../utils/account");

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
        this.term = account.term
    }

    static getAllAccount = async () => {
        const [rows, fields] = await promisePool.query("SELECT * FROM account;");
        return rows;
    };

    static getAccountByAccountNumber = async (AccountNumber) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM account where accountNumber =?",
            [AccountNumber]
        );
        return rows[0];
    }

    static getDVSDByClient = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM account where accountNumber =?",
            [AccountNumber]
        );
        return rows[0];
    }


    static createAccount = async (account) => {
        const idAccount = uuidv4({format: "hex"}).substring(0, 32);
        const effDate = moment();
        const openDate = moment();
        const endDate = '9999-12-31'
        const accountStatus = 'Đang hoạt động'
        const [result] = await promisePool.query(
            "INSERT INTO account (idAccount, idClient, typeAccount, effDate, endDate, accountNumber, currentBalance, currency, openDate, accountStatus, interestRate, maturityDate, term) VALUES (?,?,?,?,?,?,?,?,?,?,?,DATE_ADD(effDate, INTERVAL term MONTH),?);",
            [
                idAccount,
                account.idClient,
                account.typeAccount,
                effDate.format('YYYY-MM-DD'),
                endDate,
                account.accountNumber,
                account.currentBalance,
                account.currency,
                openDate.format('YYYY-MM-DD'),
                accountStatus,
                account.interestRate,
                account.term,

            ]
        )
        const newData = {id: result.insertId, ...account};
        return newData;
    }
    static getAccountByIdClient = async (idClient) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM account WHERE idClient = ?;",
            [idClient]
        );
        return rows;
    }
};
