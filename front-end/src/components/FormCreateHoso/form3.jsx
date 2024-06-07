
function Form3() {
    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className={'p-8 w-full'}>
                <h2 className="text-2xl font-semibold  mb-12">THÔNG TIN NHÂN THÂN</h2>
                <form className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">Trình độ học vấn</label>
                        <select className="w-full p-2 border rounded">
                            <option>Please Select</option>
                            <option>Trên đại học</option>
                            <option>Đại học</option>
                            <option>Cao đẳng</option>
                            <option>Trung học</option>
                            <option>Dưới trung học</option>
                        </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">Đã có tiền án, tiền sự trước đây hay không?</label>
                        <div>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="criminal_record" value="yes"/>
                                <span className="ml-2">Có</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="criminal_record" value="no"/>
                                <span className="ml-2">Không</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">Tình trạng cư trú</label>
                        <select className="w-full p-2 border rounded">
                            <option>Please Select</option>
                            <option>Chủ sở hữu</option>
                            <option>Nhà chung</option>
                            <option>Với gia đình</option>
                            <option>Thuê</option>
                            <option>Khác</option>
                        </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">Cơ cấu gia đình</label>
                        <select className="w-full p-2 border rounded">
                            <option>Please Select</option>
                            <option>Hạt nhân</option>
                            <option>Sống với cha mẹ</option>
                            <option>Sống cùng gia đình khác</option>
                            <option>Khác</option>
                        </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">Số người trực tiếp phụ thuộc vào người vay</label>
                        <input type="text" className="w-full p-2 border rounded"/>
                        <p className="text-[10px] italic text-gray-500 mt-2">VD: 1</p>

                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">Bảo hiểm nhân thọ</label>
                        <input type="text" className="w-full p-2 border rounded"/>
                        <p className="text-[10px] italic text-gray-500 mt-2">VD: 100,000,000</p>

                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2">Tính chất công việc hiện tại</label>
                        <div className={'grid w-full  grid-cols-2'}>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="job_type" value="management"/>
                                <span className="ml-2">Quản lý, điều hành</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="job_type" value="specialized"/>
                                <span className="ml-2">Chuyên môn/Chủ cơ sở</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="job_type" value="trained"/>
                                <span className="ml-2">Lao động được đào tạo nghề</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="job_type" value="unskilled"/>
                                <span className="ml-2">Lao động dịch vụ</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="job_type" value="unemployed"/>
                                <span className="ml-2">Thất nghiệp</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">Rủi ro nghề nghiệp</label>
                        <div>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="job_risk" value="low"/>
                                <span className="ml-2">Thấp</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="job_risk" value="medium"/>
                                <span className="ml-2">Trung bình</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="job_risk" value="high"/>
                                <span className="ml-2">Cao</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block mb-2">Thời gian làm công việc hiện tại (năm)</label>
                        <input type="text" className="w-full p-2 border rounded"/>
                        <p className="text-[10px] italic text-gray-500 mt-2">VD: Dưới 1 năm thì ghi 0</p>

                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2">Thu nhập ròng hàng tháng</label>
                        <input type="text" className="w-full p-2 border rounded"/>
                        <p className="text-[10px] italic text-gray-500 mt-2">VD: 10,000,000</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form3;