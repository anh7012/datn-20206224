import React, {useState} from 'react';
import {Button, Pagination} from "@mui/material";
import {formattedDate} from "../../utils/formetBithday.js";

function DanhSachHosoTheoNgay({data}) {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [searchMaHS,setSearchMaHS ]= useState('')
    const [searchHoten,setSearchHoten ]= useState('')

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const clear = () => {
        setSearchMaHS('');
        setSearchHoten('');
    };

    return (
        <div className={'h-full'}>
            <div className={'flex items-center gap-8 mb-4 px-2 py-4 rounded-lg relative border-[1px] border-gray-300 w-[40%] bg-green-300'}>
                <div className={'absolute top-0 right-0'}>
                    <Button variant="contained" color="error" size={'small'}
                            onClick={clear} className={''}>
                        Clear
                    </Button>
                </div>
                <div className="input-container">
                    <label className={'label'}>Mã hồ sơ</label>
                    <input type="text" className={'input'} value={searchMaHS}
                           onChange={(e) => setSearchMaHS(e.target.value)} autoComplete="off"/>
                </div>
                <div className="input-container">
                    <label className={'label'}>Tên khách hàng</label>
                    <input type="text" className={'input'} value={searchHoten}
                           onChange={(e) => setSearchHoten(e.target.value)} autoComplete="off"/>
                </div>

            </div>

            <div className="grid grid-cols-[10%,20%,20%,15%,15%,auto] gap-2 py-2">
                <div className="font-bold  flex justify-center">STT</div>
                <div className="font-bold  flex justify-center ">Mã hồ sơ</div>
                <div className="font-bold   flex justify-center">Khách hàng</div>
                <div className="font-bold  flex justify-center">Ngày đăng ký</div>
                <div className="font-bold  flex justify-center">Ngày quyết định</div>
                <div className="font-bold  flex justify-center ">Xem đánh giá</div>
            </div>
            <div className="bg-white rounded-sm min-h-[300px] relative border-[1px] border-gray-300 ">
                {data && data.length > 0 &&
                    data
                    .filter((profile) => profile?.maHoSo?.toLowerCase().includes(searchMaHS.toLowerCase()))
                    .filter((profile) => profile?.HoTen?.toLowerCase().includes(searchHoten.toLowerCase()))
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((item, i) => (
                    <div key={i}>
                        <div
                            className="grid grid-cols-[10%,20%,20%,15%,15%,auto] gap-2 py-3 hover:cursor-pointer hover:bg-gray-100">
                            <div className="flex justify-center ">{i + 1}</div>
                            <div className={'flex justify-center '}>{item?.maHoSo}</div>
                            <div className={'flex justify-center '}>{item?.HoTen}</div>
                            <div className={'flex justify-center '}>{formattedDate(item?.created_at)}</div>
                            <div className={'flex justify-center '}>{formattedDate(item?.updated_at)}</div>
                            <div className={'flex justify-center '}>
                                <Button variant={'contained'} color={'success'} size={'small'}>Xem đánhg giá</Button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex  pt-4 items-center justify-end absolute bottom-4 right-0">
                    <Pagination
                        count={Math.ceil(data?.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        variant="outlined"
                        color="primary"
                    />
                </div>
            </div>
        </div>
    );
}

export default DanhSachHosoTheoNgay;