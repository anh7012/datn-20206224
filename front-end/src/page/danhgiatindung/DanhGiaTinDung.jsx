import {useState, useEffect} from 'react';
import {TextField, List, ListItem, ListItemText, Paper, Container, Grid, Checkbox, Button} from '@mui/material';
import {doneDanhGia, getListHoso, listDanhGia, updateTrangThai} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";

const DanhGiaTinDung = () => {
    const accessToken = useSelector(state => state.auth?.login?.currentUser?.data?.accessToken);

    const [searchPending, setSearchPending] = useState('');
    const [searchReviewed, setSearchReviewed] = useState('');
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
        <Container className={'h-[calc(100vh-129px)]'}>
            <h1 className="text-2xl font-bold text-center my-4 uppercase mb-10">Đánh giá tín dụng</h1>
            <Grid container spacing={3}>
                <Grid item xs={6} className={''}>
                    <Paper className="p-4">
                        <h2 className="text-xl font-semibold text-red-600 uppercase">Danh sách hồ sơ chờ đánh giá</h2>
                        <TextField
                            fullWidth
                            label="Tìm kiếm theo mã hồ sơ"
                            value={searchPending}
                            onChange={(e) => setSearchPending(e.target.value)}
                            variant="outlined"
                            className="!mt-4 mb-4"
                        />
                        <List className={'h-[calc(55vh)] overflow-y-scroll'}>
                            {pendingProfiles?.length > 0 ? (
                                pendingProfiles
                                    .filter((profile) =>
                                        profile?.maHoSo?.toLowerCase().includes(searchPending.toLowerCase())
                                    )
                                    .map((profile, i) => (
                                        <ListItem
                                            key={i}
                                            className="flex justify-between items-center bg-yellow-50 hover:bg-red-300 mb-2 p-2 rounded"
                                        >

                                            <ListItemText primary={profile?.maHoSo}/>

                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handlePendingProfileClick(profile)}
                                            >
                                                Đánh giá
                                            </Button>
                                        </ListItem>
                                    ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="Trống"/>
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="p-4">
                        <h2 className="text-xl font-semibold text-green-600 uppercase">Danh sách đã đánh giá</h2>
                        <TextField
                            fullWidth
                            label="Tìm kiếm theo mã hồ sơ"
                            value={searchReviewed}
                            onChange={(e) => setSearchReviewed(e.target.value)}
                            variant="outlined"
                            className="mb-4 !mt-4"
                        />
                        <List className={'h-[calc(55vh)] overflow-y-scroll'}>
                            {reviewedProfiles?.length > 0 ? (
                                reviewedProfiles
                                    .filter((profile) =>
                                        profile?.maHoSo?.toLowerCase().includes(searchReviewed.toLowerCase())
                                    )
                                    .map((profile, i) => (
                                        <ListItem
                                            key={i}
                                            className="flex justify-between items-center bg-green-50 hover:bg-green-100 mb-2 p-2 rounded"
                                        >
                                            <ListItemText primary={profile?.maHoSo}/>
                                            <Checkbox checked={true} color="primary"/>
                                        </ListItem>
                                    ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="Trống"/>
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DanhGiaTinDung;
