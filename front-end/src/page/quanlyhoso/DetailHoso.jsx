import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getHoso, getInforKH} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import {formatString} from "../../utils/formatString.js";
import {scoringData} from "../../redux/data/scoringData.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShowHosoGoc from "../../components/Modal/ShowHosoGoc.jsx";

function DetailHoso() {
    const {idHoso} = useParams()
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.permissions)||[];

    const [formValues, setFormValues] = useState()
    const [userInfo,setUserzinfo] = useState()

    const fetch = async (id) => {
        try {
            const res = await getHoso(id, accessToken)
            const res2 = await getInforKH(res.data.idClient, accessToken)
            setUserzinfo(res2.data)
            setFormValues(res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        console.log(idHoso)
        fetch(idHoso)
    }, [idHoso]);
    const handleChange = (event) => {
        // const { name, value } = event.target;
        // updateFormValues({ [name]: value });
    };

    const mappingSelect = () => {
        switch (formValues?.LoaiTraGoc) {
            case 'tra goc deu ' :
                return [
                    'Lãi đơn tính trên số gốc đã trả',
                    'Lãi tích hợp tính trên số gốc đã trả',
                    'Lãi tính trên số dư gốc còn lại'
                ];
            case 'tra goc lai deu ':
                return ['Trả gốc và lãi đều từng kỳ'];
            case 'tra goc lai khi dao han':
                return ['Lãi đơn tính trên số gốc đã trả', 'Lãi nhập gốc'];
            case 'tra goc khi dao han':
                return ['Trả lãi đầu kỳ'];
            default:
                return ["Vui lòng chọn hình thức trả gốc"];
        }
    };
    const checkValue1= (e)=>{
        switch(e){
            default :
                return
            case 'Trả gốc đều ':
                return 'tra goc deu '
            case "Trả gốc và lãi đều từng kỳ":
                return 'tra goc lai deu '
            case 'Trả gốc và lãi khi đáo hạn':
                return 'tra goc lai khi dao han'
            case "Trả gốc khi đáo hạn":
                return 'tra goc khi dao han'
        }
    }
    const checkValue2= (e)=>{
        switch(e){
            default :
                return
            case 'Lãi đơn tính trên số gốc đã trả':
                return 'lai don'
            case 'Lãi tích hợp tính trên số gốc đã trả':
                return 'lai tich hop'
            case 'Lãi tính trên số dư gốc còn lại':
                return 'lai tren du goc con lai'
            case 'Trả gốc và lãi đều từng kỳ':
                return 'tra goc lai deu '
            case 'Lãi nhập gốc':
                return 'lai nhap goc'
            case 'Trả lãi đầu kỳ':
                return 'lai tra dau ki'
        }
    }
    return (
        <div>
            <div className='flex items-center justify-start mb-6'>
                <Link to={'/home/quanlyhoso'} className='text-gray-500 hover:text-black'>
                    <ArrowBackIcon className='mr-2'/>
                </Link>
                <div className='text-[18px]'>
                    Trang thông tin chi tiết của <strong>{userInfo?.HoTen}</strong> / <strong>{userInfo?.Tuoi} Tuổi</strong>
                </div>
            </div>
            <div className={'bg-white'}>
                <div className="w-full h-full flex items-center flex-col">
                    <div className="w-full p-8">
                        <div className={'flex items-center justify-between'}>
                            <h2 className="text-2xl font-semibold mb-2 text-green-800">I. THÔNG TIN KHOẢN VAY</h2>
                           <div className={` ${roleUser.includes('roleUser')?' ':' hidden'}`}> <ShowHosoGoc idHoso={idHoso}/></div>
                        </div>
                        <div className="mb-12  pt-8 border-t-[1px] border-black">
                        <label className="block text-gray-700 mb-4">
                                1. Mục đích vay:
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {(formValues?.typeClient === 'KHCN' ? [
                                    "Vay mua ô tô",
                                    "Vay nhu cầu nhà ở",
                                    "Vay tiêu dùng không tài sản đảm bảo",
                                    "Vay du học",
                                    "Vay tiêu dùng có tài sản đảm bảo",
                                    "Vay sản xuất kinh doanh",
                                    "Vay cầm cố"
                                ] : [
                                    'Vay đầu tư',
                                    'Vay thông thường'
                                ]).map((purpose) => (
                                    <label key={purpose} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="TenLoaiVay"
                                            value={formatString(purpose)}
                                            checked={formValues?.TenLoaiVay === formatString(purpose)}
                                            onChange={handleChange}
                                            className="mr-2 !text-green-300 !border-green-300 focus:!ring-green-300"
                                            required
                                        />
                                        {purpose}
                                    </label>
                                ))}
                            </div>
                            {/*{errors.TenLoaiVay && <p className="text-red-500 text-sm mt-2">{errors.TenLoaiVay}</p>}*/}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-12">
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    2. Trả gốc theo hình thức:
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="LoaiTraGoc"
                                    value={formValues?.LoaiTraGoc}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Please Select</option>
                                    {
                                        ["Trả gốc đều ", "Trả gốc và lãi đều từng kỳ", "Trả gốc và lãi khi đáo hạn", "Trả gốc khi đáo hạn"].map((e, i) => (
                                            <option key={i} value={checkValue1(e)}>{e}</option>
                                        ))
                                    }
                                </select>
                                {/*{errors.LoaiTraGoc && <p className="text-red-500 text-sm mt-2">{errors.LoaiTraGoc}</p>}*/}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    3. Trả lãi theo hình thức:
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="LoaiTraLai"
                                    value={formValues?.LoaiTraLai}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Please Select</option>
                                    {
                                        mappingSelect().map((e, i) => (
                                            <option key={i} value={checkValue2(e)}>{e}</option>
                                        ))
                                    }
                                </select>
                                {/*{errors.LoaiTraLai && <p className="text-red-500 text-sm mt-2">{errors.LoaiTraLai}</p>}*/}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-12">
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    4. Số tiền vay:
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="TongTienVay"
                                    value={formValues?.TongTienVay}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {/*{errors.TongTienVay && <p className="text-red-500 text-sm mt-2">{errors.TongTienVay}</p>}*/}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    5. Loại tiền trả:
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="typeTienTra"
                                    value={formValues?.typeTienTra}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Please Select</option>
                                    <option value="VND">VND - Đồng Việt Nam</option>
                                    <option value="USD">USD - Đô la Mỹ</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="JPY">JPY - Yên Nhật</option>
                                    <option value="GBP">GBP - Bảng Anh</option>
                                    <option value="CAD">CAD - Đô la Canada</option>
                                    <option value="CHF">CHF - Franc Thụy Sĩ</option>
                                    <option value="CNY">CNY - Nhân dân tệ Trung Quốc</option>
                                    <option value="AUD">AUD - Đô la Úc</option>
                                    <option value="NZD">NZD - Đô la New Zealand</option>
                                    <option value="KRW">KRW - Won Hàn Quốc</option>
                                </select>
                                {/*{errors.typeTienTra && <p className="text-red-500 text-sm mt-2">{errors.typeTienTra}</p>}*/}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-12">
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    6. Lãi suất vay (%/năm):
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="LaiSuatVay"
                                    value={formValues?.LaiSuatVay}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {/*{errors.LaiSuatVay && <p className="text-red-500 text-sm mt-2">{errors.LaiSuatVay}</p>}*/}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    7. Kỳ hạn (tháng):
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="KyHan"
                                    value={formValues?.KyHan}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {/*{errors.KyHan && <p className="text-red-500 text-sm mt-2">{errors.KyHan}</p>}*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex items-center flex-col">
                    <div className={'p-8 w-full'}>
                        <h2 className="text-2xl font-semibold mb-2 text-green-800">II. THÔNG TIN NHÂN THÂN</h2>
                        <form className="grid grid-cols-2 gap-x-8 gap-y-8 pt-8 border-t-[1px] border-black">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2">1. Trình độ học vấn <span
                                    className="text-red-500">*</span></label>
                                <select
                                    name="TrinhDoHocVan"
                                    value={formValues?.TrinhDoHocVan || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Please Select</option>
                                    {Object.keys(scoringData?.TrinhDoHocVan).map((key) => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                                {/*{errors?.TrinhDoHocVan &&*/}
                                {/*    <p className="text-red-500 text-sm mt-2">{errors?.TrinhDoHocVan}</p>}*/}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2">2. Đã có tiền án, tiền sự trước đây hay không? <span
                                    className="text-red-500">*</span></label>
                                <div>
                                    {Object.keys(scoringData?.TienAn).map((key) => (
                                        <label key={key} className="inline-flex items-center ml-6">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="TienAn"
                                                value={key}
                                                checked={formValues?.TienAn.toString() === key}
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className="ml-2">{key === '1' ? 'Có' : 'Không'}</span>
                                        </label>
                                    ))}
                                </div>
                                {/*{errors?.TienAn && <p className="text-red-500 text-sm mt-2">{errors?.TienAn}</p>}*/}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2">3. Tình trạng cư trú <span
                                    className="text-red-500">*</span></label>
                                <select
                                    name="TinhTrangCuTru"
                                    value={formValues?.TinhTrangCuTru || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Please Select</option>
                                    {Object.keys(scoringData?.TinhTrangCuTru).map((key) => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                                {/*{errors?.TinhTrangCuTru &&*/}
                                {/*    <p className="text-red-500 text-sm mt-2">{errors?.TinhTrangCuTru}</p>}*/}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2">4. Cơ cấu gia đình <span
                                    className="text-red-500">*</span></label>
                                <select
                                    name="CoCauGD"
                                    value={formValues?.CoCauGD || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Please Select</option>
                                    {Object.keys(scoringData?.CoCauGD).map((key) => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                                {/*{errors?.CoCauGD && <p className="text-red-500 text-sm mt-2">{errors?.CoCauGD}</p>}*/}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2">5. Số người trực tiếp phụ thuộc vào người vay <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="SoNguoiAnTheo"
                                    value={formValues?.SoNguoiAnTheo || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                {/*{errors?.SoNguoiAnTheo &&*/}
                                {/*    <p className="text-red-500 text-sm mt-2">{errors?.SoNguoiAnTheo}</p>}*/}
                                <p className="text-[10px] italic text-gray-500 mt-2">VD: 1</p>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2">6. Bảo hiểm nhân thọ <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="BHNhanTho"
                                    value={formValues?.BHNhanTho || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                {/*{errors?.BHNhanTho && <p className="text-red-500 text-sm mt-2">{errors?.BHNhanTho}</p>}*/}
                                <p className="text-[10px] italic text-gray-500 mt-2">VD: 100,000,000</p>
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2">7. Tính chất công việc hiện tại <span
                                    className="text-red-500">*</span></label>
                                <div className={'grid w-full grid-cols-2'}>
                                    {Object.keys(scoringData.CongViec).map((key) => (
                                        <label key={key} className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="CongViec"
                                                value={key}
                                                checked={formValues?.CongViec === key}
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className="ml-2">{key}</span>
                                        </label>
                                    ))}
                                </div>
                                {/*{errors?.CongViec && <p className="text-red-500 text-sm mt-2">{errors?.CongViec}</p>}*/}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2">8. Rủi ro nghề nghiệp <span
                                    className="text-red-500">*</span></label>
                                <div>
                                    {Object.keys(scoringData.RuiRoNN).map((key) => (
                                        <label key={key} className="inline-flex items-center ml-6">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="RuiRoNN"
                                                value={key}
                                                checked={formValues?.RuiRoNN === key}
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className="ml-2">{key}</span>
                                        </label>
                                    ))}
                                </div>
                                {/*{errors?.RuiRoNN && <p className="text-red-500 text-sm mt-2">{errors?.RuiRoNN}</p>}*/}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block mb-2">9. Thời gian làm công việc hiện tại (năm) <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="ThoiGianLamViec"
                                    value={formValues?.ThoiGianLamViec || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                {/*{errors?.ThoiGianLamViec &&*/}
                                {/*    <p className="text-red-500 text-sm mt-2">{errors?.ThoiGianLamViec}</p>}*/}
                                <p className="text-[10px] italic text-gray-500 mt-2">VD: Dưới 1 năm thì ghi 0</p>
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2">10. Thu nhập ròng hàng tháng <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="ThuNhapRong"
                                    value={formValues?.ThuNhapRong || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                {/*{errors?.ThuNhapRong && <p className="text-red-500 text-sm mt-2">{errors?.ThuNhapRong}</p>}*/}
                                <p className="text-[10px] italic text-gray-500 mt-2">VD: 10,000,000</p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-full h-full flex items-center flex-col">
                    <div className={'p-8 w-full'}>
                        <h2 className="text-2xl font-semibold mb-2 text-green-800">III. THÔNG TIN LIÊN QUAN KHẢ NĂNG TRẢ
                            NỢ
                            CỦA KHÁCH HÀNG</h2>
                        <form className="space-y-8 pt-8 border-t-[1px] border-black">
                            <div className={'border-b-[1px] border-black pb-12'}>
                                <label className="block mb-2">1. Mã hồ sơ <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    name="MaHoSo"
                                    onChange={handleChange}
                                    value={formValues?.maHoSo || ''}
                                    placeholder="Tối đa 10 kí tự bao gồm tiền tố 'HS'"
                                    required
                                />
                                {/*{errors?.MaHoSo && <p className="text-red-500 text-sm mt-2">{errors?.MaHoSo}</p>}*/}
                            </div>

                            <div>
                                <p className={'font-bold text-xl'}>Mô hình 1</p>
                            </div>
                            <div>
                                <label className="block mb-2">2. Tình hình trả nợ gốc và lãi <span
                                    className="text-red-500">*</span></label>
                                <select
                                    name="TinhHinhTraNoLai"
                                    className="w-full p-2 border rounded"
                                    value={formValues?.TinhHinhTraNoLai || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Please Select</option>
                                    {Object.keys(scoringData.TinhHinhTraNoLai).map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {/*{errors?.TinhHinhTraNoLai &&*/}
                                {/*    <p className="text-red-500 text-sm mt-2">{errors?.TinhHinhTraNoLai}</p>}*/}
                            </div>
                            <div>
                                <p className={'font-bold text-xl'}>Mô hình 2</p>
                            </div>
                            <div className={'flex items-center gap-4'}>
                                <div className={'w-full'}>
                                    <label className="block mb-2">3. Tình hình trả nợ gốc <span
                                        className="text-red-500">*</span></label>
                                    <select
                                        name="TinhHinhTraNo"
                                        className="w-full p-2 border rounded"
                                        value={formValues?.TinhHinhTraNo || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Please Select</option>
                                        {Object.keys(scoringData.TinhHinhTraNo).map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    {/*{errors?.TinhHinhTraNo &&*/}
                                    {/*    <p className="text-red-500 text-sm mt-2">{errors?.TinhHinhTraNo}</p>}*/}
                                </div>
                                <div className={'w-full'}>
                                    <label className="block mb-2">4. Tình hình trả nợ lãi <span
                                        className="text-red-500">*</span></label>
                                    <select
                                        name="TinhHinhTraLai"
                                        className="w-full p-2 border rounded"
                                        value={formValues?.TinhHinhTraLai || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Please Select</option>
                                        {Object.keys(scoringData.TinhHinhTraLai).map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    {/*{errors?.TinhHinhTraLai &&*/}
                                    {/*    <p className="text-red-500 text-sm mt-2">{errors?.TinhHinhTraLai}</p>}*/}
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2">5. Đánh giá khả năng trả nợ <span
                                    className="text-red-500">*</span></label>
                                <div>
                                    {Object.keys(scoringData.DanhGiaKNTra).map((key) => (
                                        <label key={key} className="inline-flex items-center ml-6">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="DanhGiaKNTra"
                                                value={key}
                                                checked={formValues?.DanhGiaKNTra === key}
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className="ml-2">{key}</span>
                                        </label>
                                    ))}
                                </div>
                                {/*{errors?.DanhGiaKNTra &&*/}
                                {/*    <p className="text-red-500 text-sm mt-2">{errors?.DanhGiaKNTra}</p>}*/}
                            </div>
                            <div>
                                <label className="block mb-2">6. Tổng tài sản ròng <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    name="TaiSanRong"
                                    onChange={handleChange}
                                    value={formValues?.TaiSanRong || ''}
                                    placeholder="Nhập tổng tài sản ròng"
                                    required
                                />
                                {/*{errors?.TaiSanRong && <p className="text-red-500 text-sm mt-2">{errors?.TaiSanRong}</p>}*/}
                            </div>
                            {/*<div>*/}
                            {/*    <label className="block mb-2">7. Danh sách tài khoản tín dụng của khách hàng <span*/}
                            {/*        className="text-red-500">*</span></label>*/}
                            {/*    <div className="overflow-x-auto">*/}
                            {/*        <table className="min-w-full bg-white border rounded">*/}
                            {/*            <thead>*/}
                            {/*            <tr>*/}
                            {/*                <th className="border px-4 py-2">Mã khách hàng</th>*/}
                            {/*                <th className="border px-4 py-2">Số tài khoản</th>*/}
                            {/*                <th className="border px-4 py-2">Loại tài khoản</th>*/}
                            {/*                <th className="border px-4 py-2">Số dư</th>*/}
                            {/*                <th className="border px-4 py-2">Trạng thái tài khoản</th>*/}
                            {/*                <th className="border px-4 py-2">Lãi suất</th>*/}
                            {/*                <th className="border px-4 py-2">Ngày đáo hạn</th>*/}
                            {/*                <th className="border px-4 py-2">Kỳ hạn</th>*/}
                            {/*                <th className="border px-4 py-2">Ngày hiệu lực</th>*/}
                            {/*                <th className="border px-4 py-2">Ngày kết thúc</th>*/}
                            {/*            </tr>*/}
                            {/*            </thead>*/}
                            {/*            <tbody>*/}
                            {/*            <tr>*/}
                            {/*                <td className="border px-4 py-2">Val1</td>*/}
                            {/*                <td className="border px-4 py-2">Val2</td>*/}
                            {/*                <td className="border px-4 py-2">Val3</td>*/}
                            {/*                <td className="border px-4 py-2">Val4</td>*/}
                            {/*                <td className="border px-4 py-2">Val5</td>*/}
                            {/*                <td className="border px-4 py-2">Val6</td>*/}
                            {/*                <td className="border px-4 py-2">Val7</td>*/}
                            {/*                <td className="border px-4 py-2">Val8</td>*/}
                            {/*                <td className="border px-4 py-2">Val9</td>*/}
                            {/*                <td className="border px-4 py-2">Val10</td>*/}
                            {/*            </tr>*/}
                            {/*            /!* Add more rows as needed *!/*/}
                            {/*            </tbody>*/}
                            {/*        </table>*/}
                            {/*    </div>*/}
                            {/*    /!*{errors.DanhSachTaiKhoan && <p className="text-red-500 text-sm mt-2">{errors.DanhSachTaiKhoan}</p>}*!/*/}
                            {/*</div>*/}
                            <div>
                                <label className="block mb-2">7. Lợi nhuận hàng tháng (Nếu có) <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    name="LoiNhuan"
                                    onChange={handleChange}
                                    value={formValues?.LoiNhuan || ''}
                                    placeholder="Nhập lợi nhuận hàng tháng"
                                    required
                                />
                                {/*{errors?.LoiNhuan && <p className="text-red-500 text-sm mt-2">{errors?.LoiNhuan}</p>}*/}
                            </div>
                            <div>
                                <label className="block mb-2">8. Doanh thu hàng tháng (Nếu có) <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    name="DoanhThu"
                                    onChange={handleChange}
                                    value={formValues?.DoanhThu || ''}
                                    placeholder="Nhập doanh thu hàng tháng"
                                    required
                                />
                                {/*{errors?.DoanhThu && <p className="text-red-500 text-sm mt-2">{errors?.DoanhThu}</p>}*/}
                            </div>
                            <div>
                                <label className="block mb-2">9. Nguồn trả nợ (Nếu có) <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    name="NguonTraNo"
                                    onChange={handleChange}
                                    value={formValues?.NguonTraNo || ''}
                                    placeholder="Nhập nguồn trả nợ"
                                    required
                                />
                                {/*{errors?.NguonTraNo && <p className="text-red-500 text-sm mt-2">{errors?.NguonTraNo}</p>}*/}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-full h-full flex items-center flex-col">
                    <div className={'p-8 w-full'}>
                        <h2 className="text-2xl font-semibold mb-2 text-green-800">IV. THÔNG TIN TÀI SẢN ĐẢM BẢO</h2>
                        <form className="grid grid-cols-2 gap-x-8 gap-y-8 pt-8 border-t-[1px] border-black">
                            <div className={'col-span-2 md:col-span-1'}>
                                <label className="block mb-2">1. Tên tài sản đảm bảo <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    name="TenTSDB"
                                    onChange={handleChange}
                                    value={formValues?.TenTSDB || ''}
                                    placeholder="Nhập tên tài sản đảm bảo"
                                    required
                                />
                                {/*{errors?.TenTSDB && <p className="text-red-500 text-sm mt-2">{errors?.TenTSDB}</p>}*/}
                            </div>
                            <div className={'col-span-2 md:col-span-1'}>
                                <label className="block mb-2">2. Rủi ro giảm giá tài sản đảm bảo trong 2 năm gần
                                    đây <span
                                        className="text-red-500">*</span></label>
                                <div className="flex flex-col gap-y-2">
                                    {Object.keys(scoringData.RuiRoGiamGiaTSDB).map((key) => (
                                        <label key={key} className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                name="RuiRoGiamGiaTSDB"
                                                value={key}
                                                checked={formValues?.RuiRoGiamGiaTSDB === key}
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className="ml-2">{key}</span>
                                        </label>
                                    ))}
                                </div>
                                {/*{errors?.RuiRoGiamGiaTSDB &&*/}
                                {/*    <p className="text-red-500 text-sm mt-2">{errors?.RuiRoGiamGiaTSDB}</p>}*/}
                            </div>
                            <div>
                                <label className="block mb-2">3. Loại tài sản đảm bảo <span
                                    className="text-red-500">*</span></label>
                                <select
                                    className="w-full p-2 border rounded"
                                    name="LoaiTSDB"
                                    value={formValues?.LoaiTSDB || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Please Select</option>
                                    {Object.keys(scoringData.LoaiTSDB).map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {/*{errors?.LoaiTSDB && <p className="text-red-500 text-sm mt-2">{errors?.LoaiTSDB}</p>}*/}
                            </div>
                            <div>
                                <label className="block mb-2">4. Giá trị tài sản đảm bảo <span
                                    className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    name="GiaTriTSDB"
                                    onChange={handleChange}
                                    value={formValues?.GiaTriTSDB || ''}
                                    placeholder="Nhập giá trị tài sản đảm bảo"
                                    required
                                />
                                {/*{errors?.GiaTriTSDB && <p className="text-red-500 text-sm mt-2">{errors?.GiaTriTSDB}</p>}*/}
                            </div>
                        </form>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default DetailHoso;