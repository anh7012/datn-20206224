import React from 'react';
import {Button, FormControl, InputLabel, Modal, NativeSelect, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, updateUser} from "../redux/apiRequest.js";
import {notify} from "../utils/notify.js";
import eventEmitter from "../utils/eventEmitter.js";
import moment from 'moment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalInfoUser() {
    const userInfo = useSelector(state => state.auth?.login?.currentUser?.data?.user);
    const accessToken = useSelector(state => state.auth?.login?.currentUser?.data?.accessToken);
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [userData, setUserData] = React.useState({
        HoTen: userInfo?.HoTen || '',
        email: userInfo?.email || '',
        DiaChi: userInfo?.DiaChi || '',
        GioiTinh: userInfo?.GioiTinh || '',
        NgaySinh: ''
    });
    const formattedNgaySinh = userInfo?.NgaySinh ? moment(userInfo.NgaySinh).format('YYYY-MM-DD') : '';
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleUpdate = async () => {
        console.log('Updating with:', userData);
        try {
            await updateUser(userData, userInfo.idUser, accessToken)
            await getUserInfo(userInfo.idUser, accessToken, dispatch)
            notify('success', 'Cập nhật dữ liệu thành công!')
        } catch (e) {
            notify('error', e)
        }
    };

    const handleCloseModal = () => {
        handleClose();
    };
    return (
        <div>
            <div onClick={handleOpen}>Thông tin tài khoản</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={'!border-0'}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thông tin cá nhân
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div className={'flex flex-col gap-4 p-4'}
                             style={{width: '100%', maxWidth: 600, margin: 'auto'}}>
                            <div className={'flex gap-8'}>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="UserName"
                                    defaultValue={userInfo?.username}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{width: '100%'}}
                                />
                                <TextField
                                    id="outlined-helperText-name"
                                    label="Họ và tên"
                                    name={'HoTen'}
                                    onChange={handleChange}
                                    defaultValue={userInfo?.HoTen}
                                    sx={{width: '100%'}}
                                />
                            </div>
                            <div className={'flex gap-8'}>
                                <TextField
                                    id="outlined-helperText-email"
                                    label="Email"
                                    name={'email'}
                                    onChange={handleChange}
                                    defaultValue={userInfo?.email}
                                    sx={{width: '100%'}}
                                />
                                <TextField
                                    id="outlined-helperText-address"
                                    label="Địa chỉ"
                                    name={'DiaChi'}
                                    onChange={handleChange}
                                    defaultValue={userInfo?.DiaChi}
                                    sx={{width: '100%'}}
                                />
                            </div>
                            <div className={'flex gap-8'}>
                                <FormControl fullWidth sx={{mt: 2}}>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Giới tính
                                    </InputLabel>
                                    <NativeSelect
                                        defaultValue={userInfo?.GioiTinh}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'GioiTinh',
                                            id: 'uncontrolled-native',
                                        }}
                                        sx={{width: '100%'}}
                                    >
                                        <option value={1}>Nam</option>
                                        <option value={0}>Nữ</option>
                                    </NativeSelect>
                                </FormControl>
                                <input
                                    type="date"
                                    name="NgaySinh"
                                    defaultValue={formattedNgaySinh}
                                    onChange={handleChange}
                                    style={{
                                        padding: '10px',
                                        width: '100%',
                                        marginTop: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                        </div>
                        <div className={'w-full flex justify-end item-center !mt-10'}
                             style={{width: '100%', maxWidth: 750, margin: 'auto'}}>
                            <Button variant={'contained'} className={'w-[120px] h-12 !mx-4'} onClick={handleUpdate}>Cập
                                nhật</Button>
                            <Button variant={'outlined'} className={'w-[120px] h-12 !mx-4'}
                                    onClick={handleCloseModal}>Đóng</Button>
                        </div>
                    </Typography>

                </Box>
            </Modal>
        </div>
    );
}

export default ModalInfoUser;