import axios from "axios";
import {loginFailed, loginSuccess, logoutUser} from "./slice/authSlice.js";
import eventEmitter from "../utils/eventEmitter.js";

export const loginUser = async (user, dispatch, navigate) => {
    try {
        const res = await axios.post('http://localhost:7012/login', user);
        if (res.data.code === 1000) {
            dispatch(loginSuccess(res.data));
            eventEmitter.emit('success')
            navigate("/home");
        } else {
            dispatch(loginFailed(res.data));
            eventEmitter.emit('error', res.data.data.message)
        }
    } catch (error) {
        dispatch(loginFailed(error));
        eventEmitter.emit('error', error)
    }
};
export const logout = async (accessToken, dispatch, navigator, axiosInstance) => {
    try {
        await axiosInstance.post('http://localhost:7012/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(logoutUser());
        navigator('/dangnhap');
    } catch (e) {
        console.log('>>', e);
    }
}
export const updateUser = async (data, id, accessToken) => {
    try {
        await axios.put(`http://localhost:7012/users/${id}/updateUser`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

    } catch (e) {
        console.log(e)
    }
}
export const createUser = async (data, accessToken) => {
    try {
        const res = await axios.post(`http://localhost:7012/users/createUser`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (!res.data.user) {
            eventEmitter.emit('errorCreateUser', res.data.message)
        } else eventEmitter.emit('successcreateUser')

    } catch (e) {
        console.log(e)
    }
}
export const getUserInfo = async (id, accessToken, dispatch) => {
    try {
        const res = await axios.get(`http://localhost:7012/users/${id}/getUser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(loginSuccess(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const listUser = async (accessToken) => {
    try {
        const res = await axios.get('http://localhost:7012/users/listUser', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const deleteUser = async (accessToken, idUser) => {
    try {
        const res = await axios.delete(`http://localhost:7012/users/${idUser}/deleteUser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res)
        if (res.data.code === 1000) {
            eventEmitter.emit('successDelete', res.data.data.message)
        } else {
            eventEmitter.emit('errorDelete', res.data.data.message)
        }
    } catch (e) {
        console.log(e)
    }
}
export const getUser = async (id, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/users/${id}/getUserAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data.data.user
    } catch (error) {
        console.log(error)
    }
}


export const updateUserInfoToManeger = async (userInfo, accessToken) => {
    const id = userInfo.idUser
    try {
        const changeUserName = await axios.post(`http://localhost:7012/users/${id}/changeUsername`, {username: userInfo.username}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (userInfo.password !== "") {
            const changePassword = await axios.post(`http://localhost:7012/users/${id}/changePassword`, {new_password: userInfo.password}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        const changeUserData = await axios.put(`http://localhost:7012/users/${id}/updateUser`,
            {
                email: userInfo.email,
                HoTen: userInfo.HoTen,
                NgaySinh: userInfo.NgaySinh,
                GioiTinh: userInfo.GioiTinh,
                DiaChi: userInfo.DiaChi
            }
            , {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        const changeRole = await axios.post(`http://localhost:7012/users/${id}/changeRole`, {roleName: userInfo.roleName}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const changeStatus = await axios.post(`http://localhost:7012/users/${id}/changeStatus`, {status: userInfo.status}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

    } catch (e) {
        console.log(e)
    }
}
export const getListHoso = async (accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/hoso/listHoSo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getCatoryKH = async (MaKH, accessToken) => {
    try {
        const res = await axios.post(`http://localhost:7012/client/loaiKH`, MaKH, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const createHoso = async (data, accessToken) => {
    try {
        const res = await axios.post(`http://localhost:7012/hoso/createHoSo`, {
            ...data,
            KyHan: +data.KyHan,
            TongTienVay: +data.TongTienVay
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const createMHBIDVAndEY = async (data, accessToken) => {
    try {
        const res = await axios.post(`http://localhost:7012/hoso/createMHBIDVAndEY`, {
            ...data,
            TaiSanRong: +data.TaiSanRong,
            LoiNhuan: +data.LoiNhuan,
            DoanhThu: +data.DoanhThu,
            NguonTraNo: +data.NguonTraNo
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getHoso = async (id, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/hoso/${id}/inforHoSo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getInforKH = async (id, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/client/${id}/inforClient`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListInforKH = async (accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/client/listClient`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const createKH = async (data, accessToken) => {
    try {
        const res = await axios.post(`http://localhost:7012/client/createClient`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getKH = async (id, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/client/${id}/inforClient`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const updateKH = async (id, data, accessToken) => {
    try {
        const res = await axios.put(`http://localhost:7012/client/${id}/updateClient`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const doneDanhGia = async (maHoSo, accessToken) => {
    try {
        const res = await axios.post(`http://localhost:7012/danhgiatindung/createDanhGia`, {
            maHoSo: maHoSo
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const listDanhGia = async (accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/danhgiatindung/listDanhGia`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const updateTrangThai = async (trangthaihoso, id, accessToken) => {
    try {
        const res = await axios.put(`http://localhost:7012/hoso/${id}/updateTrangThai`, {
            trangthaihoso: trangthaihoso
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getDanhGia = async (idHoso, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/danhgiatindung/${idHoso}/findDanhGia`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListPermission = async (id, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/users/${id}/listMissPermission`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const ListPermission = async ( accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/users/listPermission`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListPermissionById = async (id, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/users/${id}/permissionsUser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const updateListPermissionById = async (id, idPermissioArr, accessToken) => {
    try {
        const res = await axios.post(`http://localhost:7012/users/${id}/addPermission`, {listPermission: idPermissioArr}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const deletePermissionById = async (id, idPermission, accessToken) => {
    try {
        const res = await axios.delete(`http://localhost:7012/users/${id}/deletePermission`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {idPermission: idPermission}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListVay = async (idClient, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/danhgiatindung/${idClient}/listVay`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getTBVay = async (idClient, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/danhgiatindung/${idClient}/TrungBinhVay`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getBieuDoPhanPhoi = async (idClient, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/danhgiatindung/${idClient}/PhanPhoiLoaiGD`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getBieuDoPhanPhoiPhuongThucGD = async (idClient, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/danhgiatindung/${idClient}/PhanPhoiPhuongThucGD`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getBieuDoThoiHan = async (idClient, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/danhgiatindung/${idClient}/ParetoThoiHan`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getBieuDoTron = async (idHoSo, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/danhgiatindung/${idHoSo}/tyleThuNo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListHD = async (accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/hopdong/listHopDong`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const upLoadFileFuntion = async (files, idHoSo, accessToken) => {
    const formData = new FormData();

    files.forEach(file => {
        formData.append('HoSoFiles', file);
    });

    try {
        const res = await axios.post(`http://localhost:7012/hoso/${idHoSo}/uploadFiles`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data;
    } catch (e) {
        console.error('Error uploading files', e);
        throw e;
    }
};
export const getFile = async ( idHoSo, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/hoso/${idHoSo}/getFiles`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getAccountClient = async (id, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/client/${id}/listAccount`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getHDByID = async (id, accessToken) => {
    try {
        const res = await axios.get(`http://localhost:7012/hopdong/${id}/inforHopDong`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}