import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {createUser, getUser, getUserInfo, updateUserInfoToManeger} from "../redux/apiRequest.js";
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    FormControl, FormControlLabel, FormLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput, Radio, RadioGroup,
    Select,
    TextField
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {notify} from "../utils/notify.js";
import moment from "moment";

function DetailUserUnfo() {
    const dispatch = useDispatch();
    const idUserInfoManager = useSelector(state => state.auth?.login?.currentUser?.data?.user?.idUser);
    const [userInfo, setUserInfo] = useState({});
    const {id} = useParams();
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const names = [
        'Quản trị viên', 'Nhân viên', 'Giám đốc'
    ];
    const [userData, setUserData] = useState({
        HoTen: '',
        email: '',
        DiaChi: '',
        GioiTinh: '',
        NgaySinh: '',
        roleName: '',
        username: '',
        password: '',
        status: '', // Thêm trường status vào state
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const formattedNgaySinh = userInfo?.NgaySinh ? moment(userInfo.NgaySinh).format('YYYY-MM-DD') : '';

    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent form submission
        try {
            await updateUserInfoToManeger(userData, accessToken);
            notify('success', 'Cập nhật thông tin thành công');
            await fetchData();
            if (idUserInfoManager === id) {
                await getUserInfo(idUserInfoManager, accessToken, dispatch);
            }
        } catch (e) {
            notify('error', e.message);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const fetchData = async () => {
        try {
            const res = await getUser(id, accessToken);
            setUserInfo(res);
        } catch (e) {
            notify('error', 'Failed to fetch user data');
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        setUserData((prevState) => ({
            ...prevState,
            idUser: id,
            HoTen: userInfo.HoTen || '',
            email: userInfo.email || '',
            DiaChi: userInfo.DiaChi || '',
            GioiTinh: userInfo.GioiTinh || '',
            NgaySinh: formattedNgaySinh || '',
            roleName: userInfo.roleName || '',
            username: userInfo.username || '',
            password: '', // Keep password empty for security reasons
            status: userInfo.status || '', // Set status from userInfo
        }));
    }, [userInfo, formattedNgaySinh]);

    return (
        <div>
            <Link to={'/home/quanlynhanvien'}
                  className={'flex items-center justify-start text-gray-500 hover:text-black mb-6'}>
                <ArrowBackIcon className={'mr-2'}/> <p>Trở về trang quản lý</p>
            </Link>
            <div className={'text-[18px] mb-4'}>
                Trang thông tin chi tiết của <strong>{userInfo?.HoTen}</strong>
            </div>
            <form onSubmit={handleUpdate}>
                <div className={'mb-4'}>
                    <h2 className={'bg-white rounded-t-md pt-2 px-2'}>Thông tin cá nhân</h2>
                    <div className={'px-8 py-6 bg-white rounded-b-md'}>
                        <div className={'flex gap-x-4 items-center mb-4'}>
                            <TextField
                                label="Họ và tên"
                                name="HoTen"
                                onChange={handleChange}
                                value={userData.HoTen}
                                autoComplete="off"
                                sx={{width: '100%'}}
                            />
                            <TextField
                                label="Ngày sinh"
                                name="NgaySinh"
                                type="date"
                                onChange={handleChange}
                                value={userData.NgaySinh}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                autoComplete="off"
                                sx={{width: '100%'}}
                            />
                        </div>
                        <FormControl fullWidth>
                            <FormLabel>Giới tính</FormLabel>
                            <RadioGroup
                                row
                                name="GioiTinh"
                                value={userData.GioiTinh}
                                onChange={handleChange}
                                autoComplete="off"
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Nam" />
                                <FormControlLabel value="0" control={<Radio />} label="Nữ" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className={'mb-4'}>
                    <h2 className={'bg-white rounded-t-md pt-2 px-2'}>Thông tin tài khoản</h2>
                    <div className={'px-8 py-6 bg-white rounded-b-md'}>
                        <div className={'flex gap-x-4 items-center mb-4'}>
                            <TextField
                                label="Tên đăng nhập"
                                value={userData.username}
                                sx={{width: '100%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                                autoComplete="off"
                            />
                            <FormControl sx={{width: '100%'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    onChange={handleChange}
                                    value={userData.password}
                                    autoComplete="new-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <InputLabel>Trạng thái</InputLabel>
                            <Select
                                value={userData.status}
                                label="Trạng thái"
                                onChange={handleChange}
                                name="status"
                                autoComplete="off"
                            >
                                <MenuItem value={'active'}>
                                    <div className={'w-12 h-6 bg-green-200 flex items-center justify-center rounded-xl '}>
                                        <p className={'text-[10px] font-bold'}>Active</p>
                                    </div>
                                </MenuItem>
                                <MenuItem value={'close'}>
                                    <div className={'w-12 h-6 bg-red-300 flex items-center justify-center rounded-xl '}>
                                        <p className={'text-[10px] font-bold'}>Close</p>
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className={'mb-4'}>
                    <h2 className={'bg-white rounded-t-md pt-2 px-2'}>Thông tin liên hệ</h2>
                    <div className={'px-8 py-6 bg-white rounded-b-md'}>
                        <div className={'flex gap-x-4 items-center mb-4'}>
                            <TextField
                                label="Địa chỉ"
                                name="DiaChi"
                                onChange={handleChange}
                                value={userData.DiaChi}
                                autoComplete="off"
                                sx={{width: '100%'}}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                value={userData.email}
                                autoComplete="off"
                                sx={{width: '100%'}}
                            />
                        </div>
                    </div>
                </div>
                <div className={'mb-4'}>
                    <h2 className={'bg-white rounded-t-md pt-2 px-2'}>Quyền hạn</h2>
                    <div className={'px-8 py-6 bg-white rounded-b-md'}>
                        <div className={'grid grid-cols-[30%,auto] gap-4'}>
                            <FormControl fullWidth>
                                <InputLabel>Chức vụ</InputLabel>
                                <Select
                                    label="Chức vụ"
                                    name="roleName"
                                    onChange={handleChange}
                                    value={userData.roleName}
                                    autoComplete="off"
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <div className={'bg-red-300'}>Permisstion is going to update</div>
                        </div>
                    </div>
                </div>
                <div className={'flex justify-center mt-8'}>
                    <Button variant={'contained'} type="submit">Cập nhật</Button>
                </div>
            </form>
        </div>
    );
}

export default DetailUserUnfo;
