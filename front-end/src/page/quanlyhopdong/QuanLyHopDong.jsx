import {useEffect, useState} from 'react';
import {getListHD} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import FileUpload from "../../components/UpLoadFile.jsx";
import {Button, Divider, Pagination} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt.js";
import {Link, Outlet, useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add.js";
import {formattedDate} from "../../utils/formetBithday.js";

function QuanLyHopDong() {
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.permissions)||[];
    const [listHD, setListHD] = useState([])
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);

    const fecth = async ()=>{
      const  res = await getListHD(accessToken)
        setListHD(res.data)
    }
    useEffect(() => {
        fecth()
    }, []);
    const nav = useNavigate();
    const [filterMaHopDong, setFilterMaHopDong] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6);
    const [page, setPage] = useState('');
    useEffect(() => {
        setPage(window.location.pathname);
    }, [window.location.pathname]);
    const handleResetFilters = () => {
        setFilterMaHopDong('');
    };
    const handleMaHopDongChange = (event) => {
        setFilterMaHopDong(event.target.value);
    };
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const filteredHoso = listHD && listHD.length ? listHD?.filter(item => {
        return (
            (filterMaHopDong ? item?.so_hopdong.includes(filterMaHopDong) : true))
    }) : [];

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredHoso.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div>
            <div className={` ${page !== '/home/quanlyhopdong' ? '  hidden ' : ' '}   `}>
                <p className="pb-2 font-bold">Danh sách hợp đồng</p>
                <form autoComplete="off">
                    <div className="grid grid-cols-[70%,30%] gap-2 px-4 py-4 bg-white mb-2 rounded-sm">
                        <div className={` ${roleUser.includes('listHopDong')?' ':' hidden'}`}>
                            <div className="grid grid-cols-[50%,auto] gap-x-8">
                                <div className="grid  gap-x-4">
                                    <div className="input-container">
                                        <label className={'label'}>Nhập mã hợp đồng</label>
                                        <input type="text" className={'input'} placeholder="Mã hợp đồng"
                                               value={filterMaHopDong} onChange={handleMaHopDongChange} autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="flex items-end justify-start">
                                    <Button variant="outlined" onClick={handleResetFilters}>
                                        <RestartAltIcon/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Link to={'/home/quanlyhopdong/themhopdongmoi'} className={'flex justify-end items-end'}><Button
                            startIcon={<AddIcon/>} variant={'contained'}>Hợp đồng mới</Button></Link>
                    </div>
                </form>
                <div className={` ${roleUser.includes('listHopDong')?' ':' hidden'}`}>
                    <div className="grid grid-cols-[5%,10%,10%,15%,15%,15%,15%,auto] gap-2 py-2">
                        <div className="font-bold  flex justify-center">STT</div>
                        <div className="font-bold ">Mã hợp đồng</div>
                        <div className="font-bold ">Ngày ký</div>
                        <div className="font-bold ">Người đại diện</div>
                        <div className="font-bold ">Trạng thái</div>
                        <div className="font-bold ">Số tiền vay</div>
                        <div className="font-bold ">Kỳ hạn</div>
                        <div className="font-bold "></div>
                    </div>
                    <div className="bg-white rounded-sm min-h-[calc(100vh-285px)] relative">
                        {currentItems?.map((item, i) => (
                            <div key={i}>
                                <div
                                    className="grid grid-cols-[5%,10%,10%,15%,15%,15%,15%,auto] gap-2 py-3 hover:cursor-pointer hover:bg-gray-100">
                                    <div className="flex justify-center ">{indexOfFirstItem + i + 1}</div>
                                    <div className={''}>{item?.so_hopdong}</div>
                                    <div className={''}>{formattedDate(item?.ngay_ky)}</div>
                                    <div className={''}>{item?.nguoi_dai_dien}</div>
                                    <div className={'uppercase'}>{item?.status}</div>
                                    <div className={''}>{parseInt(item?.SoTienVay).toLocaleString('vi-VN')} VNĐ</div>
                                    <div className={''}>{item?.ThoiHan} Tháng</div>
                                    <div className={'flex items-center justify-center gap-2'}>
                                        <Button variant={'contained'} color={'success'} size={'small'} className={` ${roleUser.includes('inforHopDong')?' ':' hidden'}`} onClick={() => {
                                            nav(`/home/quanlyhopdong/${item?.idHopDong}`)
                                        }}>Chi tiết</Button>
                                    </div>
                                </div>
                                <Divider/>
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
            </div>
            <Outlet/>

        </div>
    );
}

export default QuanLyHopDong;