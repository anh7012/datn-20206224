import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { notify } from '../utils/notify.js'; // Đảm bảo đường dẫn đúng
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { upLoadFileFuntion } from "../redux/apiRequest.js";
import eventEmitter from "../utils/eventEmitter.js"; // Đảm bảo đường dẫn đúng

const FileUpload = ({ id }) => {
    const [files, setFiles] = useState([]);
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        const filteredFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
        if (filteredFiles.length !== acceptedFiles.length) {
            notify('error', 'Only PDF files are allowed.');
        }
        setFiles(prevFiles => [
            ...prevFiles,
            ...filteredFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        ]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'application/pdf',
        multiple: true,
        onDrop
    });

    const removeFile = (fileToRemove) => {
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };

    const uploadFiles = async () => {
        if (files.length === 0) {
            notify('error', 'Vui lòng chọn ít nhất một file để tải lên.');
            return;
        }

        setUploading(true);

        try {
            const response = await upLoadFileFuntion(files, id, accessToken);
            console.log('response', response);
            notify('success', 'Files uploaded successfully.');
            eventEmitter.emit('uploadFileSuccess')
            setFiles([]); // Clear files after successful upload
        } catch (error) {
            notify('error', 'Error uploading files.');
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="flex flex-col items-center mt-5">
            <p className="text-center mb-4">Tải lên bản scan các hồ sơ của khách hàng tại đây (Files pdf)</p>
            <div
                {...getRootProps({ className: `border-2 border-dashed p-6 w-full max-w-lg text-center mb-4 ${isDragActive ? 'border-blue-500' : 'border-gray-400'}` })}
            >
                <input {...getInputProps()} />
                <CloudUploadIcon className="text-4xl text-gray-600" />
                <p className="text-gray-600 text-xl font-bold">Browse Files</p>
                <p className="text-gray-600">Drag and drop files here</p>
            </div>
            <div className="w-full max-w-lg">
                {files.length > 0 && (
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Files Selected:</h4>
                        <ul className="overflow-scroll h-[140px]">
                            {files.map((file, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    {file.name} - {(file.size / 1024).toFixed(2)} KB
                                    <Button onClick={() => removeFile(file)} color="error">
                                        <DeleteIcon />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex gap-x-4 w-full max-w-lg justify-center items-center mt-2">
                <Button
                    variant="contained"
                    color="success"
                    onClick={uploadFiles}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Submit'}
                </Button>
            </div>
        </div>
    );
};

export default FileUpload;
