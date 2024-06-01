import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUser} from "../redux/apiRequest.js";
import {useSelector} from "react-redux";

function DetailUserUnfo() {
    const [userInfo,setUserInfo] = useState()
    const {id} = useParams()
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const fetchData = async ()=>{
       const res  = await getUser(id,accessToken)
        setUserInfo(res)
    }
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <div>
            {userInfo?.HoTen}
        </div>
    );
}

export default DetailUserUnfo;