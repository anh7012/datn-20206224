const promisePool = require("../config/db/db");

const generateUniqueHopDong = async () => {
    try {
        let isUnique = false
        let maHopDong = ''
        while (!isUnique){
            const number = Math.floor(Math.random() * 1000000) + 1; // Tạo một số ngẫu nhiên từ 1 đến 1000000
            const numberString = number.toString().padStart(6, '0');
            maHopDong = `HD${numberString}`;

            // Kiểm tra trong database xem mã hợp đồng này đã tồn tại chưa
            const [rows] = await promisePool.query("SELECT * FROM hopdong WHERE so_hopdong = ?;", [maHopDong]);
            if (rows.length === 0) {
                isUnique = true;
            }
        }
        return maHopDong
    } catch (error) {
        console.error("Error generating unique contract number:", error);
        throw error;
    }
};

module.exports = {generateUniqueHopDong}