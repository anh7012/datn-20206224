import {Link, useParams} from "react-router-dom";
import {
    getBieuDoPhanPhoi, getBieuDoPhanPhoiPhuongThucGD, getBieuDoThoiHan,
    getBieuDoTron,
    getDanhGia,
    getKH,
    getListVay,
    getTBVay,
    updateTrangThai
} from "../../redux/apiRequest.js";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {FcBullish, FcCurrencyExchange, FcDataSheet} from "react-icons/fc";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {pieArcLabelClasses, PieChart} from '@mui/x-charts/PieChart';
import {formattedDate} from "../../utils/formetBithday.js";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {Button, FormControlLabel, Pagination, Stack} from "@mui/material";
import {notify} from "../../utils/notify.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
    BarPlot,
    ChartsGrid, ChartsTooltip,
    ChartsXAxis,
    ChartsYAxis,
    LineChart,
    LinePlot,
    MarkPlot,
    ResponsiveChartContainer
} from "@mui/x-charts";
import Box from "@mui/material/Box";
import TreemapChart from "../../components/TreemapChart.jsx";
import {formatStringRevert} from "../../utils/formatString.js";
import eventEmitter from "../../utils/eventEmitter.js";

function Dashboard() {
    const {idDashBoard} = useParams()
    const [initialValue, setInitialValue] = useState('Thông qua');
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [data, setData] = useState();
    const [client, setClient] = useState();
    const [ListVay, setListVay] = useState([])
    const out = window.location.pathname
    const [row, setRow] = useState(5)
    const [page, setPage] = useState(1)
    const [isUp, setIsUp] = useState(false)
    const [status, setStatus] = useState('')
    const [dataBieuDoTron, setDataBieuDoTron] = useState([])
    const [dataBieuDoDuong, setDataBieuDoDuong] = useState([])
    const [dataBieuDoDuongNam, setDataBieuDoDuongNam] = useState([])
    const [dataBieuDoDuongTong, setDataBieuDoDuongTong] = useState([])
    const [dataPhanPhoi, setDataPhanPhoi] = useState([])
    const [dataPhanPhoiKyHan, setDataPhanPhoiKyHan] = useState([])
    const [dataBieuDoPhanPhoiPhuongThucGD, setDataBieuDoPhanPhoiPhuongThucGD] = useState([])
    const [isChange,setIsChange] = useState(false)

    useEffect(() => {
        setDataBieuDoDuongNam(() => {
            return dataBieuDoDuong.map(e => ((e?.loanYear).toString()))
        })
        setDataBieuDoDuongTong(() => {
            return dataBieuDoDuong.map(e => parseInt(e?.averageLoan) / 1000000)
        })
    }, [dataBieuDoDuong]);
    const fetchData = async (id) => {
        try {
            const res = await getDanhGia(id)
            const res2 = await getKH(res.data.idClient)
            const res3 = await getListVay(res.data.idClient)
            const res5 = await getTBVay(res.data.idClient)
            const res6 = await getBieuDoPhanPhoi(res.data.idClient)
            const res7 = await getBieuDoThoiHan(res.data.idClient)
            const res8 = await getBieuDoPhanPhoiPhuongThucGD(res.data.idClient)
            const res4 = await getBieuDoTron(res.data.danhgia.idHoSo)
            setDataBieuDoPhanPhoiPhuongThucGD(res8.data)
            setDataPhanPhoiKyHan(() => {
                return res7.data.map(e => {
                    return {
                        ...e,
                        CumulativePercentage: parseFloat(e.CumulativePercentage)
                    }
                })

            })
            setDataPhanPhoi(() => {
                return res6.data.map(e => {
                    if (e?.LoaiGiaoDich === 'Debit') {
                        return {
                            label: 'Ghi nợ',
                            value: parseInt(e?.TransactionCount)
                        };
                    } else {
                        return {
                            label: 'Tín dụng',
                            value: parseInt(e?.TransactionCount)
                        };
                    }
                });
            });

            setDataBieuDoTron(()=>{
                return [
                    {
                        id: 0,
                        value: res4.data[0].SoTienTraHangThang,
                        label: 'Số tiền phải trả'
                    },
                    {
                        id: 1,
                        value:  res4.data[0].ThuNhapRong,
                        label: 'Thu nhập ròng'
                    },
                ]
            })
            setData(res.data.danhgia)
            setDataBieuDoDuong(res5.data)
            setClient(res2.data)
            let data = res3.data
            let typeTien = res3.typeTien
            let sumData = data.map((e, i) => {
                return {
                    ...e,
                    ...typeTien[i]
                }
            })
            setListVay(sumData.sort((a, b) => new Date(b.NgayDaoHan) - new Date(a.NgayDaoHan)))
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData(idDashBoard)
    }, [])

    function handleDenghi(e) {
        setIsChange(true)
        setCurrentValue(e.target.value)
        setStatus(e.target.value)
    }

    const save = async () => {
        try {
            const res = await updateTrangThai(status, data.idHoSo)
            notify('info', res.message)
        } catch (e) {
            console.log(e)
        }
        finally {
            setIsChange(false)
        }
    }
    const series = [
        {type: 'bar', dataKey: 'LoanCount', color: '#62D1D2'},
    ];
    const dataset = dataPhanPhoiKyHan || []

    function cancelbtn() {
        setIsChange(false);
        setCurrentValue(initialValue);
    }

    const [totalBDT1, setTotalBDT1] = useState()
    useEffect(() => {
        setTotalBDT1(dataBieuDoTron.map((item) => parseInt(item.value)).reduce((a, b) => a + b, 0))
    }, [dataBieuDoTron]);
    const getArcLabelBDT1 = (params) => {
        const percent = params.value / parseInt(totalBDT1);
        return `${(percent * 100).toFixed(0)}%`;
    };
    const [totalBDT2, setTotalBDT2] = useState()
    useEffect(() => {
        setTotalBDT2(dataPhanPhoi.map((item) => parseInt(item.value)).reduce((a, b) => a + b, 0))
    }, [dataPhanPhoi]);
    const getArcLabelBDT2 = (params) => {
        const percent = params.value / parseInt(totalBDT2);
        return `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <div className={`${out !== '/home/danhgiatindung' ? ' slide-in' : ' slide-out'} `}>
            <div className='flex items-center justify-start '>
                <Link to={'/home/danhgiatindung'} className='text-gray-500 hover:text-black' onClick={()=>{
                    eventEmitter.emit('backQLTD')
                }}>
                    <ArrowBackIcon className='mr-2'/>
                </Link>
            </div>
            <div className={'font-bold text-center text-2xl uppercase mb-6'}>Đánh giá tín dụng</div>
            <div className={' p-4 bg-white mb-8'}>
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
            <div className={' p-4 bg-white mb-8'}>
                <p className={'pb-2 border-b-[1px] border-gray-500 text-green-700 font-bold text-xl uppercase'}>B. Đánh
                    giá tín dụng</p>
                <div className={'grid grid-cols-[50%,50%] mt-8'}>
                    <div className={'grid grid-cols-2 items-center gap-4 '}>
                        <div
                            className={' shadow-[0px_3px_16px] shadow-gray-300 rounded-xl p-4 w-[280px] h-[160px] flex items-center justify-center flex-col gap-4'}>
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
                            className={' shadow-[0px_3px_16px] shadow-gray-300 rounded-xl p-4 w-[280px] h-[160px] flex items-center justify-center flex-col gap-2'}>
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
                            className={' shadow-[0px_3px_16px] shadow-gray-300 rounded-xl p-4 w-[280px] h-[160px] flex items-center justify-center flex-col gap-4'}>
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
                            className={' shadow-[0px_3px_16px] shadow-gray-300 rounded-xl p-4 w-[280px] h-[160px] flex items-center justify-center flex-col gap-4'}>
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
                    <div className={' flex items-center justify-end'}>
                        <div className={'shadow-[0px_3px_16px] shadow-gray-300 rounded-xl py-10'}>
                            <PieChart
                                colors={['#481E99', '#FEB72A']}
                                series={[
                                    {
                                        data: dataBieuDoTron,
                                        outerRadius: 80,
                                        arcLabel: getArcLabelBDT1,
                                        highlightScope: {faded: 'global', highlighted: 'item'},
                                        faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
                                    },
                                ]}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: 'white',
                                        fontSize: 14,
                                    },
                                }}
                                width={550}
                                height={200}
                            />
                            <p className={'mt-6 text-center py-2 font-bold'}>Tỷ lệ thu nhập ròng và số tiền phải trả
                                hàng tháng</p>
                        </div>
                    </div>
                </div>
                <div className={' mt-12 shadow-[0px_3px_16px] shadow-gray-300 pb-2 rounded-xl'}>
                    <p className={'text-center font-bold text-xl py-3'}>Lịch sử các khoản vay khách hàng</p>
                    <div className={'border-t-[1px] border-black '}>
                        <div
                            className={'grid grid-cols-[5%,20%,10%,20%,15%,15%,auto] border-b-[1px] border-black py-2 '}>
                            <p className={'text-center font-bold'}>STT</p>
                            <p className={'text-center font-bold'}>Số tiền vay</p>
                            <p className={'text-center font-bold'}>Lãi xuất vay</p>
                            <p className={'text-center font-bold'}>Mục đích</p>
                            <div className={'grid grid-cols-[70%,auto]'}><p className={'text-end font-bold'}>Ngày đáo
                                hạn</p><ArrowRightAltIcon
                                className={`${!isUp ? ' rotate-90' : ' -rotate-90'} hover:bg-red-200 cursor-pointer`}
                                onClick={() => {
                                    setIsUp(!isUp)
                                    let revert = [...ListVay].reverse()
                                    setListVay(revert)
                                }}/></div>
                            <p className={'text-center font-bold'}>Ngày kết thúc</p>
                            <div className={'grid grid-cols-[70%,auto]'}><p className={'text-end font-bold'}>Trạng thái</p><FilterAltIcon
                                className={' hover:bg-red-200 cursor-pointer'}
                                onClick={() => {
                                    setIsUp(!isUp)
                                    let revert = [...ListVay].reverse()
                                    setListVay(revert)
                                }}/></div>
                        </div>
                        <div className={''}>
                            {
                                ListVay && ListVay
                                    .slice((page - 1) * row, page * row)
                                    .map((e, i) => (
                                        <div
                                            className={'grid grid-cols-[5%,20%,10%,20%,15%,15%,auto] py-4 border-b-[2px] border-gray-200 hover:bg-green-100'}
                                            key={i}>
                                        <p className={'text-center'}>{i + 1}</p>
                                            <p className={'text-center'}>{parseInt(e?.SoTienVay).toLocaleString('vi-VN')}
                                                <span>{e?.typeTienTra}</span></p>
                                            <p className={'text-center'}>{e && parseInt(e?.LaiSuatVay).toFixed(2)}%</p>
                                            <p className={'text-center'}>{formatStringRevert(e?.MucDich)}</p>
                                            <p className={'text-center'}>{formattedDate(e?.NgayDaoHan)}</p>
                                            <p className={'text-center'}>{formattedDate(e?.endDate)}</p>
                                            <p className={'text-center'}>{formatStringRevert(e?.TrangThai)}</p>
                                        </div>
                                    ))
                            }
                            <div className={'w-full flex items-center justify-end my-4'}>
                                <Pagination
                                    count={Math.ceil(ListVay.length / row)}
                                    page={page}
                                    onChange={(event, value) => {
                                        setPage(value);
                                    }}
                                    variant="outlined"
                                    color="primary"
                                    className={'mr-2 mt-2'}
                                    size={'small'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'grid grid-cols-[48%,auto,48%]  my-10 '}>
                    <div
                        className={'h-[400px] shadow-[0px_3px_16px] shadow-gray-300 rounded-xl  p-4 grid grid-rows-[80%,20%] relative'}>
                        <div className={'absolute top-4 left-4'}><p className={'text-[12px]'}>(Triệu VNĐ)</p></div>
                        <LineChart
                            colors={['#481E99']}
                            xAxis={[{scaleType: 'point', data: dataBieuDoDuongNam}]}
                            series={[
                                {curve: "linear", data: dataBieuDoDuongTong, label: 'Trung bình các khoản vay'},
                            ]}
                            margin={{left: 60, right: 50, top: 30, bottom: 30}}
                        />
                        <div className={'absolute bottom-[96px] right-2'}><p className={'text-[12px]'}>(Năm)</p></div>
                        <div className={'flex items-center justify-center font-bold text-[#481E99] uppercase'}>Biểu đồ
                            trung bình các khoản vay theo năm
                        </div>
                    </div>
                    <div></div>
                    <div
                        className={'h-[400px] shadow-[0px_3px_16px] shadow-gray-300 rounded-xl  p-4 grid grid-rows-[80%,20%] relative'}>
                        {
                            dataPhanPhoi.length > 0 &&
                            <PieChart
                                colors={['#FEB72A', '#481E99']}
                                series={[
                                    {
                                        data: dataPhanPhoi,
                                        arcLabel: getArcLabelBDT2,
                                        innerRadius: 60,
                                        outerRadius: 120,
                                        highlightScope: {faded: 'global', highlighted: 'item'},
                                        faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
                                    },

                                ]}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: 'white',
                                        fontSize: 14,
                                    },
                                }}
                            />
                        }
                        <div className={'flex items-center justify-center font-bold text-[#FEB72A] uppercase'}>Biểu đồ
                            phân phối giao dịch theo loại giao dịch
                        </div>
                    </div>


                </div>
                <div className={' grid grid-cols-[48%,auto,48%]  my-10  '}>
                    <div className={'h-[400px] shadow-[0px_3px_16px] shadow-gray-300 rounded-xl  p-4 grid grid-rows-[80%,20%] '}>
                        <ResponsiveChartContainer
                            series={series}
                            xAxis={[
                                {
                                    scaleType: 'band',
                                    dataKey: 'LoanTermMonths',
                                    label: 'Kỳ hạn',
                                    reverse: false
                                },
                            ]}
                            yAxis={[
                                {id: 'leftAxis', reverse: false},
                            ]}
                            dataset={dataset}
                        >
                            <BarPlot/>
                            <ChartsXAxis/>
                            <ChartsYAxis axisId="leftAxis" label="Số lượng khoản vay"/>
                            <ChartsTooltip/>
                        </ResponsiveChartContainer>
                        <div className={'flex items-center justify-center font-bold text-[#62D1D2] uppercase'}>Biểu đồ
                            phân phối số lượng vay theo kỳ hạn
                        </div>
                    </div>
                    <div></div>
                    <div className={'h-[400px] shadow-[0px_3px_16px] shadow-gray-300 rounded-xl grid grid-rows-[80%,20%] p-4'}>
                        <div className={'p-4 -mt-8'}><TreemapChart data={dataBieuDoPhanPhoiPhuongThucGD}/></div>
                        <div className={'flex items-center justify-center font-bold text-[#2E7D32] uppercase'}>Biểu đồ
                            phân phối số lượng vay theo phương thức giao dịch
                        </div>
                    </div>

                </div>
            </div>
            <div className={' p-4 bg-white mb-4 '}>
                <div className={'pb-2 border-b-[1px] border-gray-500 flex items-center gap-8'}>
                    <p className={'text-green-700 font-bold text-xl uppercase'}>C. Đề nghị:</p>
                    <div className={'mr-40 flex'}>
                        <select name="denghi" id="denghi" onChange={handleDenghi}  value={currentValue} className={'mr-10 !w-40 !p-4 shadow-[0px_0px_12px] shadow-gray-300'}>
                            {
                                ['Thông qua', 'Từ chối', 'Huỷ bỏ'].map((e, i) => (
                                    <option value={e} key={i}>{e}</option>
                                ))
                            }
                        </select>
                        <div className={'flex gap-4 '}><Button variant={'contained'} color={'success'} onClick={save}>Lưu</Button>
                            <Button variant={'contained'} color={'error'} onClick={cancelbtn} className={`${ isChange? ' ':' hidden'}`}>Huỷ</Button></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;