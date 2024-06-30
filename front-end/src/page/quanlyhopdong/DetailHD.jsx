import React, {useEffect, useState} from "react";
import {getHDByID} from "../../redux/apiRequest.js";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { Container, Paper, Typography, Grid } from '@mui/material';
import {formatStringRevert} from "../../utils/formatString.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
const ChiTietHopDong = ({ data }) => {
    return (
        <Container>
            <Paper elevation={3} className="p-8 mt-2">
                <Typography variant="h5" className={'uppercase !mb-8 '}>Chi tiết hợp đồng</Typography>
                <Grid container spacing={2} className={'!mb-4 border-b-[1px] !pb-4 border-black'}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>1. ID Khách Hàng:</strong> {data.idClient}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>2. ID Hồ Sơ:</strong> {data.idHoSo}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>3. ID Hợp Đồng:</strong> {data.idHopDong}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>4. Số Hợp Đồng:</strong> {data.so_hopdong}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>5. Mục Đích:</strong> {formatStringRevert(data.MucDich)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>6. Phương Thức Cho Vay:</strong> {data.PhuongThucChoVay}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>7. Phương Thức Giải Ngân:</strong> {data.PhuongThucGiaiNgan}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>8. Số Tiền Vay:</strong> {parseInt(data.SoTienVay).toLocaleString('vi-VN')} VNĐ</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>9. Tần Suất Thanh Toán:</strong> {data.TanSuatThanhToan}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>10. Thời Hạn:</strong> {data.ThoiHan} tháng</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>11. Chi Nhánh/Phòng Giao Dịch:</strong> {data.chinhanh_phonggiaodich}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>12. Chức Vụ:</strong> {data.chuc_vu}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>13. Địa Chỉ Trụ Sở:</strong> {data.dia_chi_tru_so}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>14. Địa Điểm Ký:</strong> {data.dia_diem_ky}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>15. Điện Thoại:</strong> {data.dien_thoai}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>16. Mã Số Doanh Nghiệp:</strong> {data.ma_so_doanhnghiep}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>17. Ngày Cấp Mã Số:</strong> {new Date(data.ngay_cap_ma_so).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>18. Ngày Ký:</strong> {new Date(data.ngay_ky).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>19. Người Đại Diện:</strong> {data.nguoi_dai_dien}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>20. Số Hợp Đồng:</strong> {data.so_hopdong}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>21. Trạng Thái:</strong> {data.status}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1"><strong>22. Tên Ngân Hàng:</strong> {data.ten_nganhang}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
function DetailHd() {
    const [dataHD, setDataHD] = useState()
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);

    const {idHD} = useParams()
    const fetch = async () => {
        try {
            const res = await getHDByID(idHD,accessToken)
            setDataHD(...res.data)
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetch()
    }, []);
    console.log(dataHD)
    return (
        <div>
            <div className='flex items-center justify-start mb-2'>
                <Link to={'/home/quanlyhopdong'} className='text-gray-500 hover:text-black'>
                    <ArrowBackIcon className='mr-2'/>
                </Link>
            </div>
            {
            dataHD? <ChiTietHopDong data={dataHD}/>:
                <div className={'text-red-500 uppercase font-bold text-xl flex items-center justify-center min-h-[100px]'}>Không có thông tin</div>

        }</div>
    );
}

export default DetailHd;