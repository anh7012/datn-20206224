import React, {useEffect, useState} from 'react';
import {getListHD} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import FileUpload from "../../components/UpLoadFile.jsx";

function QuanLyHopDong() {
    const [listHD, setListHD] = useState()
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);

    const fecth = async ()=>{
      const  res = await getListHD(accessToken)
        console.log(res.data)
        setListHD(res.data)
    }
    useEffect(() => {
        fecth()
    }, []);
    return (
        <div>
<FileUpload/>
        </div>
    );
}

export default QuanLyHopDong;