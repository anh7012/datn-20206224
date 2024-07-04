import React from 'react';
import {
    Button,
    FormControl, FormControlLabel,
    FormLabel,
    InputLabel,
    Modal,
    NativeSelect, Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, updateUser} from "../../redux/apiRequest.js";
import {notify} from "../../utils/notify.js";
import eventEmitter from "../../utils/eventEmitter.js";
import moment from 'moment';
import PersonIcon from "@mui/icons-material/Person";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalInfoUser() {
    const userInfo = useSelector(state => state.auth?.login?.currentUser?.data?.user);
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [userData, setUserData] = React.useState({
        HoTen: userInfo?.HoTen || '',
        email: userInfo?.email || '',
        DiaChi: userInfo?.DiaChi || '',
        GioiTinh: userInfo?.GioiTinh || '',
        NgaySinh: userInfo?.NgaySinh || ''
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
        console.log(name,value)
    };

    const handleUpdate = async () => {
        console.log('Updating with:', userData);
        try {
            await updateUser(userData, userInfo.idUser)
            await getUserInfo(userInfo.idUser, dispatch)
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
                    <div  className={'!pb-8 border-b-[1px] border-gray-500'} >
                        <div className={'flex justify-start items-center gap-x-6'}>
                            <div className={'flex items-center justify-center w-20 h-20 !border-[2px] border-gray-600'}>
                                <PersonIcon className="!text-[50px]"  />
                            </div>
                            <div>
                                <h1 className={'font-bold text-2xl'}>{userInfo?.HoTen}</h1>
                                <h1 className={''}>{userInfo?.email}</h1>
                            </div>
                        </div>
                    </div>

                    <Typography id="modal-modal-title" variant="p" component="h2" className={'!mt-4'}>
                        Thông tin cá nhân
                    </Typography>
                    <div className={'mt-2'}>
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
                                <FormControl fullWidth={true}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="GioiTinh"
                                        defaultChecked={userInfo?.GioiTinh}
                                        defaultValue={userInfo?.GioiTinh}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value={1} control={<Radio />} label="Nam" />
                                        <FormControlLabel value={0} control={<Radio />} label="Nữ" />
                                    </RadioGroup>
                                </FormControl>

                            </div>
                            <div className={'flex gap-8 items-end'}>
                                <TextField
                                    id="outlined-helperText-address"
                                    label="Địa chỉ"
                                    name={'DiaChi'}
                                    onChange={handleChange}
                                    defaultValue={userInfo?.DiaChi}
                                    sx={{width: '100%'}}
                                />
                                <TextField
                                    label="Ngày sinh"
                                    name="NgaySinh"
                                    type="date"
                                    defaultValue={formattedNgaySinh}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
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
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default ModalInfoUser;