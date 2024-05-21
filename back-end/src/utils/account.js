const promisePool = require("../config/db/db");

const generateUniqueAccount = async () => {
    try {
        const randomNumber = Math.floor(Math.random() * 10000000000);
        const accountNumber = String(randomNumber).padStart(10, '0');
        const isExist = await isAccountNumberExists(accountNumber);
        if (isExist) {
            return generateUniqueAccount(); // Nếu số tài khoản đã tồn tại, thử lại với số khác
        } else {
            return accountNumber; // Nếu số tài khoản là duy nhất, trả về số đó
        }
    } catch (error) {
        console.error("Error generating unique account number:", error);
        throw error;
    }
};

const isAccountNumberExists = async (accountNumber) => {
    const [rows, fields] = await promisePool.query(
        "SELECT * FROM account where accountNumber =?",
        [accountNumber]
    );
    if (rows.length > 0) {
        const count = rows[0].count;
        return count > 0;
    } else {
        return false; // Nếu không có hàng nào trả về từ cơ sở dữ liệu, tài khoản không tồn tại
    }
};


module.exports = {generateUniqueAccount}