import React, {useEffect, useState} from 'react';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    CircularProgress
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Ticket from "./Ticket.jsx";
import {deletePermissionById, updateListPermissionById} from "../redux/apiRequest.js";
import { useSelector } from "react-redux";
import eventEmitter from "../utils/eventEmitter.js";
import {notify} from "../utils/notify.js";

function Permission({ listPermission , currentPermission, id }) {
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const idUser = useSelector((state) => state.auth?.login?.currentUser?.data?.user?.idUser);
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.permissions)||[];
    const [numberPermissionShow, setNumberPermissionShow] = useState(5)
    const [show, setShow] = useState(5)
    const [open, setOpen] = useState(false);
    const [sleep, setSleep] = useState()

    const [checked, setChecked] = useState(()=>{
        if (listPermission) return listPermission?.map(() => false)
    else return []
    }
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleAdd() {
        setIsLoading(true);
        const selectedIds = listPermission&&listPermission
            .filter((b, index) => checked[index])
            .map(e => e.idPermission)||[];
        try {
            await updateListPermissionById(id, selectedIds, accessToken);
            eventEmitter.emit('updatePermission')
            setIsLoading(false);
            handleClose();
        }catch (e){
            console.log(e)
        }
    }

    const handleChange = (index, event) => {
        const newArr = [...checked];
        newArr[index] = event.target.checked;
        setChecked(newArr);
    };

    const handleChangeAll = (event) => {
        setChecked(checked.map(() => event.target.checked));
    };

    const isCheckAll = () => {
        return checked.length > 0 && !checked.includes(false);
    };
const deletePermission = async (e)=>{
   if (roleUser.includes('deletePermission')){
       try {
           await deletePermissionById(id,e.idPermission,accessToken)
           eventEmitter.emit('updatePermission')
       }catch (e){
           console.log(e)
       }
   }
   else {
       notify('error','Bạn không có quyền này')
   }

}
    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {listPermission && listPermission.length>0 && listPermission?.map((e, i) => (
                <FormControlLabel
                    key={i}
                    label={e.permissonName}
                    control={
                        <Checkbox
                            checked={checked[i]}
                            onChange={(event) => handleChange(i, event)}
                        />
                    }
                />
            ))}
        </Box>
    );
    const [isDelayed, setIsDelayed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDelayed(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isDelayed && id === idUser) {
            notify('info', 'Khi thay đổi quyền phải đăng nhập lại để có hiệu lực');
        }
    }, [ currentPermission]);
    console.log('ccc',currentPermission)
    return (
        <div className={'grid grid-rows-[auto,20%] w-full border-l-[1px] border-gray-200 p-4 gap-4'}>
            <div className={''}>
                <p className={'mb-4 font-bold'}>Quyền hiện đang có ({currentPermission&&currentPermission.length}):</p>
                <div className={'flex items-center gap-2 flex-wrap p-4 border border-black'}>
                    {currentPermission?.length > 0 ? (
                        currentPermission.map((e, i) => (
                            <div key={i} className={`flex items-end ${i <= numberPermissionShow ? ' ' : ' hidden'}`}>
                                <Ticket content={e.maPermission} deletePermission={deletePermission} idPermission={e}/>
                            </div>
                        ))
                    ) : (
                        <div>Chưa có quyền nào cả! Hoặc bạn không thể xem quyền người khác</div>
                    )}
                    <span
                        className={`underline text-blue-200 italic cursor-pointer hover:text-blue-500 ${numberPermissionShow === currentPermission?.length ? '  hidden' : ' '} ${currentPermission?.message? '  hidden':'  '} `}
                        onClick={() => {
                            setNumberPermissionShow(currentPermission?.length || 0)
                        }}>Xem thêm</span>
                    <span
                        className={`underline text-blue-200 italic cursor-pointer hover:text-blue-500 ${numberPermissionShow === currentPermission?.length ? '  ' : '  hidden'}`}
                        onClick={() => {
                            setNumberPermissionShow(show || 0)
                        }}>Thu gọn</span>
                </div>
            </div>
            <div
                className={`flex items-center justify-center ${roleUser.includes('listMissPermission')&&roleUser.includes('addPermission') ? '  ' : '  hidden'} mb-4`}>
                <Button variant="outlined" size={'small'} onClick={handleClickOpen} color={'success'}><AddCircle/>Thêm
                    quyền
                </Button>
           </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thêm quyền"}
                </DialogTitle>
                <DialogContent>
                    <p>Danh sách các quyền chưa có({listPermission&&listPermission.length})</p>
                    <div>
                        <FormControlLabel
                            label="Tất cả"
                            control={
                                <Checkbox
                                    checked={isCheckAll()}
                                    onChange={handleChangeAll}
                                />
                            }
                        />
                        {children}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : "Thêm"}
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Huỷ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Permission;
