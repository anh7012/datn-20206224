import {Container, Paper, Typography, Grid, TextField, Button} from '@mui/material';
import React, {useState} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Link} from "react-router-dom";

function TaoHopDongMoi() {
    const [formData, setFormData] = useState({
        ngay_ky: '',
        dia_diem_ky: '',
        ten_nganhang: '',
        chinhanh_phonggiaodich: '',
        ma_so_doanhnghiep: '',
        ngay_cap_ma_so: '',
        dia_chi_tru_so: '',
        dien_thoai: '',
        nguoi_dai_dien: '',
        chuc_vu: '',
        TanSuatThanhToan: '',
        PhuongThucGiaiNgan: '',
        status: '',
        DieuKhoanDacBiet: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission, e.g., send the data to the server
        console.log(formData);
    };

    return (
        <div>
            <div className='flex items-center justify-start mb-2'>
                <Link to={'/home/quanlyhopdong'} className='text-gray-500 hover:text-black'>
                    <ArrowBackIcon className='mr-2'/>
                </Link>
            </div>
            <Container>
                <Paper elevation={3} className="p-8 mt-2">
                    <Typography variant="h5" className="uppercase !mb-8">Tạo hợp đồng</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        1. Ngày Ký:
                                    </label>
                                    <input
                                        type="date"
                                        name="ngay_ky"
                                        value={formData.ngay_ky}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        2. Địa Điểm Ký:
                                    </label>
                                    <input
                                        name="dia_diem_ky"
                                        value={formData.dia_diem_ky}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        3. Tên Ngân Hàng:
                                    </label>
                                    <input
                                        name="ten_nganhang"
                                        value={formData.ten_nganhang}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        4. Chi Nhánh/Phòng Giao Dịch:
                                    </label>
                                    <input
                                        name="chinhanh_phonggiaodich"
                                        value={formData.chinhanh_phonggiaodich}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        5. Mã Số Doanh Nghiệp:
                                    </label>
                                    <input
                                        name="ma_so_doanhnghiep"
                                        value={formData.ma_so_doanhnghiep}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        6. Ngày Cấp Mã Số:
                                    </label>
                                    <input
                                        type="date"
                                        name="ngay_cap_ma_so"
                                        value={formData.ngay_cap_ma_so}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        7. Địa Chỉ Trụ Sở:
                                    </label>
                                    <input
                                        name="dia_chi_tru_so"
                                        value={formData.dia_chi_tru_so}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        8. Điện Thoại:
                                    </label>
                                    <input
                                        type={"number"}
                                        name="dien_thoai"
                                        value={formData.dien_thoai}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        9. Người Đại Diện:
                                    </label>
                                    <input
                                        name="nguoi_dai_dien"
                                        value={formData.nguoi_dai_dien}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        10. Chức Vụ:
                                    </label>
                                    <input
                                        name="chuc_vu"
                                        value={formData.chuc_vu}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        11. Tần Suất Thanh Toán:
                                    </label>
                                    <input
                                        name="TanSuatThanhToan"
                                        value={formData.TanSuatThanhToan}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        12. Phương Thức Giải Ngân:
                                    </label>
                                    <input
                                        name="PhuongThucGiaiNgan"
                                        value={formData.PhuongThucGiaiNgan}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        13. Trạng Thái:
                                    </label>
                                    <input
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        14. Điều Khoản Đặc Biệt:
                                    </label>
                                    <textarea
                                        name="DieuKhoanDacBiet"
                                        value={formData.DieuKhoanDacBiet}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        rows="4"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} className={'flex items-center justify-center'}>
                                <Button variant="contained" color="primary" type="submit">
                                    Tạo Hợp Đồng
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default TaoHopDongMoi;
