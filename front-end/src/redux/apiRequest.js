import axios from "axios";
import {loginFailed, loginSuccess, logoutUser} from "./slice/authSlice.js";
import {jwtDecode} from "jwt-decode";
import eventEmitter from "../utils/eventEmitter.js";

const api = axios.create({
    baseURL: 'http://localhost:7012',
});
api.interceptors.request.use(
    (config) => {
        // Thực hiện các hành động trước khi request được gửi đi
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
            alert('Phiên đăng nhập đã hết vui lòng đăng nhập lại')
            localStorage.clear()
            window.location.href = '/dangnhap';
        }

        return config;

    },
    (error) => {
        // Xử lý lỗi khi request không thành công
        return Promise.reject(error);
    }
);

export const loginUser = async (user, dispatch, navigate) => {
    try {
        const res = await axios.post('http://localhost:7012/login', user);
        if (res.data.code === 1000) {
            localStorage.setItem('token', res.data.data.accessToken)
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
export const logout = async (dispatch, navigator) => {
    try {
        await axios.post('http://localhost:7012/logout');
        dispatch(logoutUser());
        navigator('/dangnhap');
    } catch (e) {
        console.log('>>', e);
    }
}
export const updateUser = async (data, id) => {
    try {
        await api.put(`http://localhost:7012/users/${id}/updateUser`, data)
    } catch (e) {
        console.log(e)
    }
}
export const createUser = async (data) => {
    try {
        const res = await api.post(`http://localhost:7012/users/createUser`, data)
        if (!res.data.user) {
            eventEmitter.emit('errorCreateUser', res.data.message)
        } else eventEmitter.emit('successcreateUser')

    } catch (e) {
        console.log(e)
    }
}
export const getUserInfo = async (id, dispatch) => {
    try {
        const res = await api.get(`http://localhost:7012/users/${id}/getUser`)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const listUser = async () => {
    try {
        const res = await api.get('http://localhost:7012/users/listUser')
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const deleteUser = async ( idUser) => {
    try {
        const res = await api.delete(`http://localhost:7012/users/${idUser}/deleteUser`)
        if (res.data.code === 1000) {
            eventEmitter.emit('successDelete', res.data.data.message)
        } else {
            eventEmitter.emit('errorDelete', res.data.data.message)
        }
    } catch (e) {
        console.log(e)
    }
}
export const getUser = async (id) => {
    try {
        const res = await api.get(`http://localhost:7012/users/${id}/getUserAll`)
        return res.data.data.user
    } catch (error) {
        console.log(error)
    }
}


export const updateUserInfoToManeger = async (userInfo) => {
    const id = userInfo.idUser
    try {
       await api.post(`http://localhost:7012/users/${id}/changeUsername`, {username: userInfo.username})
        if (userInfo.password !== "") {
            await api.post(`http://localhost:7012/users/${id}/changePassword`, {new_password: userInfo.password})
        }
        await api.put(`http://localhost:7012/users/${id}/updateUser`,
            {
                email: userInfo.email,
                HoTen: userInfo.HoTen,
                NgaySinh: userInfo.NgaySinh,
                GioiTinh: userInfo.GioiTinh,
                DiaChi: userInfo.DiaChi
            })
        await api.post(`http://localhost:7012/users/${id}/changeRole`, {roleName: userInfo.roleName})
        await api.post(`http://localhost:7012/users/${id}/changeStatus`, {status: userInfo.status})

    } catch (e) {
        console.log(e)
    }
}
export const getListHoso = async () => {
    try {
        const res = await api.get(`http://localhost:7012/hoso/listHoSo`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getCatoryKH = async (MaKH) => {
    try {
        const res = await api.post(`http://localhost:7012/client/loaiKH`, MaKH)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const createHoso = async (data) => {
    try {
        const res = await api.post(`http://localhost:7012/hoso/createHoSo`, {
            ...data,
            KyHan: +data.KyHan,
            TongTienVay: +data.TongTienVay
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const createMHBIDVAndEY = async (data) => {
    try {
        const res = await api.post(`http://localhost:7012/hoso/createMHBIDVAndEY`, {
            ...data,
            TaiSanRong: +data.TaiSanRong,
            LoiNhuan: +data.LoiNhuan,
            DoanhThu: +data.DoanhThu,
            NguonTraNo: +data.NguonTraNo
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getHoso = async (id) => {
    try {
        const res = await api.get(`http://localhost:7012/hoso/${id}/inforHoSo`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getInforKH = async (id) => {
    try {
        const res = await api.get(`http://localhost:7012/client/${id}/inforClient`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListInforKH = async () => {
    try {
        const res = await api.get(`http://localhost:7012/client/listClient`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const createKH = async (data) => {
    try {
        const res = await api.post(`http://localhost:7012/client/createClient`, data)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getKH = async (id) => {
    try {
        const res = await api.get(`http://localhost:7012/client/${id}/inforClient`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const updateKH = async (id, data) => {
    try {
        const res = await api.put(`http://localhost:7012/client/${id}/updateClient`, data)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const doneDanhGia = async (maHoSo) => {
    try {
        const res = await api.post(`http://localhost:7012/danhgiatindung/createDanhGia`, {
            maHoSo: maHoSo
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const listDanhGia = async () => {
    try {
        const res = await api.get(`http://localhost:7012/danhgiatindung/listDanhGia`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const updateTrangThai = async (trangthaihoso, id) => {
    try {
        const res = await api.put(`http://localhost:7012/hoso/${id}/updateTrangThai`, {
            trangthaihoso: trangthaihoso
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getDanhGia = async (idHoso) => {
    try {
        const res = await api.get(`http://localhost:7012/danhgiatindung/${idHoso}/findDanhGia`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListPermission = async (id) => {
    try {
        const res = await api.get(`http://localhost:7012/users/${id}/listMissPermission`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const ListPermission = async () => {
    try {
        const res = await api.get(`http://localhost:7012/users/listPermission`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListPermissionById = async (id) => {
    try {
        const res = await api.get(`http://localhost:7012/users/${id}/permissionsUser`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const updateListPermissionById = async (id, idPermissioArr) => {
    try {
        const res = await api.post(`http://localhost:7012/users/${id}/addPermission`, {listPermission: idPermissioArr}  )
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const deletePermissionById = async (id, idPermission) => {
    try {
        const res = await api.delete(`http://localhost:7012/users/${id}/deletePermission`, {
            data: {idPermission: idPermission}
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListVay = async (idClient) => {
    try {
        const res = await api.get(`http://localhost:7012/danhgiatindung/${idClient}/listVay`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getTBVay = async (idClient) => {
    try {
        const res = await api.get(`http://localhost:7012/danhgiatindung/${idClient}/TrungBinhVay`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getBieuDoPhanPhoi = async (idClient) => {
    try {
        const res = await api.get(`http://localhost:7012/danhgiatindung/${idClient}/PhanPhoiLoaiGD`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getBieuDoPhanPhoiPhuongThucGD = async (idClient) => {
    try {
        const res = await api.get(`http://localhost:7012/danhgiatindung/${idClient}/PhanPhoiPhuongThucGD`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getBieuDoThoiHan = async (idClient) => {
    try {
        const res = await api.get(`http://localhost:7012/danhgiatindung/${idClient}/ParetoThoiHan`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getBieuDoTron = async (idHoSo) => {
    try {
        const res = await api.get(`http://localhost:7012/danhgiatindung/${idHoSo}/tyleThuNo`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getListHD = async () => {
    try {
        const res = await api.get(`http://localhost:7012/hopdong/listHopDong`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const upLoadFileFuntion = async (files, idHoSo) => {
    const formData = new FormData();

    files.forEach(file => {
        formData.append('HoSoFiles', file);
    });

    try {
        const res = await api.post(`http://localhost:7012/hoso/${idHoSo}/uploadFiles`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (e) {
        console.error('Error uploading files', e);
        throw e;
    }
};
export const getFile = async (idHoSo) => {
    try {
        const res = await api.get(`http://localhost:7012/hoso/${idHoSo}/getFiles`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getAccountClient = async (id) => {
    try {
        const res = await api.get(`http://localhost:7012/client/${id}/listAccount`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getHDByID = async (id) => {
    try {
        const res = await api.get(`http://localhost:7012/hopdong/${id}/inforHopDong`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}