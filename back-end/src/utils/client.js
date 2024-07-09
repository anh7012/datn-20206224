const promisePool = require("../config/db/db");

// Hàm tạo mã khách hàng mới
const generateMaKH = () => {
    const prefix = 'KH';
    const randomNumber = Math.floor(Math.random() * 1000000000); // Tạo số ngẫu nhiên từ 0 đến 999999999
    const randomPart = randomNumber.toString().padStart(9, '0'); // Tạo phần số ngẫu nhiên
    return prefix + randomPart; // Kết hợp phần số ngẫu nhiên với tiền tố 'KH'
};

// Hàm kiểm tra xem mã khách hàng đã tồn tại chưa
const isMaKHExists = async (newMaKH) => {
    // Thực hiện truy vấn để kiểm tra xem mã khách hàng có tồn tại trong cơ sở dữ liệu không
    const [rows, fields] = await promisePool.query("SELECT COUNT(*) AS count FROM client WHERE maKhachHang = ?", [newMaKH]);
    const count = rows[0].count;
    return count > 0; // Trả về true nếu mã khách hàng đã tồn tại, ngược lại trả về false
};

// Hàm tạo mã khách hàng mới mà không trùng lặp
const generateUniqueMaKH = async () => {
    let newMaKH = generateMaKH();
    while (await isMaKHExists(newMaKH)) {
        newMaKH = generateMaKH(); // Nếu mã trùng lặp, tạo mã mới
    }
    return newMaKH;
};

// Sử dụng hàm generateUniqueMaKH để tạo mã khách hàng mới mà không trùng lặp
const createNewClient = async () => {
    const newCustomerCode = await generateUniqueCustomerCode();
    // Tiếp tục quá trình tạo mới khách hàng với mã khách hàng mới không trùng lặp
};

module.exports = {generateUniqueMaKH}