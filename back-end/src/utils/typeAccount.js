const promisePool = require("../config/db/db");

const findDVSDByType = async (maKhachHang) => {
    try {
        const [rows, fields] = await promisePool.query(
            "SELECT typeAccount FROM account LEFT JOIN client ON account.idClient = client.idClient WHERE maKhachHang =?",
            [maKhachHang]
        )
        return rows; // Trả về các dịch vụ mà khách hàng dùng
    } catch (error) {
        console.error("Error finding services by type:", error);
        throw error;
    }
};

const DVSD = async (maKhachHang) => {
    const dichvu = await findDVSDByType(maKhachHang);
    let diem = 0;
    let dichvusudung;
    if (dichvu.includes('Tài khoản thanh toán') && dichvu.includes('Tài khoản tiết kiệm')) {
        dichvusudung = 'Tiền gửi và các dịch vụ khác';
        diem = 100;
    } else if (dichvu.includes('Tài khoản thanh toán')) {
        dichvusudung = 'Chỉ sử dụng dịch vụ thanh toán';
        diem = 50;
    } else if (dichvu.includes('Tài khoản tiết kiệm')) {
        dichvusudung = 'Tiền gửi và các dịch vụ khác';
        diem = 100;
    } else {
        dichvusudung = 'Không sử dụng';
        diem = 0;
    }
    return { dichvusudung, diem };
};


module.exports = {DVSD}