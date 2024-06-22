import React, {useEffect, useState} from 'react';
import {Button, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {getFile} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import UpLoadFile from "../UpLoadFile.jsx";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function ShowHosoGoc({idHoso}) {
    const [open, setOpen] = React.useState(false);
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const [upload, setUpload] = useState(false)
    const [hoso, setHoso] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const fetch = async () => {
        try {
            const res = await getFile(idHoso, accessToken)
            console.log(res)
            setHoso(res.data || [])
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetch()
    }, []);
    console.log(hoso)
    return (
        <div>
            <Button onClick={handleOpen} variant={'contained'}>Xem hồ sơ gốc</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Danh sách hồ sơ gốc
                    </Typography>
                    <div className={''}>
                        {
                            hoso.length > 0 ? (
                                <div></div>
                            ) : (
                                <div className={'p-8 flex items-center justify-center'}>
                                    <div className={`   ${!upload ? ' ' : ' hidden'}`}>
                                        <Button variant={'contained'} size={'small'} color={'error'}
                                                onClick={() => setUpload(true)}>Bổ xung hồ sơ</Button>
                                    </div>
                                    <div className={`${upload ? ' ' : ' hidden'}`}>
                                        <UpLoadFile id={idHoso}/>
                                    </div>

                                </div>
                            )
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ShowHosoGoc;