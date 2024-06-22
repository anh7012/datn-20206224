import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { getFile } from "../../redux/apiRequest.js";
import { useSelector } from "react-redux";
import UpLoadFile from "../UpLoadFile.jsx";
import eventEmitter from "../../utils/eventEmitter.js";
import { getFileNameFromUrl } from "../../utils/formatString.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import PDFShow from "./PDFShow.jsx";


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

function ShowHosoGoc({ idHoso }) {
    const [open, setOpen] = React.useState(false);
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const [upload, setUpload] = useState(false);
    const [hoso, setHoso] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetch = async () => {
        try {
            const res = await getFile(idHoso, accessToken);
            console.log(res);
            setHoso(res.data || []);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        const uploadSuccess = async () => {
            setUpload(false);
            await fetch();
        };
        eventEmitter.on('uploadFileSuccess', uploadSuccess);
        return () => {
            eventEmitter.removeListener('uploadFileSuccess', uploadSuccess);
        };
    }, []);

    const removeFile = async (file) => {
        try {
            // Implement logic to delete file using its id or any identifier
            console.log(`Deleting file with id ${file.id}`);
            // Example:
            // const res = await deleteFile(file.id);
            // if (res.success) {
            //     await fetch();
            // }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const handleDocumentLoadSuccess = ({ totalPages }) => {
        console.log(`Document loaded successfully with ${totalPages} pages.`);
        // Implement any additional logic you need here
    };

    return (
        <div>
            <Button onClick={handleOpen} variant={'contained'} size={'small'}>Xem hồ sơ gốc</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" className="font-bold text-xl">
                        Danh sách hồ sơ gốc
                    </Typography>
                    <div>
                        {hoso.length > 0 ? (
                            <div>
                                <div className="flex items-center justify-center gap-y-4 flex-col py-4">
                                    {hoso.map((e, i) => (
                                        <div key={i} className="flex w-full justify-between items-center hover:bg-green-200 cursor-pointer px-3 py-4">
                                            {/*<PDFShow pdf={e} onDocumentLoadSuccess={handleDocumentLoadSuccess} />*/}
                                            <a href={e}  target="_blank"> {getFileNameFromUrl(e)}</a>
                                            {/*<Button onClick={() => removeFile(e)} color="error">*/}
                                            {/*    <DeleteIcon />*/}
                                            {/*</Button>*/}
                                        </div>
                                    ))}
                                </div>
                                <div className={` ${!upload ? '' : 'hidden'} flex items-center justify-end`}>
                                    <Button variant="contained" size="small" color="error" onClick={() => setUpload(true)}>
                                        Bổ sung hồ sơ
                                    </Button>
                                </div>
                                <div className={`${upload ? '' : 'hidden'}`}>
                                    <UpLoadFile id={idHoso} />
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 flex items-center justify-center">
                                <div className={` ${!upload ? '' : 'hidden'}`}>
                                    <Button variant="contained" size="small" color="error" onClick={() => setUpload(true)}>
                                        Bổ sung hồ sơ
                                    </Button>
                                </div>
                                <div className={`${upload ? '' : 'hidden'}`}>
                                    <UpLoadFile id={idHoso} />
                                </div>
                            </div>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ShowHosoGoc;
