import React from 'react';
import {useSelector} from "react-redux";
import {createUser} from "../../redux/apiRequest.js";
import {notify} from "../../utils/notify.js";
import eventEmitter from "../../utils/eventEmitter.js";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button,
    FormControl, FormControlLabel, FormLabel, InputAdornment,
    InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function CreateNV() {
    const nav= useNavigate()
    const names = [
        'Quản trị viên', 'Nhân viên', 'Giám đốc'
    ];
    const [userData, setUserData] = React.useState({
        HoTen: '',
        email: '',
        DiaChi: '',
        GioiTinh: '',
        NgaySinh: '',
        roleName: '',  // Đặt giá trị mặc định là chuỗi rỗng
        username: '',
        password: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent the form from submitting
        try {
            await createUser(userData);
            notify('success', 'Tạo tài khoản thành công');
            eventEmitter.emit('updateListUser');
        } catch (e) {
            notify('error', e.message);
        }
        nav('/home/quanlynhanvien')
    };
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className={'mx-8'}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className={'!font-bold !mb-4'}>
                Thêm nhân viên mới
            </Typography>
            <form onSubmit={handleUpdate}>
                <div id="modal-modal-description">
                    <Accordion defaultExpanded className={'!shadow-none '}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            1. Thông tin tài khoản
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={'flex flex-col gap-4 p-4'}
                                 style={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
                                <div className={'flex gap-8'}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="UserName"
                                        autoComplete="off"
                                        name="username"
                                        onChange={handleChange}
                                        sx={{ width: '100%' }}
                                    />
                                    <FormControl sx={{ width: '100%' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            onChange={handleChange}
                                            autoComplete="off"
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
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded className={'!shadow-none'}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            2. Thông tin cá nhân
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={'flex flex-col gap-4 p-4'}
                                 style={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
                                <div className={'flex gap-8'}>
                                    <TextField
                                        id="outlined-helperText-name"
                                        label="Họ và tên"
                                        name="HoTen"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        sx={{ width: '100%' }}
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
                                        autoComplete="off"
                                    />
                                </div>
                                <div className={'flex gap-8'}>
                                    <TextField
                                        id="outlined-helperText-address"
                                        label="Địa chỉ"
                                        name="DiaChi"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        sx={{ width: '100%' }}
                                    />
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="GioiTinh"
                                            onChange={handleChange}
                                            autoComplete="off"
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Nam" />
                                            <FormControlLabel value="0" control={<Radio />} label="Nữ" />
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
                                            value={userData.roleName}  // Đảm bảo rằng giá trị của Select được đồng bộ với userData.roleName
                                            onChange={handleChange}
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
                                    <TextField
                                        id="outlined-helperText-email"
                                        label="Email"
                                        name="email"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        sx={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className={'w-full flex justify-end item-center !mt-10'}
                         style={{ width: '100%', maxWidth: 750, margin: 'auto' }}>
                        <Button variant="contained" className={'w-[120px] h-12 !mx-4'} type="submit">Tạo mới</Button>
                        <Button variant="outlined" className={'w-[120px] h-12 !mx-4'} onClick={()=>{
                            nav('/home/quanlynhanvien')
                        }}>Đóng</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateNV;