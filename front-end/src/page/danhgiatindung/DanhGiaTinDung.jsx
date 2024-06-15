import React, { useState, useEffect } from 'react';
import {
    ListItem,
    ListItemText,
    Paper,
    Grid,
    Button,
    Pagination,
} from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { doneDanhGia, getListHoso, listDanhGia, updateTrangThai } from "../../redux/apiRequest.js";
import { useSelector } from "react-redux";
import { formattedDate } from "../../utils/formetBithday.js";

const DanhGiaTinDung = () => {
    const accessToken = useSelector(state => state.auth?.login?.currentUser?.data?.accessToken);

    const [searchMaHS, setSearchMaHS] = useState('');
    const [searchMaHSRv, setSearchMaHSRv] = useState('');
    const [searchHoten, setSearchHoten] = useState('');
    const [searchHotenRv, setSearchHotenRv] = useState('');
    const [startDateRv, setStartDateRv] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDateRv, setEndDateRv] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pendingProfiles, setPendingProfiles] = useState([]);
    const [reviewedProfiles, setReviewedProfiles] = useState([]);

    // Pagination states
    const [pagePending, setPagePending] = useState(1);
    const [rowsPerPagePending, setRowsPerPagePending] = useState(5);
    const [pageReviewed, setPageReviewed] = useState(1);
    const [rowsPerPageReviewed, setRowsPerPageReviewed] = useState(5);

    useEffect(() => {
        fetchPendingProfiles();
        fetchReviewedProfiles();
    }, []);

    const fetchPendingProfiles = async () => {
        try {
            const response = await getListHoso(accessToken);
            if (response && response.data) {
                setPendingProfiles(response.data.filter(profile => profile.trangthaihoso === "Hoàn thiện") || []);
            }
        } catch (error) {
            console.error('Error fetching pending profiles:', error);
            setPendingProfiles([]);
        }
    };

    const fetchReviewedProfiles = async () => {
        try {
            const response = await listDanhGia(accessToken);
            if (response) {
                console.log(response);
                setReviewedProfiles(response.data);
            }
        } catch (error) {
            console.error('Error fetching reviewed profiles:', error);
            setReviewedProfiles([]);
        }
    };

    const handlePendingProfileClick = async (profile) => {
        try {
            const res = await doneDanhGia(profile.maHoSo, accessToken);
            if (res.code === 1000) {
                await updateTrangThai('Đã đánh giá', profile.idHoSo, accessToken);
                setPendingProfiles(pendingProfiles.filter((p) => p.maHoSo !== profile.maHoSo));
                setReviewedProfiles([...reviewedProfiles, profile]);
            }
        } catch (error) {
            console.error('Error reviewing profile:', error);
        }
    };

    const filterProfilesByDate = (profile) => {
        if (startDate && new Date(profile.created_at) < new Date(startDate)) {
            return false;
        }
        return !(endDate && new Date(profile.created_at) > new Date(endDate));
    };

    const filterProfilesByDateRv = (profile) => {
        if (startDateRv && new Date(profile.created_at) < new Date(startDateRv)) {
            return false;
        }
        return !(endDateRv && new Date(profile.created_at) > new Date(endDateRv));
    };

    const clearPendingProfiles = () => {
        setSearchMaHS('');
        setSearchHoten('');
        setStartDate('');
        setEndDate('');
    };

    const clearReviewedProfiles = () => {
        setSearchMaHSRv('');
        setSearchHotenRv('');
        setStartDateRv('');
        setEndDateRv('');
    };

    const handleChangePagePending = (event, value) => {
        setPagePending(value);
    };

    const handleChangePageReviewed = (event, value) => {
        setPageReviewed(value);
    };

    return (
        <div className={'h-[calc(100vh-112px)] w-full'}>
            <h1 className="text-2xl font-bold text-center uppercase mb-6">Đánh giá tín dụng</h1>
            <Grid container spacing={2}>
                <Grid item xs={6} className={''}>
                    <Paper className="p-2">
                        <h2 className="text-xl font-semibold text-red-600 uppercase text-center mb-4">Danh sách hồ sơ
                            chờ đánh giá</h2>
                        <div className={'flex items-center gap-2 mb-4 px-2 py-4 rounded-lg bg-yellow-100 relative'}>
                            <div className={'absolute top-0 right-0'}>
                                <Button variant="contained" color="secondary" size={'small'}
                                        onClick={clearPendingProfiles} className={''}>
                                    Clear
                                </Button>
                            </div>
                            <div className="input-container">
                                <label className={'label'}>Mã hồ sơ</label>
                                <input type="text" className={'input'} value={searchMaHS}
                                       onChange={(e) => setSearchMaHS(e.target.value)} autoComplete="off"/>
                            </div>
                            <div className="input-container">
                                <label className={'label'}>Tên khách hàng</label>
                                <input type="text" className={'input'} value={searchHoten}
                                       onChange={(e) => setSearchHoten(e.target.value)} autoComplete="off"/>
                            </div>
                            <div className={'flex flex-col'}>
                                <label className={'label'}>Ngày đăng ký</label>
                                <div className={'flex items-center'}>
                                    <input
                                        type="date"
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            fontSize: '14px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                        value={startDate}
                                        onChange={(e) => {
                                            setStartDate(e.target.value);
                                            if (new Date(e.target.value) > new Date(endDate)) {
                                                setEndDate(e.target.value);
                                            }
                                        }}
                                    />
                                    <div><ArrowRightAltIcon/></div>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            fontSize: '14px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => {
                                            if (new Date(e.target.value) >= new Date(startDate)) {
                                                setEndDate(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={'grid grid-cols-[10%,20%,25%,20%,auto]'}>
                            {['STT', 'Mã hồ sơ', 'Tên khách hàng', 'Ngày đăng ký', 'Đánh giá'].map((e, i) => (
                                <p key={i} className={'font-bold text-center '}>{e}</p>
                            ))}
                        </div>
                        <div className={'relative h-[calc(65vh-100px)]'}>
                            {pendingProfiles?.length > 0 ? (
                                pendingProfiles
                                    .filter((profile) => profile?.maHoSo?.toLowerCase().includes(searchMaHS.toLowerCase()))
                                    .filter((profile) => profile?.HoTen?.toLowerCase().includes(searchHoten.toLowerCase()))
                                    .filter(filterProfilesByDate)
                                    .slice((pagePending - 1) * rowsPerPagePending, pagePending * rowsPerPagePending)
                                    .map((profile, i) => (
                                        <div
                                            key={i}
                                            className="bg-yellow-50 hover:bg-red-300 mb-2 rounded grid grid-cols-[10%,20%,25%,20%,auto] items-center"
                                        >
                                            <p className={'text-center'}>{(pagePending - 1) * rowsPerPagePending + i + 1}</p>
                                            <p className={'text-center'}>{profile?.maHoSo}</p>
                                            <p className={'text-center'}>{profile?.HoTen}</p>
                                            <p className={'text-center'}>{formattedDate(profile?.created_at)}</p>

                                            <div className={'flex items-center justify-center p-2'}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    className={'!p-0 h-8 w-20'}
                                                    onClick={() => handlePendingProfileClick(profile)}
                                                >
                                                    <ElectricBoltIcon className={'text-yellow-400'}/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="Trống"/>
                                </ListItem>
                            )}
                            <div className={'flex  pt-4 items-center justify-end absolute bottom-2 right-0'}>
                                <Pagination
                                    count={Math.ceil(pendingProfiles.length / rowsPerPagePending)}
                                    page={pagePending}
                                    onChange={handleChangePagePending}
                                    variant="outlined"
                                    color="error"
                                    className={'mr-10'}
                                />
                            </div>
                        </div>


                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="p-2">
                        <h2 className="text-xl font-semibold text-green-600 uppercase text-center mb-4">Danh sách đã
                            đánh giá</h2>
                        <div className={'flex items-center gap-2 mb-4 px-2 py-4 rounded-lg bg-green-200 relative'}>
                            <div className={'absolute top-0 right-0'}>
                            <Button variant="contained" color="secondary" size={'small'}
                                        onClick={clearReviewedProfiles} className={''}>
                                    Clear
                                </Button>
                            </div>
                            <div className="input-container">
                                <label className={'label'}>Mã hồ sơ</label>
                                <input type="text" className={'input'} value={searchMaHSRv}
                                       onChange={(e) => setSearchMaHSRv(e.target.value)} autoComplete="off"/>
                            </div>
                            <div className="input-container">
                                <label className={'label'}>Tên khách hàng</label>
                                <input type="text" className={'input'} value={searchHotenRv}
                                       onChange={(e) => setSearchHotenRv(e.target.value)} autoComplete="off"/>
                            </div>
                            <div className={'flex flex-col'}>
                                <label className={'label'}>Ngày đăng ký</label>
                                <div className={'flex items-center'}>
                                    <input
                                        type="date"
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            fontSize: '14px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                        value={startDateRv}
                                        onChange={(e) => {
                                            setStartDateRv(e.target.value);
                                            if (new Date(e.target.value) > new Date(endDateRv)) {
                                                setEndDateRv(e.target.value);
                                            }
                                        }}
                                    />
                                    <div><ArrowRightAltIcon/></div>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            fontSize: '14px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                        type="date"
                                        value={endDateRv}
                                        onChange={(e) => {
                                            if (new Date(e.target.value) >= new Date(startDateRv)) {
                                                setEndDateRv(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={'grid grid-cols-[10%,20%,25%,20%,auto]'}>
                            {['STT', 'Mã hồ sơ', 'Tên khách hàng', 'Ngày đăng ký', 'Đánh giá'].map((e, i) => (
                                <p key={i} className={'font-bold text-center '}>{e}</p>
                            ))}
                        </div>
                        <div className={'relative h-[calc(65vh-100px)]'}>
                            {reviewedProfiles?.length > 0 ? (
                                reviewedProfiles
                                    .filter((profile) => profile?.maHoSo?.toLowerCase().includes(searchMaHSRv.toLowerCase()))
                                    .filter((profile) => profile?.HoTen?.toLowerCase().includes(searchHotenRv.toLowerCase()))
                                    .filter(filterProfilesByDateRv)
                                    .slice((pageReviewed - 1) * rowsPerPageReviewed, pageReviewed * rowsPerPageReviewed)
                                    .map((profile, i) => (
                                        <div
                                            key={i}
                                            className="bg-green-100 hover:bg-green-300 mb-2 rounded grid grid-cols-[10%,20%,25%,20%,auto] items-center"
                                        >
                                            <p className={'text-center'}>{(pageReviewed - 1) * rowsPerPageReviewed + i + 1}</p>
                                            <p className={'text-center'}>{profile?.maHoSo}</p>
                                            <p className={'text-center'}>{profile?.HoTen}</p>
                                            <p className={'text-center'}>{formattedDate(profile?.created_at)}</p>

                                            <div className={'flex items-center justify-center p-2'}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    className={'!p-0 h-8 w-20'}
                                                    onClick={() => handlePendingProfileClick(profile)}
                                                >
                                                    <DoubleArrowIcon className={'text-white'}/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="Trống"/>
                                </ListItem>
                            )}
                            <div className={'flex  pt-4 items-center justify-end absolute bottom-3 right-0'}>
                                <Pagination
                                    count={Math.ceil(reviewedProfiles.length / rowsPerPageReviewed)}
                                    page={pageReviewed}
                                    onChange={handleChangePageReviewed}
                                    variant="outlined"
                                    color="success"
                                    className={'mr-10'}
                                />
                            </div>

                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default DanhGiaTinDung;
