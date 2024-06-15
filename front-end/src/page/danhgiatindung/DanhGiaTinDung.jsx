import {useState, useEffect} from 'react';
import {
    TextField,
    List,
    ListItem,
    ListItemText,
    Paper,
    Container,
    Grid,
    Checkbox,
    Button,
    dividerClasses
} from '@mui/material';
import {doneDanhGia, getListHoso, listDanhGia, updateTrangThai} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";

const DanhGiaTinDung = () => {
    const accessToken = useSelector(state => state.auth?.login?.currentUser?.data?.accessToken);

    const [searchMaHS, setSearchMaHS] = useState('');
    const [searchHoten, setSearchHoten] = useState('');
    const [searchCCCD, setSearchCCCD] = useState('');
    const [pendingProfiles, setPendingProfiles] = useState([]);
    const [reviewedProfiles, setReviewedProfiles] = useState([]);

    useEffect(() => {
        // Fetch initial data for pending and reviewed profiles
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
                await updateTrangThai('Đã đánh giá', profile.idHoSo, accessToken)
                setPendingProfiles(pendingProfiles.filter((p) => p.maHoSo !== profile.maHoSo));
                setReviewedProfiles([...reviewedProfiles, profile]);
            }

        } catch (error) {
            console.error('Error reviewing profile:', error);
        }
    };

    return (
        <div className={'h-[calc(100vh-129px)] w-full'}>
            <h1 className="text-2xl font-bold text-center uppercase mb-10">Đánh giá tín dụng</h1>
            <Grid container spacing={2}>
                <Grid item xs={6} className={''}>
                    <Paper className="p-2">
                        <h2 className="text-xl font-semibold text-red-600 uppercase text-center mb-4">Danh sách hồ sơ chờ
                            đánh giá</h2>
                        <div
                            className={'flex items-center gap-4 mb-4 px-4 py-4  rounded-lg bg-red-100'}>
                            <div className="input-container">
                                <label className={'label'}>Mã hồ sơ</label>
                                <input type="text" className={'input'}
                                       value={searchMaHS} onChange={(e) => setSearchMaHS(e.target.value)} autoComplete="off"/>
                            </div>
                            <div className="input-container">
                                <label className={'label'}>Tên khách hàng</label>
                                <input type="text" className={'input'}
                                       value={searchHoten} onChange={(e) => setSearchHoten(e.target.value)} autoComplete="off"/>
                            </div>
                            <div className="input-container">
                                <label className={'label'}>CCCD</label>
                                <input type="text" className={'input '}
                                       value={searchCCCD} onChange={(e) => setSearchCCCD(e.target.value)} autoComplete="off"/>
                            </div>
                        </div>
                        <div className={'grid grid-cols-[10%,15%,25%,20%,15%,auto]'}>
                            {['STT', 'Mã hồ sơ', 'Tên khách hàng', 'CCCD', 'Ngày đăng ký', ''].map((e, i) => (
                                <p key={i} className={'font-bold text-[12px] text-center '}>{e}</p>
                            ))}
                        </div>
                        <div className={'h-[calc(55vh)] overflow-y-scroll'}>
                            {pendingProfiles?.length > 0 ? (
                                pendingProfiles
                                    .filter((profile) => profile?.maHoSo?.toLowerCase().includes(searchMaHS.toLowerCase()))
                                    .filter((profile) => profile?.HoTen?.toLowerCase().includes(searchHoten.toLowerCase()))
                                    .filter((profile) => profile?.CCCD?.toLowerCase().includes(searchCCCD.toLowerCase()))
                                    .map((profile, i) => (
                                        <div
                                            key={i}
                                            className="bg-yellow-50 hover:bg-red-300 mb-2  rounded grid grid-cols-[10%,15%,25%,20%,15%,auto]"
                                        >
                                            <p className={'text-center'}>{i + 1}</p>
                                            <p className={'text-center'}>{profile?.maHoSo}</p>
                                            <p className={'text-center'}>{profile?.HoTen}</p>
                                            <p className={'text-center'}>{profile?.HoTen}</p>
                                            <p className={'text-center'}>{profile?.HoTen}</p>

                                            <div className={'flex items-center justify-center'}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    className={'!p-0 h-8 w-20'}
                                                    onClick={() => handlePendingProfileClick(profile)}
                                                >
                                                    Đánh giá
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="Trống"/>
                                </ListItem>
                            )}
                        </div>


                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="p-4">
                        <h2 className="text-xl font-semibold text-green-600 uppercase text-center">Danh sách đã đánh
                            giá</h2>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default DanhGiaTinDung;
