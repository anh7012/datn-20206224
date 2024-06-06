import {getListHoso} from "../redux/apiRequest.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function QuanLyHoSo() {
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const [listHoso,setListHoso] = useState([])

    const fetch = async ()=>{
      try {
      const res =   await getListHoso(accessToken)
          console.log(res)

      }catch (e){
          console.log(e)
      }
    }
    useEffect(() => {
        fetch()
    }, []);
    return (
        <div></div>
    );
}

export default QuanLyHoSo;