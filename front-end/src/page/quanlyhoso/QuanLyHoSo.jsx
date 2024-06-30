import { getListHoso, updateTrangThai } from "../../redux/apiRequest.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Select, MenuItem, Pagination, Divider } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { formattedNgaySinh } from "../../utils/formetBithday.js";

function QuanLyHoSo() {
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.permissions)||[];

    const nav = useNavigate();
    const [listHoso, setListHoso] = useState([]);
    const [filterMaHoSo, setFilterMaHoSo] = useState('');
    const [filterHoTen, setFilterHoTen] = useState('');
    const [filterKyHan, setFilterKyHan] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6);
    const [page, setPage] = useState(6);
    const [isSave, setIsSave] = useState([]);

    useEffect(() => {
        setPage(window.location.pathname);
    }, [window.location.pathname]);

    useEffect(() => {
        setIsSave(listHoso.map((e) => ({ idHoSo: e.idHoSo, save: false, originalStatus: e.trangthaihoso })));
    }, [listHoso.length]);

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

    const handleChangeStatus = (hoso, status) => {
        setListHoso(prevList =>
            prevList.map(item => {
                    if(item.idHoSo === hoso.idHoSo ){
                       return  {...item, trangthaihoso: status}
                    } else return  item
                }
            )
        );
        setIsSave(prevIsSave =>
            prevIsSave.map(item =>
                item.idHoSo === hoso.idHoSo ? { ...item, save: true, originalStatus: item.originalStatus } : item
            )
        );
    };

    const handleSaveStatus = async (hoso) => {
        try {
            await updateTrangThai(hoso.trangthaihoso, hoso.idHoSo, accessToken);
            setIsSave(prevIsSave =>
                prevIsSave.map(item =>
                    item.idHoSo === hoso.idHoSo ? { ...item, save: false, originalStatus: hoso.trangthaihoso } : item
                )
            );
            await fetch();
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const handleCancelStatus = (hoso) => {
        const originalStatus = isSave.find(item => item.idHoSo === hoso.idHoSo)?.originalStatus
        console.log( 'prev status', originalStatus)
        setListHoso(prevList =>
            prevList.map(item =>
                item.idHoSo === hoso.idHoSo ? { ...item, trangthaihoso: originalStatus } : item
            )
        );
        setIsSave(prevIsSave =>
            prevIsSave.map(item =>
                item.idHoSo === hoso.idHoSo ? { ...item, save: false } : item
            )
        );
    };

    return (
        <div>
            <div className={` ${page !== '/home/quanlyhoso' ? '  hidden ' : ' '}   `}>
                <p className="pb-2 font-bold">Danh sách hồ sơ</p>
                <form autoComplete="off">
                    <div className="grid grid-cols-[70%,30%] gap-2 px-4 py-4 bg-white mb-2 rounded-sm">
                        <div  className={`${roleUser.includes('listHoSo')?' ':' hidden'}`}>
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
                        <Link to={'/home/quanlyhoso/taohosomoi'} className={`flex justify-end items-end ${ roleUser.includes('createHoSo')&&roleUser.includes('createMHBIDVAndEY')&&roleUser.includes('createHopDong')? ' ': ' hidden'} `}><Button
                            startIcon={<AddIcon/>} variant={'contained'}>Thêm hồ sơ mới</Button></Link>
                    </div>
                </form>
                <div className={`grid grid-cols-[5%,10%,15%,10%,10%,8%,10%,12%,auto] gap-2 py-2 ${roleUser.includes('listHoSo')?' ':' hidden'}`}>
                    <div className="font-bold  flex justify-center">STT</div>
                    <div className="font-bold ">Mã hồ sơ</div>
                    <div className="font-bold ">Khách hàng</div>
                    <div className="font-bold ">Tổng tiền vay</div>
                    <div className="font-bold ">Lãi suất vay</div>
                    <div className="font-bold ">Kỳ hạn</div>
                    <div className="font-bold ">Ngày đăng ký</div>
                    <div className="font-bold  flex items-center justify-center">Trạng thái</div>
                    <div className="font-bold "></div>
                </div>
                <div className={`bg-white rounded-sm min-h-[calc(100vh-285px)] relative ${roleUser.includes('listHoSo')?' ':' hidden'}`}>
                    {currentItems?.map((item, i) => (
                        <div key={i}>
                            <div
                                className="grid grid-cols-[5%,10%,15%,10%,10%,8%,10%,12%,auto] gap-2 py-3 hover:cursor-pointer hover:bg-gray-100">
                                <div className="flex justify-center ">{indexOfFirstItem + i + 1}</div>
                                <div className={''}>{item?.maHoSo}</div>
                                <div className={''}>{item?.HoTen}</div>
                                <div className={''}>{item?.TongTienVay.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</div>
                                <div className={''}>{item?.LaiSuatVay}%</div>
                                <div className={''}>{item?.KyHan} tháng</div>
                                <div className={''}>{formattedNgaySinh(item?.created_at)}</div>
                                <div className="flex justify-center ">
                                    <Select className={'min-w-[140px]'}
                                            size={'small'}
                                            value={item?.trangthaihoso}
                                            onChange={(e) => {
                                                handleChangeStatus(item, e.target.value)
                                            }}
                                    >
                                        {
                                            ['Thông qua', 'Từ chối', 'Huỷ bỏ','Cần bổ sung', 'Hoàn thiện', 'Đã đánh giá'].map((e, index) => (
                                                <MenuItem key={index} value={e}>{e}</MenuItem>
                                            ))}
                                    </Select>
                                </div>
                                <div className={'flex items-center justify-center gap-2'}>
                                    {!isSave.find(saveItem => saveItem.idHoSo === item.idHoSo)?.save&&<Button variant={'contained'} color={'success'} size={'small'}  className={`${roleUser.includes('inforHoSo')?' ':' hidden'}`} onClick={() => {
                                        nav(`/home/quanlyhoso/${item?.idHoSo}`)
                                    }}>Chi tiết</Button>}
                                    {isSave.find(saveItem => saveItem.idHoSo === item.idHoSo)?.save && (
                                        <>
                                            <Button variant="contained" size={'small'} color="primary" onClick={() => handleSaveStatus(item)} className={`${roleUser.includes('updateTrangThai')?' ':' hidden'}`}>Lưu</Button>
                                            <Button variant="contained" size={'small'} color="secondary" onClick={() => handleCancelStatus(item)}>Huỷ</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <Divider />
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
