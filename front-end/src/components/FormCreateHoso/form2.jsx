import {useState} from "react";

function Form2({updateFormValues,typeClient,formValues}) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        updateFormValues({ [name]: value });
    };
    const mappingSelect = ()=>{
        switch (formValues.traGoc) {
            case "Trả gốc đều":
                return [

                ]
        }
    }
    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className={'w-full p-8'}>
                <h2 className="text-2xl font-semibold mb-2 text-green-800">I. THÔNG TIN KHOẢN VAY</h2>
                <div className="mb-12 mt-8 pt-8 border-t-[1px] border-black">
                    <label className="block text-gray-700 mb-4">1. Mục đích vay:</label>
                    <div className="grid grid-cols-2 gap-4">
                        {(typeClient === 'KHCN'?["Vay mua ô tô", "Vay nhu cầu nhà ở", "Vay tiêu dùng không tài sản đảm bảo", "Vay du học", "Vay tiêu dùng có tài sản đảm bảo", "Vay sản xuất kinh doanh", "Vay cầm cố"]:['Vay đầu tư','Vay thông thường']).map((purpose) => (
                            <label key={purpose} className="flex items-center">
                                <input
                                    type="radio"
                                    name="mucDichVay"
                                    value={purpose}
                                    checked={formValues.mucDichVay === purpose}
                                    onChange={handleChange}
                                    className="mr-2 !text-green-300 !border-green-300 focus:!ring-green-300"
                                />
                                {purpose}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div>
                        <label className="block text-gray-700 mb-2">2. Trả gốc theo hình thức:</label>
                        <select
                            name="traGoc"
                            value={formValues.traGoc}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Please Select</option>
                            <option value="Trả gốc đều">Trả gốc đều</option>
                            <option value="Trả gốc và lãi đều từng kỳ">Trả gốc và lãi đều từng kỳ</option>
                            <option value="Trả gốc và lãi khi đáo hạn">Trả gốc và lãi khi đáo hạn</option>
                            <option value="Trả gốc khi đáo hạn">Trả gốc khi đáo hạn</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">3. Trả lãi theo hình thức:</label>
                        <select
                            name="traLai"
                            value={formValues.traLai}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Please Select</option>
                            {
                                formValues.traGoc
                            }
                            {/*<option value="Lãi đơn tính trên số gốc đã trả">Lãi đơn tính trên số gốc đã trả</option>*/}
                            {/*<option value="Lãi tích hợp tính trên số gốc đã trả">Lãi tích hợp tính trên số gốc đã*/}
                            {/*    trả*/}
                            {/*</option>*/}
                            {/*<option value="Lãi tính trên số dư gốc còn lại">Lãi tính trên số dư gốc còn lại</option>*/}
                            {/*<option value="Trả gốc và lãi đều từng kỳ">Trả gốc và lãi đều từng kỳ</option>*/}
                            {/*<option value="Lãi đơn">Lãi đơn</option>*/}
                            {/*<option value="Lãi nhập gốc">Lãi nhập gốc</option>*/}
                            {/*<option value="Trả lãi đầu kỳ">Trả lãi đầu kỳ</option>*/}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div>
                        <label className="block text-gray-700 mb-2">3. Số tiền vay:</label>
                        <input
                            type="number"
                            name="soTienVay"
                            value={formValues.soTienVay}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">4. Loại tiền trả:</label>
                        <select
                            name="loaiTienTra"
                            value={formValues.loaiTienTra}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Please Select</option>
                            <option value="USD - Đô la Mỹ">USD - Đô la Mỹ</option>
                            <option value="EUR - Euro">EUR - Euro</option>
                            <option value="JPY - Yên Nhật">JPY - Yên Nhật</option>
                            <option value="GBP - Bảng Anh">GBP - Bảng Anh</option>
                            <option value="CAD - Đô la Canada">CAD - Đô la Canada</option>
                            <option value="CHF - Franc Thụy Sĩ">CHF - Franc Thụy Sĩ</option>
                            <option value="CNY - Nhân dân tệ Trung Quốc">CNY - Nhân dân tệ Trung Quốc</option>
                            <option value="AUD - Đô la Úc">AUD - Đô la Úc</option>
                            <option value="NZD - Đô la New Zealand">NZD - Đô la New Zealand</option>
                            <option value="KRW - Won Hàn Quốc">KRW - Won Hàn Quốc</option>
                            <option value="VND - Đồng Việt Nam">VND - Đồng Việt Nam</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div>
                        <label className="block text-gray-700 mb-2">5. Lãi suất vay (%/năm):</label>
                        <input
                            type="number"
                            name="laiSuat"
                            value={formValues.laiSuat}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">6. Kỳ hạn (tháng):</label>
                        <input
                            type="number"
                            name="kyHan"
                            value={formValues.kyHan}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form2;