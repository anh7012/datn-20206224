import {getListHoso, updateHoSo} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, TextField, Select, MenuItem, Pagination} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";

function QuanLyHoSo() {
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const nav = useNavigate()
    const [listHoso, setListHoso] = useState([]);
    const [filterMaHoSo, setFilterMaHoSo] = useState('');
    const [filterHoTen, setFilterHoTen] = useState('');
    const [filterKyHan, setFilterKyHan] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6);
    const [page,setPage] = useState(6); // Number of items per page
    useEffect(() => {
        setPage(window.location.pathname);
    }, [window.location.pathname]);

    const fetch = async () => {
        try {
            const res = await getListHoso(accessToken);
            if (Array.isArray(res.data)) {
                setListHoso(res.data);
            } else {
                console.error("Response data is not an array", res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        fetch();
    }, []);

    const handleResetFilters = () => {
        setFilterMaHoSo('');
        setFilterHoTen('');
        setFilterKyHan('');
    };

    const handleMaHoSoChange = (event) => {
        setFilterMaHoSo(event.target.value);
    };

    const handleHoTenChange = (event) => {
        setFilterHoTen(event.target.value);
    };

    const handleKyHanChange = (event) => {
        setFilterKyHan(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredHoso = listHoso?.filter(item => {
        return (
            (filterMaHoSo ? item?.maHoSo.includes(filterMaHoSo) : true) &&
            (filterHoTen ? item?.HoTen.toLowerCase().includes(filterHoTen.toLowerCase()) : true) &&
            (filterKyHan ? item?.KyHan === parseInt(filterKyHan) : true)
        );
    }) || [];


    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredHoso.slice(indexOfFirstItem, indexOfLastItem);
    const handleChangeStatus = async (hoso,status) => {
        try {
            console.log(hoso,status)
            await updateHoSo(hoso.trangthaihoso,hoso.idHoSo,accessToken);
            await fetch();
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    return (
        <div>
            <div className={` ${page !== '/home/quanlyhoso' ? '  hidden ' : ' '}   `}>
                <p className="pb-2 font-bold">Danh sách hồ sơ</p>
                <form autoComplete="off">
                    <div className="grid grid-cols-[70%,30%] gap-2 px-4 py-4 bg-white mb-2 rounded-sm">
                        <div className="">
                            <div className="grid grid-cols-[80%,auto] gap-x-8">
                                <div className="grid grid-cols-[33%,33%,33%] gap-x-4">
                                    <div className="input-container">
                                        <label className={'label'}>Nhập mã hồ sơ</label>
                                        <input type="text" className={'input'} placeholder="Mã hồ sơ"
                                               value={filterMaHoSo} onChange={handleMaHoSoChange} autoComplete="off"/>
                                    </div>
                                    <div className="input-container">
                                        <label className={'label'}>Nhập họ tên</label>
                                        <input type="text" className={'input'} placeholder="Họ tên"
                                               value={filterHoTen} onChange={handleHoTenChange} autoComplete="off"/>
                                    </div>
                                    <div className="select-container">
                                        <label htmlFor="Ky-han" className={'label'}>Kỳ hạn</label>
                                        <select id="Ky-han" className={'select'} value={filterKyHan}
                                                onChange={handleKyHanChange}>
                                            <option value="">Tất cả</option>
                                            {listHoso.map((item, index) => (
                                                <option key={index} value={item.KyHan}>{item.KyHan} tháng</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <Button variant="outlined" onClick={handleResetFilters}>
                                        <RestartAltIcon/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Link to={'/home/quanlyhoso/taohosomoi'} className={'flex justify-end items-end'}><Button
                            startIcon={<AddIcon/>} variant={'contained'}>Thêm hồ sơ mới</Button></Link>
                    </div>
                </form>
                <div className="grid grid-cols-[5%,10%,15%,15%,10%,10%,15%,auto] gap-2 py-2">
                    <div className="text-gray-500 flex justify-center">STT</div>
                    <div className="text-gray-500">Mã hồ sơ</div>
                    <div className="text-gray-500">Họ tên khách hàng</div>
                    <div className="text-gray-500">Tổng tiền vay</div>
                    <div className="text-gray-500">Lãi suất vay</div>
                    <div className="text-gray-500">Kỳ hạn</div>
                    <div className="text-gray-500 flex items-center justify-center">Trạng thái</div>
                    <div className="text-gray-500"></div>
                </div>
                <div className="bg-white rounded-sm min-h-[calc(100vh-285px)] relative">
                    {currentItems?.map((item, i) => (
                        <div key={i}
                             className="grid grid-cols-[5%,10%,15%,15%,10%,10%,15%,auto] gap-2 py-3 hover:cursor-pointer hover:bg-gray-100">
                            <div className="flex justify-center">{indexOfFirstItem + i + 1}</div>
                            <div>{item?.maHoSo}</div>
                            <div>{item?.HoTen}</div>
                            <div>{item?.TongTienVay.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</div>
                            <div>{item?.LaiSuatVay}%</div>
                            <div>{item?.KyHan} tháng</div>
                            <div className="flex justify-center">
                                {/**/}
                                <Select
                                    value={item?.trangthaihoso}
                                    onChange={(e) => {
                                        handleChangeStatus(item, e.target.value)
                                    }}
                                >
                                    {['Cần bổ sung', 'Hoàn thiện', 'Đã đánh giá', 'Thông qua' , 'Từ chối' , 'Huỷ bỏ'].map((e, index) => (
                                            <MenuItem key={index} value={e}>{e}</MenuItem>
                                        ))}
                                </Select>
                            </div>
                            <div><Button variant={'outlined'} color={'success'} onClick={() => {
                                nav(`/home/quanlyhoso/${item?.idHoSo}`)
                            }}>Xem chi tiết</Button></div>
                        </div>
                    ))}
                    <div className="flex  pt-4 items-center justify-end absolute bottom-4 right-0">
                        <Pagination
                            count={Math.ceil(filteredHoso.length / rowsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            color="primary"
                        />
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}

export default QuanLyHoSo;
