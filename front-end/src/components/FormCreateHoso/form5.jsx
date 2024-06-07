function Form5() {
    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className={'p-8 w-full'}>
                <h2 className="text-2xl font-semibold mb-12">THÔNG TIN TÀI SẢN ĐẢM BẢO</h2>
                <form className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <div className={'col-span-2 md:col-span-1'}>
                        <label className="block mb-2">Tên tài sản đảm bảo</label>
                        <input type="text" className="w-full p-2 border rounded"
                               placeholder="Nhập tên tài sản đảm bảo"/>
                    </div>
                    <div className={'col-span-2 md:col-span-1'}>
                        <label className="block mb-2">Rủi ro giảm giá tài sản đảm bảo trong 2 năm gần đây</label>
                        <div className="flex flex-col gap-y-2">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="asset_risk" value="0_or_increasing"/>
                                <span className="ml-2">0% hoặc có xu hướng tăng</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="asset_risk" value="1_10"/>
                                <span className="ml-2">1 – 10%</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="asset_risk" value="10_30"/>
                                <span className="ml-2">10 – 30%</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="asset_risk" value="30_50"/>
                                <span className="ml-2">30 – 50%</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="asset_risk" value="over_50"/>
                                <span className="ml-2">&gt; 50%</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2">Loại tài sản đảm bảo</label>
                        <select className="w-full p-2 border rounded">
                            <option>Please Select</option>
                            <option>Tài khoản tiền gửi, giấy tờ có giá do Chính phủ hoặc Ngân hàng phát hành</option>
                            <option>Giấy tờ có giá do tổ chức phát hành (trừ cổ phiếu)</option>
                            <option>Bất động sản (nhà ở)</option>
                            <option>Bất động sản (không phải nhà ở), động sản, cổ phiếu</option>
                            <option>Không có tài sản đảm bảo</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Giá trị tài sản đảm bảo</label>
                        <input type="text" className="w-full p-2 border rounded"
                               placeholder="Nhập giá trị tài sản đảm bảo"/>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Form5;