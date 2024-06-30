import React, {useEffect, useState} from 'react';
import { calculateScore } from "../../utils/calculateScore.js";
import { scoringData } from "../../redux/data/scoringData.js";
import {getAccountClient} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import {formattedDate} from "../../utils/formetBithday.js";

function Form4({ updateFormValues, formValues, errors }) {
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.permissions)||[];

    const [infoAccount,setInfoAccount] = useState([])
    const handleChange = (event) => {
        const { name, value } = event.target;
        const scoredValue = calculateScore(name, value);
        updateFormValues(scoredValue);
    };
    const handleChange2 = (event) => {
        const { name, value } = event.target;
        updateFormValues({ [name]: value });
    };
    const fetchAccountClient = async ()=>{
        try {
            const res =  await getAccountClient(formValues.idClient,accessToken)
            setInfoAccount(res.data)
        }catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        fetchAccountClient()
    }, []);
    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className={'p-8 w-full'}>
                <h2 className="text-2xl font-semibold mb-2 text-green-800">III. THÔNG TIN LIÊN QUAN KHẢ NĂNG TRẢ NỢ CỦA KHÁCH HÀNG</h2>
                <form className="space-y-8 pt-8 border-t-[1px] border-black">
                    <div className={'border-b-[1px] border-black pb-12'}>
                        <label className="block mb-2">1. Mã hồ sơ <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            name="MaHoSo"
                            onChange={handleChange2}
                            value={formValues?.MaHoSo || ''}
                            placeholder="Tối đa 10 kí tự bao gồm tiền tố 'HS'"
                            required
                        />
                        {errors?.MaHoSo && <p className="text-red-500 text-sm mt-2">{errors?.MaHoSo}</p>}
                    </div>

                    <div>
                        <p className={'font-bold text-xl'}>Mô hình 1</p>
                    </div>
                    <div>
                        <label className="block mb-2">2. Tình hình trả nợ gốc và lãi <span className="text-red-500">*</span></label>
                        <select
                            name="TinhHinhTraNoLai"
                            className="w-full p-2 border rounded"
                            value={formValues?.TinhHinhTraNoLai?.tinhhinhtranolai || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Please Select</option>
                            {Object.keys(scoringData.TinhHinhTraNoLai).map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors?.TinhHinhTraNoLai && <p className="text-red-500 text-sm mt-2">{errors?.TinhHinhTraNoLai}</p>}
                    </div>
                    <div>
                        <p className={'font-bold text-xl'}>Mô hình 2</p>
                    </div>
                    <div className={'flex items-center gap-4'}>
                        <div className={'w-full'}>
                            <label className="block mb-2">3. Tình hình trả nợ gốc <span className="text-red-500">*</span></label>
                            <select
                                name="TinhHinhTraNo"
                                className="w-full p-2 border rounded"
                                value={formValues?.TinhHinhTraNo?.tinhhinhtrano || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Please Select</option>
                                {Object.keys(scoringData.TinhHinhTraNo).map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            {errors?.TinhHinhTraNo && <p className="text-red-500 text-sm mt-2">{errors?.TinhHinhTraNo}</p>}
                        </div>
                        <div className={'w-full'}>
                            <label className="block mb-2">4. Tình hình trả nợ lãi <span className="text-red-500">*</span></label>
                            <select
                                name="TinhHinhTraLai"
                                className="w-full p-2 border rounded"
                                value={formValues?.TinhHinhTraLai?.tinhhinhtralai || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Please Select</option>
                                {Object.keys(scoringData.TinhHinhTraLai).map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            {errors?.TinhHinhTraLai && <p className="text-red-500 text-sm mt-2">{errors?.TinhHinhTraLai}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2">5. Đánh giá khả năng trả nợ <span className="text-red-500">*</span></label>
                        <div>
                            {Object.keys(scoringData.DanhGiaKNTra).map((key) => (
                                <label key={key} className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        name="DanhGiaKNTra"
                                        value={key}
                                        checked={formValues?.DanhGiaKNTra?.danhgiakntra === key}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="ml-2">{key}</span>
                                </label>
                            ))}
                        </div>
                        {errors?.DanhGiaKNTra && <p className="text-red-500 text-sm mt-2">{errors?.DanhGiaKNTra}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">6. Tổng tài sản ròng <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            name="TaiSanRong"
                            onChange={handleChange2}
                            value={formValues?.TaiSanRong || ''}
                            placeholder="Nhập tổng tài sản ròng"
                            required
                        />
                        {errors?.TaiSanRong && <p className="text-red-500 text-sm mt-2">{errors?.TaiSanRong}</p>}
                    </div>
                    <div className={`${roleUser.includes('listAccount')?'  ':' hidden'}`}>
                        <label className="block mb-2">7. Danh sách tài khoản tín dụng của khách hàng <span className="text-red-500">*</span></label>
                        <div className="overflow-x-auto ">
                            <table className="bg-white border rounded w-[1500px]">
                                <thead>
                                <tr>
                                    <th className="border px-4 py-2">Số tài khoản</th>
                                    <th className="border px-4 py-2">Loại tài khoản</th>
                                    <th className="border px-4 py-2">Số dư</th>
                                    <th className="border px-4 py-2">Trạng thái tài khoản</th>
                                    <th className="border px-4 py-2">Lãi suất</th>
                                    <th className="border px-4 py-2">Ngày đáo hạn</th>
                                    <th className="border px-4 py-2">Kỳ hạn (Tháng)</th>
                                    <th className="border px-4 py-2">Ngày hiệu lực</th>
                                    <th className="border px-4 py-2">Ngày kết thúc</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    infoAccount.length>0&&infoAccount.map((e,i)=> (
                                        <tr key={i}>
                                            <td className="border px-4 py-2">{e?.accountNumber}</td>
                                            <td className="border px-4 py-2">{e?.typeAccount}</td>
                                            <td className="border px-4 py-2">{e?.currentBalance}</td>
                                            <td className="border px-4 py-2">{e?.accountStatus}</td>
                                            <td className="border px-4 py-2">{e?.interestRate}</td>
                                            <td className="border px-4 py-2">{formattedDate(e?.maturityDate)}</td>
                                            <td className="border px-4 py-2">{e?.term}</td>
                                            <td className="border px-4 py-2">{formattedDate(e?.effDate)}</td>
                                            <td className="border px-4 py-2">{formattedDate(e?.endDate)}</td>

                                        </tr>
                                    ))
                                }
                                {/* Add more rows as needed */}
                                </tbody>
                            </table>
                        </div>
                        {/*{errors.DanhSachTaiKhoan && <p className="text-red-500 text-sm mt-2">{errors.DanhSachTaiKhoan}</p>}*/}
                    </div>
                    <div>
                        <label className="block mb-2">8. Lợi nhuận hàng tháng (Nếu có) <span
                            className="text-red-500">*</span></label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            name="LoiNhuan"
                            onChange={handleChange2}
                            value={formValues?.LoiNhuan || ''}
                            placeholder="Nhập lợi nhuận hàng tháng"
                            required
                        />
                        {errors?.LoiNhuan && <p className="text-red-500 text-sm mt-2">{errors?.LoiNhuan}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">9. Doanh thu hàng tháng (Nếu có) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            name="DoanhThu"
                            onChange={handleChange2}
                            value={formValues?.DoanhThu || ''}
                            placeholder="Nhập doanh thu hàng tháng"
                            required
                        />
                        {errors?.DoanhThu && <p className="text-red-500 text-sm mt-2">{errors?.DoanhThu}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">10. Nguồn trả nợ (Nếu có) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            name="NguonTraNo"
                            onChange={handleChange2}
                            value={formValues?.NguonTraNo || ''}
                            placeholder="Nhập nguồn trả nợ"
                            required
                        />
                        {errors?.NguonTraNo && <p className="text-red-500 text-sm mt-2">{errors?.NguonTraNo}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form4;
