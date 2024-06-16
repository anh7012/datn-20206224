import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button,
    FormControl, FormControlLabel, FormLabel, InputAdornment,
    InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select,
    TextField,
    Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {createKH, createUser} from "../../redux/apiRequest.js";
import {notify} from "../../utils/notify.js";
import eventEmitter from "../../utils/eventEmitter.js";

function CreateClient() {
    const nav = useNavigate()
    const names = [
        'KHCN', 'KHDN', 'TCTD'
    ];
    const accessToken = useSelector(state => state.auth?.login?.currentUser?.data?.accessToken);
    const [userData, setUserData] = useState({});
    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            console.log(userData)
            await createKH(userData, accessToken);
            notify('success', 'Thêm khách hàng thành công');
            eventEmitter.emit('updateListKH');
        } catch (e) {
            notify('error', e.message);
        }
        nav('/home/quanlykhachhang')
    };

    return (
        <div>
            <div className={'mx-8'}>
                <Typography id="modal-modal-title" variant="h6" component="h2" className={'!font-bold !mb-4'}>
                    Thêm khách hàng mới
                </Typography>
                <form onSubmit={handleUpdate}>
                    <div className={'bg-white p-8 gap-8 flex flex-col'}>
                        <div className={'flex gap-8'}>
                            <TextField
                                id="outlined-helperText-name"
                                label="Họ và tên"
                                name="HoTen"
                                autoComplete="off"
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
                                autoComplete="off"
                            />
                        </div>
                        <div className={'flex gap-8'}>
                            <TextField
                                id="outlined-helperText-address"
                                label="Nơi ở hiện tại"
                                name="DiaChi"
                                autoComplete="off"
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
                                    autoComplete="off"
                                >
                                    <FormControlLabel value="1" control={<Radio/>} label="Nam"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="Nữ"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={'flex gap-8'}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Loại khách hàng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Loại khách hàng"
                                    name={'typeClient'}
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
                                sx={{width: '100%'}}
                            />
                        </div>
                        <div className={'flex gap-8'}>
                            <TextField
                                id="outlined-helperText-address"
                                label="Số điện thoại"
                                name="sdt"
                                type={'number'}
                                autoComplete="off"
                                onChange={handleChange}
                                sx={{width: '100%'}}
                            />
                            <TextField
                                id="outlined-helperText-address"
                                label="CMND/CCCD"
                                name="CCCD"
                                type={'number'}
                                autoComplete="off"
                                onChange={handleChange}
                                sx={{width: '100%'}}
                            />
                        </div>
                        <div className={'flex gap-8'}>
                            <TextField
                                label="Nơi cấp"
                                name="NoiCapCCCD"
                                autoComplete="off"
                                onChange={handleChange}
                                sx={{width: '100%'}}
                            />
                            <TextField
                                label="Ngày cấp"
                                name="NgayCapCCCD"
                                type={'date'}
                                autoComplete="off"
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                sx={{width: '100%'}}
                            />
                        </div>
                        <TextField
                            label=" Địa chỉ thường trú"
                            name="HoKhau"
                            autoComplete="off"
                            onChange={handleChange}
                            sx={{width: '100%'}}
                        />
                        <div className={'w-full flex justify-end item-center !mt-10'}
                             style={{width: '100%', maxWidth: 750, margin: 'auto'}}>
                            <Button variant="contained" className={'w-[120px] h-12 !mx-4'} type="submit">Tạo
                                mới</Button>
                            <Button variant="outlined" className={'w-[120px] h-12 !mx-4'} onClick={() => {
                                nav('/home/quanlykhachhang')
                            }}>Đóng</Button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default CreateClient;