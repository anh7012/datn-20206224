import React from 'react';
import { formatString } from "../../utils/formatString.js";

function Form2({ updateFormValues, typeClient, formValues, errors }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        updateFormValues({ [name]: value });
    };

    const mappingSelect = () => {
        switch (formValues.LoaiTraGoc) {
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
        <div className="w-full h-full flex items-center flex-col">
            <div className="w-full p-8">
                <h2 className="text-2xl font-semibold mb-2 text-green-800">I. THÔNG TIN KHOẢN VAY</h2>
                <div className="mb-12  pt-8 border-t-[1px] border-black">
                    <label className="block text-gray-700 mb-4">
                        1. Mục đích vay:
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {(typeClient === 'KHCN' ? [
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
                                    checked={formValues.TenLoaiVay === formatString(purpose)}
                                    onChange={handleChange}
                                    className="mr-2 !text-green-300 !border-green-300 focus:!ring-green-300"
                                    required
                                />
                                {purpose}
                            </label>
                        ))}
                    </div>
                    {errors.TenLoaiVay && <p className="text-red-500 text-sm mt-2">{errors.TenLoaiVay}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div>
                        <label className="block text-gray-700 mb-2">
                            2. Trả gốc theo hình thức:
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="LoaiTraGoc"
                            value={formValues.LoaiTraGoc}
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
                        {errors.LoaiTraGoc && <p className="text-red-500 text-sm mt-2">{errors.LoaiTraGoc}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">
                            3. Trả lãi theo hình thức:
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="LoaiTraLai"
                            value={formValues.LoaiTraLai}
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
                        {errors.LoaiTraLai && <p className="text-red-500 text-sm mt-2">{errors.LoaiTraLai}</p>}
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
                            value={formValues.TongTienVay}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.TongTienVay && <p className="text-red-500 text-sm mt-2">{errors.TongTienVay}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">
                            5. Loại tiền trả:
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="typeTienTra"
                            value={formValues.typeTienTra}
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
                        {errors.typeTienTra && <p className="text-red-500 text-sm mt-2">{errors.typeTienTra}</p>}
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
                            value={formValues.LaiSuatVay}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.LaiSuatVay && <p className="text-red-500 text-sm mt-2">{errors.LaiSuatVay}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">
                            7. Kỳ hạn (tháng):
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="KyHan"
                            value={formValues.KyHan}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.KyHan && <p className="text-red-500 text-sm mt-2">{errors.KyHan}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form2;
