import React, {useState} from 'react';
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom';
import Form1 from "../components/FormCreateHoso/form1.jsx";
import Form2 from "../components/FormCreateHoso/form2.jsx";
import Form3 from "../components/FormCreateHoso/form3.jsx";
import Form4 from "../components/FormCreateHoso/form4.jsx";
import Form5 from "../components/FormCreateHoso/form5.jsx";
import {getCatoryKH} from "../redux/apiRequest.js";
import {useSelector} from "react-redux";

function FormCreateHoso() {
    const theme = useTheme();
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({
        mucDichVay:'',
        traGoc:'',
        maKhachHang:'',
        traLai:'',
        soTienVay:'',
        loaiTienTra:'',
        laiSuat:'',
        kyHan:''
    });
    const [typeClient,setTypeClient] = useState()

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSave = () => {
        // Add your save logic here
    };
    const handleNext = async () => {
        if (activeStep === 0) {
            // Gọi API khi ở bước đầu tiên
            try {
                console.log(formValues.maKhachHang)
                const response = await getCatoryKH({maKhachHang: formValues.maKhachHang},accessToken)
                setTypeClient(response.data.typeClient)
            } catch (error) {
                console.error('Error calling API:', error);
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const updateFormValues = (newValues) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            ...newValues,
        }));
    };
    const steps = [
        <Form1 key={1} updateFormValues={updateFormValues} formValues={formValues}/>,
        <Form2 key={2} typeClient={typeClient} updateFormValues={updateFormValues} formValues={formValues}/>,
        // <Form3 key={3}/>,
        // <Form4 key={4}/>,
        <Form5 key={5}/>
    ];


    return (
        <div className={'min-h-[calc(100vh-112px)]'}>
            <Link to={'/home/quanlyhoso'}
                  className={'flex items-center justify-start text-gray-500 hover:text-black mb-2'}>
                <ArrowBackIcon className={'mr-2'}/> <p>Trở về trang quản lý</p>
            </Link>
            <div
                className="max-w-5xl mx-auto bg-white rounded-md shadow-md h-[calc(100vh-145px)] grid grid-rows-[90%,10%]  ">
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
