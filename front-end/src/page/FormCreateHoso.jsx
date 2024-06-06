import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

function FormCreateHoso() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({
        maKhachHang: '',
        mucDichVay: '',
        traGoc: '',
        traLai: '',
        soTienVay: '',
        loaiTienTra: '',
        laiSuat: '',
        kyHan: ''
    });

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSave = () => {
        // Add your save logic here
        console.log('Form values:', formValues);
    };

    const steps = [
        <div key={1} className={'w-full h-full flex items-center flex-col justify-center'}>
            <div className={'w-[60%]'}>
                <h1 className="text-3xl font-bold mb-20">HỒ SƠ ĐĂNG KÝ VAY</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Mã khách hàng</label>
                    <input
                        type="text"
                        name="maKhachHang"
                        value={formValues.maKhachHang}
                        onChange={handleChange}
                        className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline focus:outline-green-400"
                    />
                    <p className="text-[10px] italic text-gray-500 mt-2">Tối đa 11 ký tự bao gồm tiền tố 'KH'</p>
                </div>
            </div>
        </div>,
        <div key={2} className="w-full h-full flex items-center flex-col" >
            <div className={'w-full p-8'}>
                <h2 className="text-2xl font-semibold mb-12">THÔNG TIN KHOẢN VAY</h2>
                <div className="mb-12">
                    <label className="block text-gray-700 mb-4">Mục đích vay</label>
                    <div className="grid grid-cols-2 gap-4">
                        {["Vay mua ô tô", "Vay nhu cầu nhà ở", "Vay tiêu dùng không tài sản đảm bảo", "Vay du học", "Vay tiêu dùng có tài sản đảm bảo", "Vay sản xuất kinh doanh", "Vay cầm cố"].map((purpose) => (
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
                        <label className="block text-gray-700 mb-2">Trả gốc theo hình thức</label>
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
                        <label className="block text-gray-700 mb-2">Trả lãi theo hình thức</label>
                        <select
                            name="traLai"
                            value={formValues.traLai}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Please Select</option>
                            <option value="Lãi đơn tính trên số gốc đã trả">Lãi đơn tính trên số gốc đã trả</option>
                            <option value="Lãi tích hợp tính trên số gốc đã trả">Lãi tích hợp tính trên số gốc đã trả
                            </option>
                            <option value="Lãi tính trên số dư gốc còn lại">Lãi tính trên số dư gốc còn lại</option>
                            <option value="Trả gốc và lãi đều từng kỳ">Trả gốc và lãi đều từng kỳ</option>
                            <option value="Lãi đơn">Lãi đơn</option>
                            <option value="Lãi nhập gốc">Lãi nhập gốc</option>
                            <option value="Trả lãi đầu kỳ">Trả lãi đầu kỳ</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div>
                        <label className="block text-gray-700 mb-2">Số tiền vay</label>
                        <input
                            type="number"
                            name="soTienVay"
                            value={formValues.soTienVay}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Loại tiền trả</label>
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
                        <label className="block text-gray-700 mb-2">Lãi suất vay (%/năm)</label>
                        <input
                            type="number"
                            name="laiSuat"
                            value={formValues.laiSuat}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Kỳ hạn (tháng)</label>
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
        </div>,
        <div key={3} className="w-full h-full flex items-center flex-col">
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
        </div>,
        <div  key={4} className="w-full h-full flex items-center flex-col">
            <div className={'p-8 w-full'}>
                    <h2 className="text-2xl font-semibold mb-12">THÔNG TIN LIÊN QUAN KHẢ NĂNG TRẢ NỢ CỦA KHÁCH HÀNG</h2>
                    <form className="space-y-8">
                        <div>
                            <label className="block mb-2">Mã hồ sơ</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Tối đa 10 kí tự bao gồm tiền tố 'HS'" />
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
                                    <input type="radio" className="form-radio" name="debt_repayment" value="good" />
                                    <span className="ml-2">Có khả năng trả nợ</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input type="radio" className="form-radio" name="debt_repayment" value="possible" />
                                    <span className="ml-2">Có thể trả nợ</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input type="radio" className="form-radio" name="debt_repayment" value="no" />
                                    <span className="ml-2">Không có khả năng trả nợ</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2">Tổng tài sản ròng</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Nhập tổng tài sản ròng" />
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
                            <input type="text" className="w-full p-2 border rounded" placeholder="Nhập lợi nhuận hàng tháng" />
                        </div>
                        <div>
                            <label className="block mb-2">Doanh thu hàng tháng (Nếu có)</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Nhập doanh thu hàng tháng" />
                        </div>
                        <div>
                            <label className="block mb-2">Nguồn trả nợ (Nếu có)</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Nhập nguồn trả nợ" />
                        </div>
                    </form>
            </div>
        </div>,
        <div key={5} className="w-full h-full flex items-center flex-col">
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
    ];

    return (
        <div className={'min-h-[calc(100vh-112px)]'}>
            <Link to={'/home/quanlyhoso'}
                  className={'flex items-center justify-start text-gray-500 hover:text-black mb-2'}>
                <ArrowBackIcon className={'mr-2'}/> <p>Trở về trang quản lý</p>
            </Link>
            <div
                className="max-w-4xl mx-auto bg-white rounded-md shadow-md h-[calc(100vh-145px)] grid grid-rows-[90%,10%]  ">
                <div className={'flex overflow-scroll scroll-no'}>{steps[activeStep]}</div>
                <div>
                    <MobileStepper
                        variant="progress"
                        steps={steps.length}
                        position="static"
                        color={'success'}
                        activeStep={activeStep}
                        nextButton={
                            activeStep === steps.length - 1 ? (
                                <Button size="small" onClick={handleSave}>
                                    Lưu
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft/>
                                    ) : (
                                        <KeyboardArrowRight/>
                                    )}
                                </Button>
                            ) : (
                                <Button size="small" onClick={handleNext}>
                                    Tiếp theo
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft/>
                                    ) : (
                                        <KeyboardArrowRight/>
                                    )}
                                </Button>
                            )
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight/>
                                ) : (
                                    <KeyboardArrowLeft/>
                                )}
                                Trở lại
                            </Button>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default FormCreateHoso;
