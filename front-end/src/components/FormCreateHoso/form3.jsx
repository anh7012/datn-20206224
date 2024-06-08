import React, { useState } from 'react';
import { calculateScore } from "../../utils/calculateScore.js";
import { scoringData } from "../../redux/data/scoringData.js";

function Form3({ updateFormValues, formValues, errors }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        const scoredValue = calculateScore(name, value);
        updateFormValues(scoredValue);
    };
    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className={'p-8 w-full'}>
                <h2 className="text-2xl font-semibold mb-2 text-green-800">II. THÔNG TIN NHÂN THÂN</h2>
                <form className="grid grid-cols-2 gap-x-8 gap-y-8 pt-8 border-t-[1px] border-black">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">1. Trình độ học vấn <span className="text-red-500">*</span></label>
                        <select
                            name="TrinhDoHocVan"
                            value={formValues?.TrinhDoHocVan?.trinhdohocvan || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Please Select</option>
                            {Object.keys(scoringData?.TrinhDoHocVan).map((key) => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>
                        {errors?.TrinhDoHocVan && <p className="text-red-500 text-sm mt-2">{errors?.TrinhDoHocVan}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">2. Đã có tiền án, tiền sự trước đây hay không? <span className="text-red-500">*</span></label>
                        <div>
                            {Object.keys(scoringData?.TienAn).map((key) => (
                                <label key={key} className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        name="TienAn"
                                        value={key}
                                        checked={formValues?.TienAn?.tienan === key}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="ml-2">{key === '1' ? 'Có' : 'Không'}</span>
                                </label>
                            ))}
                        </div>
                        {errors?.TienAn && <p className="text-red-500 text-sm mt-2">{errors?.TienAn}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">3. Tình trạng cư trú <span className="text-red-500">*</span></label>
                        <select
                            name="TinhTrangCuTru"
                            value={formValues?.TinhTrangCuTru?.tinhtrangcutru || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Please Select</option>
                            {Object.keys(scoringData?.TinhTrangCuTru).map((key) => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>
                        {errors?.TinhTrangCuTru && <p className="text-red-500 text-sm mt-2">{errors?.TinhTrangCuTru}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">4. Cơ cấu gia đình <span className="text-red-500">*</span></label>
                        <select
                            name="CoCauGD"
                            value={formValues?.CoCauGD?.cocaugd || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Please Select</option>
                            {Object.keys(scoringData?.CoCauGD).map((key) => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>
                        {errors?.CoCauGD && <p className="text-red-500 text-sm mt-2">{errors?.CoCauGD}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">5. Số người trực tiếp phụ thuộc vào người vay <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="SoNguoiAnTheo"
                            value={formValues?.SoNguoiAnTheo?.songuoiantheo || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {errors?.SoNguoiAnTheo && <p className="text-red-500 text-sm mt-2">{errors?.SoNguoiAnTheo}</p>}
                        <p className="text-[10px] italic text-gray-500 mt-2">VD: 1</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">6. Bảo hiểm nhân thọ <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="BHNhanTho"
                            value={formValues?.BHNhanTho?.bhnhantho || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {errors?.BHNhanTho && <p className="text-red-500 text-sm mt-2">{errors?.BHNhanTho}</p>}
                        <p className="text-[10px] italic text-gray-500 mt-2">VD: 100,000,000</p>
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2">7. Tính chất công việc hiện tại <span className="text-red-500">*</span></label>
                        <div className={'grid w-full grid-cols-2'}>
                            {Object.keys(scoringData.CongViec).map((key) => (
                                <label key={key} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        name="CongViec"
                                        value={key}
                                        checked={formValues?.CongViec?.congviec === key}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="ml-2">{key}</span>
                                </label>
                            ))}
                        </div>
                        {errors?.CongViec && <p className="text-red-500 text-sm mt-2">{errors?.CongViec}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">8. Rủi ro nghề nghiệp <span className="text-red-500">*</span></label>
                        <div>
                            {Object.keys(scoringData.RuiRoNN).map((key) => (
                                <label key={key} className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        name="RuiRoNN"
                                        value={key}
                                        checked={formValues?.RuiRoNN?.ruironn === key}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="ml-2">{key}</span>
                                </label>
                            ))}
                        </div>
                        {errors?.RuiRoNN && <p className="text-red-500 text-sm mt-2">{errors?.RuiRoNN}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">9. Thời gian làm công việc hiện tại (năm) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="ThoiGianLamViec"
                            value={formValues?.ThoiGianLamViec?.thoigianlamviec || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {errors?.ThoiGianLamViec && <p className="text-red-500 text-sm mt-2">{errors?.ThoiGianLamViec}</p>}
                        <p className="text-[10px] italic text-gray-500 mt-2">VD: Dưới 1 năm thì ghi 0</p>
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2">10. Thu nhập ròng hàng tháng <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="ThuNhapRong"
                            value={formValues?.ThuNhapRong?.thunhaprong || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        {errors?.ThuNhapRong && <p className="text-red-500 text-sm mt-2">{errors?.ThuNhapRong}</p>}
                        <p className="text-[10px] italic text-gray-500 mt-2">VD: 10,000,000</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form3;
