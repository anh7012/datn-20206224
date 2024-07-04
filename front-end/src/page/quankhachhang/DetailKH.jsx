import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import { getKH,  updateKH} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel, MenuItem,
    Radio,
    RadioGroup, Select,
    TextField,
} from "@mui/material";
import {notify} from "../../utils/notify.js";
import eventEmitter from "../../utils/eventEmitter.js";
import {formattedNgaySinh} from "../../utils/formetBithday.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";

function DetailKh() {
    const {idKH} = useParams()
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.permissions)||[];

    const [data, setData] = useState()
    const nav = useNavigate()
    const [isUpdate,setIsUpdate] = useState(false)
    const names = [
        'KHCN', 'KHDN', 'TCTD'
    ];
    const handleChange = (event) => {
        setIsUpdate(true)
        const {name, value} = event.target;
       if (name === 'NgaySinh'){
           setData(prevState => ({
               ...prevState,
               [name]: formattedNgaySinh(value)
           }));
       }else {
           setData(prevState => ({
               ...prevState,
               [name]: value
           }));
       }
        console.log(name, value)
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            console.log(data)
            await updateKH(idKH,data);
            notify('success', 'Cập nhật thông tin khách hàng thành công');
            eventEmitter.emit('updateListKH');
        } catch (e) {
            notify('error', e.message);
        }
        nav('/home/quanlykhachhang')
    };

    const fetch = async () => {
        try {
            const res = await getKH(idKH);
            setData(()=>{
                return {
                    ...res.data,
                    GioiTinh: res.data.GioiTinh + '',
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetch()
    }, []);
    console.log(data)
    return (
        <div>
            <div className='flex items-center justify-start mb-6'>
                <Link to={'/home/quanlykhachhang'} className='text-gray-500 hover:text-black'>
                    <ArrowBackIcon className='mr-2'/>
                </Link>
                <div className='text-[18px]'>
                    Trang thông tin chi tiết của khách hàng: <strong className={'uppercase'}>{data?.HoTen}</strong>-<strong>{data?.maKhachHang}</strong>
                </div>
            </div>
            <form onSubmit={handleUpdate}>
                <div className={'bg-white p-8 gap-8 flex flex-col'}>
                    <div className={'flex gap-8'}>
                        <TextField
                            id="outlined-helperText-name"
                            label="Họ và tên"
                            name="HoTen"
                            value={data?.HoTen || ''}
                            autoComplete="off"
                            onChange={handleChange}
                            sx={{width: '100%'}}
                        />
                        <TextField
                            label="Ngày sinh"
                            name="NgaySinh"
                            type="date"
                            value={formattedNgaySinh(data?.NgaySinh) || ''}
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
                            value={data?.DiaChi || ''}
                            autoComplete="off"
                            onChange={handleChange}
                            sx={{width: '100%'}}
                        />
                        <div className={'flex items-center justify-between gap-2 w-full'}>
                            <FormControl fullWidth>
                                <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="GioiTinh"
                                    value={data?.GioiTinh || ''}
                                    onChange={handleChange}
                                    autoComplete="off"
                                >
                                    <FormControlLabel value="1" control={<Radio/>} label="Nam"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="Nữ"/>
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                id="outlined-helperText-address"
                                label="Tuổi"
                                name="Tuoi"
                                value={data?.Tuoi.toString() || ''}
                                autoComplete="off"
                                onChange={handleChange}
                                sx={{width: '100%'}}
                            />
                        </div>
                    </div>
                    <div className={'flex gap-8'}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại khách hàng</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Loại khách hàng"
                                name={'typeClient'}
                                value={data?.typeClient || ''}
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
                            value={data?.email || ''}
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
                            value={data?.sdt || ''}
                            type={'number'}
                            autoComplete="off"
                            onChange={handleChange}
                            sx={{width: '100%'}}
                        />
                        <TextField
                            id="outlined-helperText-address"
                            label="CMND/CCCD"
                            name="CCCD"
                            value={data?.CCCD || ''}
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
                                value={data?.NoiCapCCCD || ''}
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
                                value={formattedNgaySinh(data?.NgayCapCCCD) || ''}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                sx={{width: '100%'}}
                            />
                        </div>
                    <TextField
                        label=" Địa chỉ thường trú"
                        name="HoKhau"
                        value={data?.HoKhau || ''}
                        autoComplete="off"
                        onChange={handleChange}
                        sx={{width: '100%'}}
                    />

                    <div className={'w-full flex justify-end item-center !mt-10'}
                         style={{width: '100%'}}>
                        <Button variant="contained" className={`w-[120px] h-12 !mx-4 ${isUpdate ? ' ' : ' hidden'}  ${roleUser.includes('updateClient')?' ':' hidden'}`}
                                type="submit">Cập nhật</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DetailKh;