import React, {useEffect} from 'react';
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Button,
    FormControl, FormControlLabel, FormLabel, InputAdornment,
    InputLabel, MenuItem,
    Modal, OutlinedInput,
    Radio, RadioGroup, Select,
    TextField,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {notify} from "../../utils/notify.js";
import AddIcon from "@mui/icons-material/Add.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {createUser} from "../../redux/apiRequest.js";
import eventEmitter from "../../utils/eventEmitter.js";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

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


function ModalCreateUser() {
    const names = [
        'Quản trị viên', 'Nhân viên', 'Giám đốc'
    ];
    const accessToken = useSelector(state => state.auth?.login?.currentUser?.data?.accessToken);
    const [open, setOpen] = React.useState(false);
    const [userData, setUserData] = React.useState({
        HoTen: '',
        email: '',
        DiaChi: '',
        GioiTinh: '',
        NgaySinh: '',
        roleName: '',
        username: '',
        password: '',
    });
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
        try {
            await createUser(userData, accessToken)
        } catch (e) {
            notify('error', e.message);
        }
        handleClose();
    };
    const handleCloseModal = () => {
        handleClose();
    };
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        const showNotifyError = (e) => notify('error', e);
        const showNotifySuccess = () => {
            notify('success', 'Tạo tài khoản thành công')
            eventEmitter.emit('updateListUser')

        };
        eventEmitter.on('errorCreateUser', showNotifyError)
        eventEmitter.on('successcreateUser', showNotifySuccess)
        return () => {
            eventEmitter.removeListener('errorCreateUser', showNotifyError);
            eventEmitter.removeListener('successcreateUser', showNotifySuccess);
        }
    }, [])
    return (
        <div>
            <Button variant="contained" startIcon={<AddIcon/>} color="success" onClick={handleOpen}>Tạo mới</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={'!border-0 overflow-scroll h-[90vh]'}>
                    <Typography id="modal-modal-title" variant="h6" compnent="h2" className={'!font-bold'}>
                        Thêm nhân viên mới
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                Thông tin tài khoản
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={'flex flex-col gap-4 p-4'}
                                     style={{width: '100%', maxWidth: 600, margin: 'auto'}}>
                                    <div className={'flex gap-8'}>
                                        <TextField
                                            id="outlined-read-only-input"
                                            label="UserName"
                                            name="username"
                                            onChange={handleChange}
                                            sx={{width: '100%'}}
                                        />
                                        <FormControl sx={{width: '100%'}} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Thông tin cá nhân
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={'flex flex-col gap-4 p-4'}
                                     style={{width: '100%', maxWidth: 600, margin: 'auto'}}>
                                    <div className={'flex gap-8'}>
                                        <TextField
                                            id="outlined-helperText-name"
                                            label="Họ và tên"
                                            name="HoTen"
                                            onChange={handleChange}
                                            sx={{width: '100%'}}
                                        />
                                        <TextField
                                            label="Ngày sinh"
                                            name="NgaySinh"
                                            type="date"
                                            onChange={handleChange}
                                            fullWidth
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </div>
                                    <div className={'flex gap-8'}>
                                        <TextField
                                            id="outlined-helperText-address"
                                            label="Địa chỉ"
                                            name="DiaChi"
                                            onChange={handleChange}
                                            sx={{width: '100%'}}
                                        />
                                        <FormControl fullWidth>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="GioiTinh"
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value="1" control={<Radio/>} label="Nam"/>
                                                <FormControlLabel value="0" control={<Radio/>} label="Nữ"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className={'flex gap-8'}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Chức vụ"
                                                name={'roleName'}
                                                onChange={handleChange}
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
                                        <TextField
                                            id="outlined-helperText-email"
                                            label="Email"
                                            name="email"
                                            onChange={handleChange}
                                            sx={{width: '100%'}}
                                        />
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div className={'w-full flex justify-end item-center !mt-10'}
                             style={{width: '100%', maxWidth: 750, margin: 'auto'}}>
                            <Button variant="contained" className={'w-[120px] h-12 !mx-4'} onClick={handleUpdate}>Tạo
                                mới</Button>
                            <Button variant="outlined" className={'w-[120px] h-12 !mx-4'}
                                    onClick={handleCloseModal}>Đóng</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalCreateUser;
