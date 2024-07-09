const promisePool = require("../config/db/db");

const generateUniqueHoSo = async () => {
    try {
        const prefix = 'HS';
        const maxDigits = 8; // Số chữ số tối đa cho phần số ngẫu nhiên để tổng cộng có 10 ký tự (HS + 8 chữ số = 10 ký tự)
        const maxNumber = Math.pow(10, maxDigits) - 1; // Tạo số tối đa cho phần số ngẫu nhiên (99999999)

        const randomNumber = Math.floor(Math.random() * (maxNumber + 1)); // Tạo số ngẫu nhiên từ 0 đến 99999999
        const randomPart = randomNumber.toString().padStart(maxDigits, '0'); // Đảm bảo phần số ngẫu nhiên có đủ 8 chữ số        const maHoSo = prefix + randomPart
        const maHoSo = prefix + randomPart;
        const isExist = await isMaHoSoExists(maHoSo);
        if (isExist) {
            return generateUniqueHoSo(); // Nếu số tài khoản đã tồn tại, thử lại với số khác
        } else {
            return maHoSo; // Nếu số tài khoản là duy nhất, trả về số đó
        }
    } catch (error) {
        console.error("Error generating unique account number:", error);
        throw error;
    }
};

const isMaHoSoExists = async (maHoSo) => {
    const [rows, fields] = await promisePool.query(
        "SELECT * FROM hoso where maHoSo =?",
        [maHoSo]
    );
    if (rows.length > 0) {
        const count = rows[0].count;
        return count > 0;
    } else {
        return false; // Nếu không có hàng nào trả về từ cơ sở dữ liệu, tài khoản không tồn tại
    }
};


module.exports = {generateUniqueHoSo}