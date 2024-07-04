import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    getListPermission,
    getListPermissionById,
    getUser,
    getUserInfo,
    updateUserInfoToManeger
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/notify.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import eventEmitter from "../../utils/eventEmitter.js";
import {formattedNgaySinh} from "../../utils/formetBithday.js";
import Permission from "../../components/Permission.jsx";

function DetailUserUnfo() {
    const dispatch = useDispatch();
    const idUserInfoManager = useSelector(state => state.auth?.login?.currentUser?.data?.user?.idUser);
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.permissions)||[];

    const [userInfo, setUserInfo] = useState({});
    const { id } = useParams();
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const names = ['Quản trị viên', 'Nhân viên', 'Giám đốc'];
    const [listPermission,setListPermission] = useState()
    const [currentPermission,setCurrentPermission] = useState()
    const [userData, setUserData] = useState({
        HoTen: '',
        email: '',
        DiaChi: '',
        GioiTinh: '',
        NgaySinh: '',
        roleName: '',
        username: '',
        password: '',
        status: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const formattedNS = userInfo?.NgaySinh ? formattedNgaySinh(userInfo?.NgaySinh) : '';

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            await updateUserInfoToManeger(userData, accessToken);
            notify('success', 'Cập nhật thông tin thành công');
            await fetchData();
            eventEmitter.emit('updateListUser')
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

    const fetchPermission = async ()=>{
        const res2 = await getListPermission(id,accessToken)
        const res3 = await getListPermissionById(id,accessToken)
        setCurrentPermission(res3.data)
        setListPermission(res2.data)
    }
    const fetchData = async () => {
        try {
            const res = await getUser(id, accessToken);
            fetchPermission()
            setUserInfo(res);
        } catch (e) {
            notify('error', 'Failed to fetch user data');
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
       let gender = userInfo?.GioiTinh + ''
        setUserData((prevState) => ({
            ...prevState,
            idUser: id,
            HoTen: userInfo.HoTen || '',
            email: userInfo.email || '',
            DiaChi: userInfo.DiaChi || '',
            GioiTinh: gender || '',
            NgaySinh: formattedNS || '',
            roleName: userInfo.roleName || '',
            username: userInfo.username || '',
            password: '',
            status: userInfo.status || '',
        }));
    }, [userInfo, formattedNS]);
    useEffect(() => {

        eventEmitter.on('updatePermission',fetchPermission)
        return ()=>{
            eventEmitter.removeListener('updatePermission',fetchPermission)
        }
    }, []);
    return (
        <div className="container mx-auto p-6">
            <div className='flex items-center justify-start mb-6'>
                <Link to={'/home/quanlynhanvien'} className='text-gray-500 hover:text-black'>
                    <ArrowBackIcon className='mr-2' />
                </Link>
                <div className='text-[18px]'>
                    Trang thông tin chi tiết của <strong>{userInfo?.HoTen}</strong>
                </div>
            </div>

            <form onSubmit={handleUpdate}>
                <div className='mb-4'>
                    <h2 className='bg-white rounded-t-md pt-2 px-2 text-green-600 font-bold border-b-[1px] text-xl'>I. Thông tin cá nhân:</h2>
                    <div className='px-8 py-6 bg-white rounded-b-md'>
                        <div className='flex gap-x-4 items-center mb-4'>
                            <div className="w-full">
                                <label className="block text-gray-700">1. Họ và tên:</label>
                                <input
                                    type="text"
                                    name="HoTen"
                                    onChange={handleChange}
                                    value={userData.HoTen}
                                    autoComplete="off"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-700">2. Ngày sinh:</label>
                                <input
                                    type="date"
                                    name="NgaySinh"
                                    onChange={handleChange}
                                    value={formattedNS}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block text-gray-700">3. Giới tính:</label>
                            <div className="flex gap-x-4 items-center">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="GioiTinh"
                                        value={'1'}
                                        checked={userData?.GioiTinh === '1'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Nam
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="GioiTinh"
                                        value={'0'}
                                        checked={userData?.GioiTinh === '0'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Nữ
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <h2 className='bg-white rounded-t-md pt-2 px-2 text-green-600 font-bold border-b-[1px] text-xl'>II.
                        Thông tin tài khoản:</h2>
                    <div className='px-8 py-6 bg-white rounded-b-md'>
                        <div className='flex gap-x-4 items-center mb-4'>
                            <div className="w-full">
                                <label className="block text-gray-700">1. Tên đăng nhập:</label>
                                <input
                                    type="text"
                                    value={userData?.username}
                                    disabled={!roleUser.includes('changeUsername')}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-700">2. Mật khẩu:</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        onChange={handleChange}
                                        value={userData?.password}
                                        autoComplete="new-password"
                                        disabled={!roleUser.includes('changePassword')}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        className="absolute inset-y-0 right-0 px-3 py-2"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-2">
                            <label className="block text-gray-700">3. Trạng thái</label>
                            <select
                                value={userData?.status}
                                onChange={handleChange}
                                name="status"
                                disabled={!roleUser.includes('changeStatus')}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="active">Active</option>
                                <option value="close">Close</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <h2 className='bg-white rounded-t-md pt-2 px-2 text-green-600 font-bold border-b-[1px] text-xl'>III. Thông tin liên hệ:</h2>
                    <div className='px-8 py-6 bg-white rounded-b-md'>
                        <div className='flex gap-x-4 items-center mb-4'>
                            <div className="w-full">
                                <label className="block text-gray-700">1. Địa chỉ:</label>
                                <input
                                    type="text"
                                    name="DiaChi"
                                    onChange={handleChange}
                                    value={userData?.DiaChi}
                                    autoComplete="off"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-700">2. Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={userData?.email}
                                    autoComplete="off"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <h2 className='bg-white rounded-t-md pt-2 px-2 text-green-600 font-bold border-b-[1px] text-xl'>IV. Quyền hạn:</h2>
                    <div className='px-8 py-6 bg-white rounded-b-md'>
                        <div className='grid grid-cols-[30%,auto] gap-4'>
                            <div className="w-full">
                                <label className="block text-gray-700">1. Chức vụ:</label>
                                <select
                                    name="roleName"
                                    onChange={handleChange}
                                    disabled={!roleUser.includes('changeRole')}
                                    value={userData?.roleName}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    {names.map((name) => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className=" w-full flex items-center justify-center">
                                <Permission listPermission={listPermission||[]} currentPermission={currentPermission} id={id}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center mt-8'>
                    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">Cập nhật</button>
                </div>
            </form>
        </div>
    );
}

export default DetailUserUnfo;
