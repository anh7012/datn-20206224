import {Button, Pagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {deleteUser, listUser} from "../redux/apiRequest.js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModalInfoUserManager from "../components/Modal/ModalInfoUserManager.jsx";
import ModalCreateUser from "../components/Modal/ModalCreateUser.jsx";
import eventEmitter from "../utils/eventEmitter.js";
import {notify} from "../utils/notify.js";
import {useNavigate} from "react-router-dom";

function QuanLyNhanVien() {
    const [listUserData, setListUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6); // Số lượng mục hiển thị trên mỗi trang
    const [filterRole, setFilterRole] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterFullName, setFilterFullName] = useState('');
    const [filterUsername, setFilterUsername] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const nav = useNavigate()

    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);

    useEffect(() => {
        listUser(accessToken).then((res) => {
            setListUserData(res);
        });
    }, [accessToken]);

    useEffect(() => {
        const fetch = async () => {
            const res = await listUser(accessToken);
            setListUserData(res);
        };
        eventEmitter.on('updateListUser', fetch);
        return () => {
            eventEmitter.removeListener('updateListUser', fetch);
        };
    }, [accessToken]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleRoleChange = (event) => {
        setFilterRole(event.target.value);
    };

    const handleStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const handleFullNameChange = (event) => {
        setFilterFullName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setFilterUsername(event.target.value);
    };

    const handleResetFilters = () => {
        setFilterRole('');
        setFilterStatus('');
        setFilterFullName('');
        setFilterUsername('');
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
    };

    const handleConfirmDelete = async () => {
        await deleteUser(accessToken, selectedUser.idUser);
        setOpenDialog(false);
        setSelectedUser(null);
        eventEmitter.emit('updateListUser');
    };

    const uniqueRoleNames = [...new Set(listUserData?.map(item => item?.roleName))];
    const uniqueStatuses = [...new Set(listUserData?.map(item => item?.status))];

    const filteredUsers = listUserData?.filter(user => {
        return (
            (filterRole ? user?.roleName === filterRole : true) &&
            (filterStatus ? user?.status === filterStatus : true) &&
            (filterFullName ? user?.HoTen.toLowerCase().includes(filterFullName.toLowerCase()) : true) &&
            (filterUsername ? user?.username.toLowerCase().includes(filterUsername.toLowerCase()) : true)
        );
    });

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    useEffect(() => {
        const showNotifyError = (e) => notify('error', e);
        const showNotifySuccess = (e) => {
            notify('success', e)
        };
        eventEmitter.on('errorDelete', showNotifyError)
        eventEmitter.on('successDelete', showNotifySuccess)
        return () => {
            eventEmitter.removeListener('errorDelete', showNotifyError);
            eventEmitter.removeListener('successDelete', showNotifySuccess);
        }
    }, [])

    function handleViewUser(idUser) {
        nav(`/home/${
            idUser}`)
    }

    return (
        <div>
            <p className={'pb-2 font-bold'}>Danh sách nhân viên</p>
            <form autoComplete="off">
                <div className={'grid grid-cols-[70%,30%] gap-2 px-4 py-4 bg-white mb-2 rounded-sm'}>
                    <div className={''}>
                        <div className={'grid grid-cols-[80%,auto] gap-x-8 '}>
                            <div className={'grid grid-cols-[25%,25%,25%,25%] gap-x-4'}>
                                <div className="input-container">
                                    <label className={'label'}>Nhập tài khoản</label>
                                    <input type="text" className={'input'} placeholder="Tài khoản"
                                           value={filterUsername} onChange={handleUsernameChange} autoComplete="off"/>
                                </div>

                                <div className="input-container">
                                    <label className={'label'}>Nhập họ tên:</label>
                                    <input type="text" className={'input'} placeholder="Họ tên"
                                           value={filterFullName} onChange={handleFullNameChange} autoComplete="off"/>
                                </div>
                                <div className="select-container">
                                    <label htmlFor="chuc-vu" className={'label'}>Chức vụ</label>
                                    <select id="chuc-vu" className={'select'} value={filterRole}
                                            onChange={handleRoleChange}>
                                        <option value="">Tất cả</option>
                                        {uniqueRoleNames.map((role, index) => (
                                            <option key={index} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="select-container">
                                    <label htmlFor="status" className={'label'}>Trạng thái</label>
                                    <select id="status" className={'select'} value={filterStatus}
                                            onChange={handleStatusChange}>
                                        <option value="">Tất cả</option>
                                        {uniqueStatuses.map((status, index) => (
                                            <option key={index} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={'flex items-end justify-end'}>
                                <Button variant="outlined" onClick={handleResetFilters}
                                        className={'    '}><RestartAltIcon/></Button>
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-end items-end'}>
                        <ModalCreateUser/>
                    </div>
                </div>
            </form>
            <div className={'grid grid-cols-[10%,15%,20%,15%,10%,auto] gap-2 py-2'}>
                <div className={'text-gray-500 flex justify-center'}>STT</div>
                <div className={'text-gray-500'}>Tài Khoản</div>
                <div className={'text-gray-500'}>Họ tên</div>
                <div className={'text-gray-500'}>Chức vụ</div>
                <div className={'text-gray-500 flex justify-center'}>Trạng thái</div>
                <div></div>
            </div>
            <div className={'bg-white rounded-sm  min-h-[391px] relative '}>
                {
                    currentItems.map((item, i) => (
                        <div key={i}
                             className={'grid grid-cols-[10%,15%,20%,15%,10%,auto] gap-2 py-3 hover:cursor-pointer  hover:bg-gray-100'}>
                            <div className={'flex justify-center'}>{indexOfFirstItem + i + 1}</div>
                            <div>{item?.username}</div>
                            <div>{item?.HoTen}</div>
                            <div>{item?.roleName}</div>
                            <div className={'flex justify-center'}>
                                {item?.status === 'active' ? (
                                    <div
                                        className={'w-12  h-6 bg-green-200 flex items-center justify-center rounded-xl p-2'}>
                                        <p className={'text-[10px] font-bold'}>Active</p></div>
                                ) : (
                                    <div
                                        className={'w-12  h-6 bg-red-300 flex items-center justify-center rounded-xl p-2'}>
                                        <p className={'text-[10px] font-bold'}>Close</p></div>
                                )}
                            </div>
                            <div className={'flex justify-center items-center gap-2'}>
                                <Button variant={'contained'} color={'primary'} size={'small'}
                                        onClick={() => handleViewUser(item.idUser)}><p
                                    className={' text-[12px]'}>Xem</p></Button>
                                {/*<ModalInfoUserManager/>*/}
                                <Button variant={'contained'} color={'error'} size={'small'}
                                        onClick={() => handleDeleteClick(item)}
                                        startIcon={<DeleteIcon/>}><p className={' text-[12px]'}>Xoá</p></Button>
                            </div>
                        </div>
                    ))
                }
                <div className={'flex  pt-4 items-center justify-end absolute bottom-4 right-0'}>
                    <Pagination
                        count={Math.ceil(filteredUsers.length / rowsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        color="primary"
                        className={'mr-10'}
                    />
                </div>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận xoá</DialogTitle>
                <DialogContent>
                    <DialogContentText>Bạn có chắc chắn muốn xoá tài khoản
                        của <strong>{selectedUser?.HoTen}</strong> không?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
                    <Button onClick={handleConfirmDelete} color="primary">Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default QuanLyNhanVien;
