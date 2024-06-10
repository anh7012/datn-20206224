import { getListInforKH} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, TextField, Select, MenuItem, Pagination} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import {formattedNgaySinh} from "../../utils/formetBithday.js";

function QuanLyKhachHang() {
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const nav = useNavigate()
    const [listKhachHang, setlistKhachHang] = useState([]);
    const [filterCCCD, setfilterCCCD] = useState('');
    const [filterHoTen, setFilterHoTen] = useState('');
    const [filterLoaiKH, setfilterLoaiKH] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6);
    const [page,setPage] = useState(6); // Number of items per page
    useEffect(() => {
        setPage(window.location.pathname);
    }, [window.location.pathname]);

    const fetch = async () => {
        try {
            const res = await getListInforKH(accessToken);
                setlistKhachHang(res.data);
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        fetch();
    }, []);

    const handleResetFilters = () => {
        setfilterCCCD('');
        setFilterHoTen('');
        setfilterLoaiKH('');
    };

    const handleMaHoSoChange = (event) => {
        setfilterCCCD(event.target.value);
    };

    const handleHoTenChange = (event) => {
        setFilterHoTen(event.target.value);
    };

    const handleKyHanChange = (event) => {
        setfilterLoaiKH(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredHoso = listKhachHang?.filter(item => {
        return (
            (filterCCCD ? item?.CCCD.toLowerCase().includes(filterCCCD.toLowerCase()) : true) &&
            (filterHoTen ? item?.HoTen.toLowerCase().includes(filterHoTen.toLowerCase()) : true) &&
            (filterLoaiKH ? item?.typeClient === filterLoaiKH : true)
        );
    }) || [];


    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredHoso.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <div
                // className={` ${page !== '/home/quanlyhoso' ? '  hidden ' : ' '}   `}
            >
                <p className="pb-2 font-bold">Danh sách khách hàng</p>
                <form autoComplete="off">
                    <div className="grid grid-cols-[70%,30%] gap-2 px-4 py-4 bg-white mb-2 rounded-sm">
                        <div className="">
                            <div className="grid grid-cols-[80%,auto] gap-x-8">
                                <div className="grid grid-cols-[33%,33%,33%] gap-x-4">
                                    <div className="input-container">
                                        <label className={'label'}>Nhập họ tên</label>
                                        <input type="text" className={'input'} placeholder="Họ tên"
                                               value={filterHoTen} onChange={handleHoTenChange} autoComplete="off"/>
                                    </div>
                                    <div className="input-container">
                                        <label className={'label'}>Nhập CCCD</label>
                                        <input type="text" className={'input'} placeholder="CCCD"
                                               value={filterCCCD} onChange={handleMaHoSoChange} autoComplete="off"/>
                                    </div>
                                    <div className="select-container">
                                        <label htmlFor="Kh" className={'label'}>Loại khách hàng</label>
                                        <select id="Kh" className={'select'} value={filterLoaiKH}
                                                onChange={handleKyHanChange}>
                                            <option value="">Tất cả</option>
                                            {listKhachHang.map((item, index) => (
                                                <option key={index} value={item.typeClient}>{item.typeClient}</option>
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
                <div className="grid grid-cols-[5%,15%,15%,15%,15%,15%,auto] gap-2 py-2">
                    <div className="text-gray-500 flex justify-center">STT</div>
                    <div className="text-gray-500">Mã khách hàng</div>
                    <div className="text-gray-500">Họ tên khách hàng</div>
                    <div className="text-gray-500 flex items-center justify-center">Ngày sinh</div>
                    <div className="text-gray-500 flex items-center justify-center">CMND/CCCD</div>
                    <div className="text-gray-500 flex items-center justify-center">Loại Khách hàng</div>
                    <div className="text-gray-500"></div>
                </div>
                <div className="bg-white rounded-sm min-h-[calc(100vh-285px)] relative">
                    {currentItems?.map((item, i) => (
                        <div key={i}
                             className="grid grid-cols-[5%,15%,15%,15%,15%,15%,auto] gap-2 py-3 hover:cursor-pointer hover:bg-gray-100">
                            <div className="flex justify-center">{indexOfFirstItem + i + 1}</div>
                            <div>{item?.maKhachHang}</div>
                            <div>{item?.HoTen}</div>
                            <div className={'flex items-center justify-center'}>{formattedNgaySinh(item?.NgaySinh)}</div>
                            <div className={'flex items-center justify-center'}>{item?.CCCD}</div>
                            <div className={'flex items-center justify-center'}>{item?.typeClient}</div>
                            <div><Button variant={'outlined'} color={'success'} onClick={() => {
                                nav(`/home/quanlykhachhang/${item?.idClient}`)
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

export default QuanLyKhachHang;
