import  { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'application/pdf',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const uploadFiles = async () => {
        if (files.length === 0) {
            alert('Vui lòng chọn ít nhất một file để tải lên.');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('YOUR_API_ENDPOINT', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Files uploaded successfully.');
        } catch (error) {
            alert('Error uploading files.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center m-5">
            <p className="text-center mb-4">Tải lên bản scan các hồ sơ của khách hàng tại đây (Files pdf)</p>
            <div {...getRootProps({ className: 'dropzone' })} className="border-2 border-dashed border-gray-400 p-6 w-full max-w-lg text-center mb-4">
                <input {...getInputProps()} />
                <CloudUploadIcon className={'text-4xl text-gray-600'}/>
                <p className="text-gray-600 text-xl font-bold">Browse Files</p>
                <p className="text-gray-600">Drag and drop files here</p>
            </div>
            <div className="w-full max-w-lg">
                {files.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Files Selected:</h4>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index} className="mb-1">
                                    {file.name} - {(file.size / 1024).toFixed(2)} KB
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex gap-4 w-full max-w-lg justify-between">
                <Button variant="contained" color="inherit">Back</Button>
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
