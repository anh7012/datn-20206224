import React, { useState } from 'react';
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

function Permission({ listPermission, currentPermission, id }) {
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.permissions)||[];

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(listPermission?.map(() => false) || []);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleAdd() {
        setIsLoading(true);
        const selectedIds = listPermission
            .filter((b, index) => checked[index])
            .map(e => e.idPermission);
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
            {listPermission?.map((e, i) => (
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

    return (
        <div className={'grid grid-rows-[auto,20%] w-full border-l-[1px] border-gray-200 p-4 gap-4'}>
            <div className={''}>
                <p className={'mb-4 font-bold'}>Quyền hiện đang có ({currentPermission&&currentPermission.length}):</p>
               <div className={'flex items-end gap-2 flex-wrap p-4 border border-black'}>
                   {currentPermission?.length > 0 ? (
                       currentPermission.map((e, i) => (
                           <div key={i} className={'flex items-end'}>
                               <Ticket  content={e.maPermission} deletePermission={deletePermission} idPermission={e}/>
                           </div>
                       ))
                   ) : (
                       <div>Chưa có quyền nào cả!</div>
                   )}
               </div>
            </div>
           <div className={`flex items-center justify-center ${roleUser.includes('listMissPermission')?'  ': '  hidden'}`}>
               <Button variant="outlined" size={'small'} onClick={handleClickOpen} color={'success'}><AddCircle />Thêm quyền
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
                    <p>Danh sách các quyền ({listPermission&&listPermission.length})</p>
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
