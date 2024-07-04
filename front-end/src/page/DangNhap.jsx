import {
    Button,
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import logo from '../assets/image/logo.jpg';
import {useNavigate} from "react-router-dom";
import {loginUser} from "../redux/apiRequest.js";
import {useDispatch, useSelector} from "react-redux";
import {notify} from "../utils/notify.js";
import eventEmitter from "../utils/eventEmitter.js";

function DangNhap() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // const isLogin = !!useSelector(state => state.auth?.login?.currentUser)

    useEffect(() => {
        // if (isLogin) {
        //     navigate("/home");
        // }
        setLoading(false)
    }, []);


    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const loginHandling = async () => {
        const userDetails = {
            username: userName,
            password: password,
        };
        await loginUser(userDetails, dispatch, navigate);
    };
    useEffect(() => {
        const handleSuccess = () => {
            notify('success', 'Đăng nhập thành công');
        };

        const handleError = (error) => {
            notify('error', error);
        };

        eventEmitter.on('success', handleSuccess);
        eventEmitter.on('error', handleError);

        return () => {
            eventEmitter.off('success', handleSuccess);
            eventEmitter.off('error', handleError);
        };
    }, []);
    if (loading) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center">
                <CircularProgress className="scale-150" />
            </div>
        );
    }
    return (
        <div className="w-full h-[100vh] grid grid-cols-[55%,45%]">
            <div className="flex items-center justify-center flex-col mt-[-100px]">
                <img src={logo} alt="logo" className="h-[300px]"/>
                <div className="mt-[-40px]">
                    <div className="font-bold text-[50px] flex flex-col items-center justify-center">
                        <div className="uppercase">Hệ thống</div>
                        <div className="text-green-700 text-[30px]">Hỗ trợ đánh giá tín dụng</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center flex-col">
                <div className="h-[70%] w-[36vw] shadow-[0px_5px_20px] shadow-gray-300">
                    <div className="px-10 pb-5 rounded-md flex flex-col justify-center items-center">
                        <h1 className="uppercase text-2xl mb-6 font-bold mt-20">Đăng nhập</h1>
                        <TextField
                            label="Tài khoản"
                            className="w-full !my-4 !mt-10"
                            value={userName}
                            onChange={handleUserNameChange}
                        />
                        <FormControl variant="outlined" className="w-full !my-5 !mb-10">
                            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                            <OutlinedInput
                                value={password}
                                onChange={handlePasswordChange}
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu"
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            className="!my-4 !bg-[#008858]"
                            onClick={loginHandling}
                        >
                            Đăng nhập
                        </Button>
                        <div className="flex items-center justify-end w-full mb-6 hover:cursor-pointer">
                            <div
                                className="underline text-md font-medium hover:text-blue-600 mt-6"
                                onClick={() => {
                                    notify('info', 'Thông báo');
                                }}
                            >
                                Quên mật khẩu
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangNhap;
