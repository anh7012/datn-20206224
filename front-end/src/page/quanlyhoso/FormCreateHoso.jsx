import React, {useState} from 'react';
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useNavigate} from 'react-router-dom';
import Form1 from "../../components/FormCreateHoso/form1.jsx";
import Form2 from "../../components/FormCreateHoso/form2.jsx";
import Form3 from "../../components/FormCreateHoso/form3.jsx";
import Form4 from "../../components/FormCreateHoso/form4.jsx";
import Form5 from "../../components/FormCreateHoso/form5.jsx";
import {createHoso, createMHBIDVAndEY, getCatoryKH} from "../../redux/apiRequest.js";
import {useSelector} from "react-redux";
import {notify} from "../../utils/notify.js";
import eventEmitter from "../../utils/eventEmitter.js";

function FormCreateHoso() {
    const theme = useTheme();
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const [activeStep, setActiveStep] = useState(0);
    const [formValues1, setFormValues1] = useState({
        TenLoaiVay: '',
        LoaiTraGoc: '',
        MaKH: '',
        LoaiTraLai: '',
        TongTienVay: '',
        typeTienTra: '',
        LaiSuatVay: '',
        KyHan: ''
    });
    const nav = useNavigate()
    const [formValues2, setFormValues2] = useState({});
    const [typeClient, setTypeClient] = useState();
    const [errors, setErrors] = useState({});

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSave = async () => {
        try {
            const response = await createMHBIDVAndEY(formValues2, accessToken);
            console.log(response)
            notify('success', 'Thêm hồ sơ mới thành công');
           nav('/home/quanlyhoso')
            eventEmitter.emit('createHosoSuccess')

        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const handleNext = async () => {
        if (activeStep === 0) {
            if (!formValues1.MaKH) {
                notify('error', "Mã khách hàng là bắt buộc.");
                return;
            }
            setFormValues1((e)=>{
                return {
                    ...e,
                    typeTienTra: "VND"
                }
            })
            // Gọi API khi ở bước đầu tiên
            try {
                const response = await getCatoryKH({maKH: formValues1.MaKH}, accessToken);
                if (response.data) {
                    setTypeClient(response.data.typeClient);
                } else {
                    notify('error', response.message);
                    return;
                }
            } catch (error) {
                console.error('Error calling API:', error);
            }
        } else if (activeStep === 1) {
            const newErrors = validateForm2(formValues1);
            if (Object.keys(newErrors).length > 0) {
                notify('error', 'Nhập thiếu thông tin, vui lòng kiểm tra lại!');
                setErrors(newErrors);
                return;
            } else {
                setErrors({});
            }
        }
        if (activeStep === 2) {
            const newErrors = validateForm3(formValues1);
            if (Object.keys(newErrors).length > 0) {
                notify('error', 'Nhập thiếu thông tin vui lòng kiểm tra lại!');
                setErrors(newErrors);
                return;
            } else {
                setErrors({});
            }
            try {
                const response = await createHoso(formValues1, accessToken);
                setFormValues2((e)=>{
                   return {
                       ...e,
                       MaHoSo: response.data.maHoSo
                   }
                })
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
        if (activeStep === 3) {
            console.log(formValues2)

        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const validateForm5 = (values) => {
        const errors = {};
        if (!values.TenTaiSanDamBao) errors.TenTaiSanDamBao = "Tên tài sản đảm bảo là bắt buộc";
        if (!values.RuiRoGiamGiaTSDB) errors.RuiRoGiamGiaTSDB = "Rủi ro giảm giá tài sản đảm bảo là bắt buộc";
        if (!values.LoaiTaiSanDamBao) errors.LoaiTaiSanDamBao = "Loại tài sản đảm bảo là bắt buộc";
        if (!values.GiaTriTaiSanDamBao) errors.GiaTriTaiSanDamBao = "Giá trị tài sản đảm bảo là bắt buộc";
        return errors;
    };
    const validateForm2 = (values) => {
        const errors = {};
        if (!values.TenLoaiVay) errors.TenLoaiVay = "Mục đích vay là bắt buộc";
        if (!values.LoaiTraGoc) errors.LoaiTraGoc = "Hình thức trả gốc là bắt buộc";
        if (!values.LoaiTraLai) errors.LoaiTraLai = "Hình thức trả lãi là bắt buộc";
        if (!values.TongTienVay) errors.TongTienVay = "Số tiền vay là bắt buộc";
        if (!values.typeTienTra) errors.typeTienTra = "Loại tiền trả là bắt buộc";
        if (!values.LaiSuatVay) errors.LaiSuatVay = "Lãi suất vay là bắt buộc";
        if (!values.KyHan) errors.KyHan = "Kỳ hạn là bắt buộc";
        return errors;
    };
    const validateForm3 = (values) => {
        const errors = {};
        if (!values.TrinhDoHocVan?.trinhdohocvan) errors.TrinhDoHocVan = "Trình độ học vấn là bắt buộc";
        if (!values.TienAn?.tienan) errors.TienAn = "Thông tin tiền án là bắt buộc";
        if (!values.TinhTrangCuTru?.tinhtrangcutru) errors.TinhTrangCuTru = "Tình trạng cư trú là bắt buộc";
        if (!values.CoCauGD?.cocaugd) errors.CoCauGD = "Cơ cấu gia đình là bắt buộc";
        if (!values.SoNguoiAnTheo?.songuoiantheo) errors.SoNguoiAnTheo = "Số người phụ thuộc là bắt buộc";
        if (!values.BHNhanTho?.bhnhantho) errors.BHNhanTho = "Bảo hiểm nhân thọ là bắt buộc";
        if (!values.CongViec?.congviec) errors.CongViec = "Tính chất công việc là bắt buộc";
        if (!values.RuiRoNN?.ruironn) errors.RuiRoNN = "Rủi ro nghề nghiệp là bắt buộc";
        if (!values.ThoiGianLamViec?.thoigianlamviec) errors.ThoiGianLamViec = "Thời gian làm việc là bắt buộc";
        if (!values.ThuNhapRong?.thunhaprong) errors.ThuNhapRong = "Thu nhập ròng hàng tháng là bắt buộc";
        return errors;
    };
    const validateForm4 = (values) => {
        const errors = {};
        if (!values.MaHoSo) errors.MaHoSo = "Mã hồ sơ là bắt buộc";
        if (!values.TinhHinhTraNoLai) errors.TinhHinhTraNoLai = "Tình hình trả nợ gốc và lãi là bắt buộc";
        if (!values.TinhHinhTraNo) errors.TinhHinhTraNo = "Tình hình trả nợ gốc là bắt buộc";
        if (!values.TinhHinhTraLai) errors.TinhHinhTraLai = "Tình hình trả nợ lãi là bắt buộc";
        if (!values.DanhGiaKNTra) errors.DanhGiaKNTra = "Đánh giá khả năng trả nợ là bắt buộc";
        if (!values.TongTaiSanRong) errors.TongTaiSanRong = "Tổng tài sản ròng là bắt buộc";
        if (!values.LoiNhuanHangThang) errors.LoiNhuanHangThang = "Lợi nhuận hàng tháng là bắt buộc";
        if (!values.DoanhThuHangThang) errors.DoanhThuHangThang = "Doanh thu hàng tháng là bắt buộc";
        if (!values.NguonTraNo) errors.NguonTraNo = "Nguồn trả nợ là bắt buộc";
        return errors;
    };

    const updateFormValues2 = (newValues) => {
        setFormValues2((prevValues) => ({
            ...prevValues,
            ...newValues,
        }));
    };
    const updateFormValues1 = (newValues) => {
        setFormValues1((prevValues) => ({
            ...prevValues,
            ...newValues,
        }));
    };

    const steps = [
        <Form1 key={1} updateFormValues={updateFormValues1} formValues={formValues1}/>,
        <Form2 key={2} typeClient={typeClient} updateFormValues={updateFormValues1} formValues={formValues1}
               errors={errors}/>,
        <Form3 key={3} updateFormValues={updateFormValues1} formValues={formValues1} errors={errors}/>,
        <Form4 key={4} updateFormValues={updateFormValues2} formValues={formValues2}/>,
        <Form5 key={5} updateFormValues={updateFormValues2} formValues={formValues2}/>
    ];

    return (
        <div className={'min-h-[calc(100vh-112px)]'}>
            <Link to={'/home/quanlyhoso'}
                  className={'flex items-center justify-start text-gray-500 hover:text-black mb-2'}>
                <ArrowBackIcon className={'mr-2'}/> <p>Trở về trang quản lý</p>
            </Link>
            <div
                className="max-w-5xl mx-auto bg-white rounded-md shadow-md h-[calc(100vh-145px)] grid grid-rows-[90%,10%]">
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
