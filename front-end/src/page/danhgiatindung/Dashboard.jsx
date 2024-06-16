import {useParams} from "react-router-dom";
import {getDanhGia, getKH} from "../../redux/apiRequest.js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {FcBullish, FcCurrencyExchange, FcDataSheet} from "react-icons/fc";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {PieChart} from '@mui/x-charts/PieChart';

function Dashboard() {
    const [data, setData] = useState();
    const [client, setClient] = useState();
    const accessToken = useSelector(state => state.auth?.login?.currentUser?.data?.accessToken);

    const {idDashBoard} = useParams()
    const fetchData = async (id) => {
        try {
            const res = await getDanhGia(id, accessToken)
            const res2 = await getKH(res.data.idClient, accessToken)
            setData(res.data.danhgia)
            setClient(res2.data)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData(idDashBoard)
    }, [])
    return (
        <div className={'slide-in '}>
            <div className={'font-bold text-center text-2xl uppercase mb-6'}>Đánh giá tín dụng</div>
            <div className={' p-4 bg-white mb-4'}>
                <p className={'pb-2 border-b-[1px] border-gray-500 text-green-700 font-bold text-xl uppercase'}>A. Thông
                    tin khách hàng</p>
                <div className={' grid grid-cols-2 gap-4 mt-6 '}>
                    <div className={' flex items-center'}>
                        <p className={'min-w-40'}>1. Mã khách hàng:</p>
                        <p className={'font-bold'}>{client?.maKhachHang}</p>
                    </div>
                    <div className={' flex items-center '}>
                        <p className={'min-w-40'}>2. Tên khách hàng:</p>
                        <p className={'font-bold'}>{client?.HoTen}</p>
                    </div>
                    <div className={' flex items-center '}>
                        <p className={'min-w-40'}>3. Tuổi:</p>
                        <p className={'font-bold'}>{client?.Tuoi}</p>
                    </div>
                    <div className={' flex items-center '}>
                        <p className={'min-w-40'}>4. Kiểu khách hàng:</p>
                        <p className={'font-bold'}>{client?.typeClient}</p>
                    </div>
                    <div className={' flex items-center '}>
                        <p className={'min-w-40'}>5. CCCD:</p>
                        <p className={'font-bold'}>{client?.CCCD}</p>
                    </div>
                    <div className={' flex items-center '}>
                        <p className={'min-w-40'}>6. Số điện thoại:</p>
                        <p className={'font-bold'}>0{client?.sdt}</p>
                    </div>
                </div>

            </div>
            <div className={' p-4 bg-white'}>
                <p className={'pb-2 border-b-[1px] border-gray-500 text-green-700 font-bold text-xl uppercase'}>B. Đánh
                    giá tín dụng</p>
                <div className={'flex items-center '} >
                    <div className={'grid grid-cols-2 items-center gap-4 w-[50%] mt-6'}>
                        <div
                            className={' shadow-[0px_5px_16px] shadow-gray-300 rounded-xl p-4 w-[280px] h-[160px] flex items-center justify-center flex-col gap-4'}>
                            <p className={'font-bold text-xl text-center'}>Xếp hạng cá nhân BIDV</p>
                            <div className={'flex items-center gap-4 p-2'}>
                                <div>
                                    <p className={'text-teal-600 font-bold'}><strong
                                        className={'text-red-600'}><ArrowRightIcon/></strong>{data?.XHCaNhanBIDV}</p>
                                    <p className={'text-violet-600 font-bold'}><strong
                                        className={'text-red-600'}><ArrowRightIcon/></strong>{data?.DanhGiaCaNhanBIDV}
                                    </p>
                                </div>
                                <div className={'flex items-center justify-center'}>
                                    <FcBullish className="text-5xl"/>
                                </div>
                            </div>
                        </div>
                        <div
                            className={' shadow-[0px_5px_16px] shadow-gray-300 rounded-xl p-4 w-[280px] h-[160px] flex items-center justify-center flex-col gap-2'}>
                            <p className={'font-bold text-xl text-center'}>Xếp hạng tài<br/>sản đảm bảo BIDV</p>
                            <div className={'flex items-center gap-x-4'}>
                                <div>
                                    <p className={'text-teal-600 font-bold'}><strong
                                        className={'text-red-600'}><ArrowRightIcon/></strong>{data?.XHTSDBBIDV}</p>
                                    <p className={'text-violet-600 font-bold'}><strong
                                        className={'text-red-600'}><ArrowRightIcon/></strong>{data?.DanhGiaTSDBBIDV}
                                    </p>
                                </div>
                                <div className={'flex items-center justify-center'}>
                                    <FcCurrencyExchange className="text-5xl"/>
                                </div>
                            </div>
                        </div>
                        <div
                            className={' shadow-[0px_5px_16px] shadow-gray-300 rounded-xl p-4 w-[280px] h-[160px] flex items-center justify-center flex-col gap-4'}>
                            <p className={'font-bold text-xl text-center'}>Kết quả xếp hạng BIDV</p>
                            <div className={'flex items-center gap-4 p-2'}>
                                <div>
                                    <p className={'text-red-600 font-bold'}><strong
                                        className={'text-red-600'}><ArrowRightIcon/></strong>{data?.KetQuaDanhGiaBIDV}
                                    </p>
                                </div>
                                <div className={'flex items-center justify-center'}>
                                    <FcDataSheet className="text-4xl"/>
                                </div>
                            </div>
                        </div>
                        <div
                            className={' shadow-[0px_5px_16px] shadow-gray-300 rounded-xl p-4 w-[280px] h-[160px] flex items-center justify-center flex-col gap-4'}>
                            <p className={'font-bold text-center text-xl'}>Kết quả xếp hạng EY</p>
                            <div className={'flex items-center gap-4 p-2'}>
                                <div>
                                    <div className={'flex items-center justify-between'}>
                                        <p className={'text-teal-600 font-bold'}><strong
                                            className={'text-red-600'}><ArrowRightIcon/></strong>{data?.XHEY}</p>
                                        <p className={'text-violet-600 font-bold'}><strong
                                            className={'text-red-600'}><ArrowRightIcon/></strong>{data?.DanhGiaXH}</p>
                                    </div>
                                    <div className={'flex items-start'}>
                                        <p className={'text-red-600'}><ArrowRightIcon/></p>
                                        <p className={'text-red-600 font-bold'}>{data?.MucDoRuiRo}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className={'w-[50%] flex items-center justify-center !bg-white  rounded-xl p-4'}>
                       <div>
                           <PieChart
                               series={[
                                   {
                                       data: [
                                           {id: 0, value: 10, label: 'series A'},
                                           {id: 1, value: 15, label: 'series B'},
                                           {id: 2, value: 20, label: 'series C'},
                                       ],
                                   },
                               ]}
                               width={400}
                               height={200}
                           />
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;