
function Form4() {
    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className={'p-8 w-full'}>
                <h2 className="text-2xl font-semibold mb-12">THÔNG TIN LIÊN QUAN KHẢ NĂNG TRẢ NỢ CỦA KHÁCH HÀNG</h2>
                <form className="space-y-8">
                    <div>
                        <label className="block mb-2">Mã hồ sơ</label>
                        <input type="text" className="w-full p-2 border rounded"
                               placeholder="Tối đa 10 kí tự bao gồm tiền tố 'HS'"/>
                    </div>
                    <div>
                        <label className="block mb-2">Tình hình trả nợ gốc và lãi</label>
                        <select className="w-full p-2 border rounded">
                            <option>Please Select</option>
                            <option>Luôn trả nợ đúng hạn</option>
                            <option>Đã bị gia hạn nợ, hiện trả nợ tốt</option>
                            <option>Đã có nợ quá hạn/Khách hàng mới</option>
                            <option>Đã có nợ quá hạn, khả năng trả nợ không ổn định</option>
                            <option>Hiện đang có nợ quá hạn</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Tình hình trả nợ gốc</label>
                        <select className="w-full p-2 border rounded">
                            <option>Please Select</option>
                            <option>Luôn trả nợ đúng hạn</option>
                            <option>Đã có gia hạn trả nợ</option>
                            <option>Đã có nợ quá hạn, hiện trả nợ tốt/khách hàng mới</option>
                            <option>Đã có nợ quá hạn, khả năng trả nợ không ổn định</option>
                            <option>Hiện đang có nợ quá hạn</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Đánh giá khả năng trả nợ</label>
                        <div>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="debt_repayment" value="good"/>
                                <span className="ml-2">Có khả năng trả nợ</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="debt_repayment" value="possible"/>
                                <span className="ml-2">Có thể trả nợ</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="debt_repayment" value="no"/>
                                <span className="ml-2">Không có khả năng trả nợ</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2">Tổng tài sản ròng</label>
                        <input type="text" className="w-full p-2 border rounded" placeholder="Nhập tổng tài sản ròng"/>
                    </div>
                    <div>
                        <label className="block mb-2">Danh sách tài khoản tín dụng của khách hàng</label>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border rounded">
                                <thead>
                                <tr>
                                    <th className="border px-4 py-2">Mã khách hàng</th>
                                    <th className="border px-4 py-2">Số tài khoản</th>
                                    <th className="border px-4 py-2">Loại tài khoản</th>
                                    <th className="border px-4 py-2">Số dư</th>
                                    <th className="border px-4 py-2">Trạng thái tài khoản</th>
                                    <th className="border px-4 py-2">Lãi suất</th>
                                    <th className="border px-4 py-2">Ngày đáo hạn</th>
                                    <th className="border px-4 py-2">Kỳ hạn</th>
                                    <th className="border px-4 py-2">Ngày hiệu lực</th>
                                    <th className="border px-4 py-2">Ngày kết thúc</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border px-4 py-2">Val1</td>
                                    <td className="border px-4 py-2">Val2</td>
                                    <td className="border px-4 py-2">Val3</td>
                                    <td className="border px-4 py-2">Val4</td>
                                    <td className="border px-4 py-2">Val5</td>
                                    <td className="border px-4 py-2">Val6</td>
                                    <td className="border px-4 py-2">Val7</td>
                                    <td className="border px-4 py-2">Val8</td>
                                    <td className="border px-4 py-2">Val9</td>
                                    <td className="border px-4 py-2">Val10</td>
                                </tr>
                                {/* Add more rows as needed */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2">Lợi nhuận hàng tháng (Nếu có)</label>
                        <input type="text" className="w-full p-2 border rounded"
                               placeholder="Nhập lợi nhuận hàng tháng"/>
                    </div>
                    <div>
                        <label className="block mb-2">Doanh thu hàng tháng (Nếu có)</label>
                        <input type="text" className="w-full p-2 border rounded"
                               placeholder="Nhập doanh thu hàng tháng"/>
                    </div>
                    <div>
                        <label className="block mb-2">Nguồn trả nợ (Nếu có)</label>
                        <input type="text" className="w-full p-2 border rounded" placeholder="Nhập nguồn trả nợ"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form4;