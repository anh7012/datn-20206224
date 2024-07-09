import React from 'react';
import { calculateScore } from "../../utils/calculateScore.js";
import {scoringData} from "../../redux/data/scoringData.js";

function Form5({ updateFormValues, formValues, errors }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        const scoredValue = calculateScore(name, value);
        updateFormValues(scoredValue);
    };
    const handleChange2 = (event) => {
        const { name, value } = event.target;
        updateFormValues({ [name]: value });
    };

    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className={'p-8 w-full'}>
                <h2 className="text-2xl font-semibold mb-2 text-green-800">IV. THÔNG TIN TÀI SẢN ĐẢM BẢO</h2>
                <form className="grid grid-cols-2 gap-x-8 gap-y-8 pt-8 border-t-[1px] border-black">
                    <div className={'col-span-2 md:col-span-1'}>
                        <label className="block mb-2">1. Tên tài sản đảm bảo <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            name="TenTSDB"
                            onChange={handleChange2}
                            value={formValues?.TenTSDB || ''}
                            placeholder="Nhập tên tài sản đảm bảo"
                            required
                        />
                        {errors?.TenTSDB && <p className="text-red-500 text-sm mt-2">{errors?.TenTSDB}</p>}
                    </div>
                    <div className={'col-span-2 md:col-span-1'}>
                        <label className="block mb-2">2. Rủi ro giảm giá tài sản đảm bảo trong 2 năm gần đây <span className="text-red-500">*</span></label>
                        <div className="flex flex-col gap-y-2">
                            {Object.keys(scoringData.RuiRoGiamGiaTSDB).map((key) => (
                                <label key={key} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        name="RuiRoGiamGiaTSDB"
                                        value={key}
                                        checked={formValues?.RuiRoGiamGiaTSDB?.ruirogiamgiatsdb === key}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="ml-2">{key}</span>
                                </label>
                            ))}
                        </div>
                        {errors?.RuiRoGiamGiaTSDB && <p className="text-red-500 text-sm mt-2">{errors?.RuiRoGiamGiaTSDB}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">3. Loại tài sản đảm bảo <span className="text-red-500">*</span></label>
                        <select
                            className="w-full p-2 border rounded"
                            name="LoaiTSDB"
                            value={formValues?.LoaiTSDB?.loaitsdb || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Please Select</option>
                            {Object.keys(scoringData.LoaiTSDB).map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors?.LoaiTSDB && <p className="text-red-500 text-sm mt-2">{errors?.LoaiTSDB}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">4. Giá trị tài sản đảm bảo <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            name="GiaTriTSDB"
                            onChange={handleChange2}
                            value={formValues?.GiaTriTSDB || ''}
                            placeholder="Nhập giá trị tài sản đảm bảo"
                            required
                        />
                        {errors?.GiaTriTSDB && <p className="text-red-500 text-sm mt-2">{errors?.GiaTriTSDB}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form5;
