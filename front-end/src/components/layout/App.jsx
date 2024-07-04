import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/image/logo.jpg'
import {Link, Outlet, useNavigate} from "react-router-dom";
import { Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import Nav from "./Nav.jsx";
import PersonIcon from '@mui/icons-material/Person';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/apiRequest.js";
import ModalInfoUser from "../Modal/ModalInfoUser.jsx";
import {createAxios} from "../../utils/axiosInterceptor.js";


const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'center',
}));

function App() {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [open, setOpen] = React.useState(true);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const user = useSelector((state) => state.auth.login?.currentUser?.data?.user);
    const accessToken = useSelector((state) => state.auth?.login?.currentUser?.data?.accessToken);
    const userData = useSelector((state) => state.auth?.login?.currentUser?.data);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open} className={'!bg-white !shadow-[0px_0px_20px] !shadow-gray-300'}>
                <Toolbar className={'flex items-center justify-between'}>
                    <IconButton
                        aria-label="open drawer"
                        onClick={!open ? handleDrawerOpen : handleDrawerClose}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'flex'}), height: '50px', width: '50px'}}
                        className={'justify-center items-center !text-[#018957]'}

                    >
                        <MenuIcon className={'text-[#018957]'}/>
                    </IconButton>
                    <Box sx={{flexGrow: 0}} className={'!flex justify-center items-center'}>
                        <div className={'text-black flex-col flex items-start justify-end mr-4'}>
                            <div className={'text-[#018957] text-[12px] '}>{user?.roleName}</div>
                            <div className={'text-[14px]'}>{user?.HoTen}</div>
                        </div>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 1}} className={'!bg-[#018957]'}>
                                <PersonIcon className={'scale-150  text-white'}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem>
                                <div><ModalInfoUser/>   </div>
                            </MenuItem>

                            <MenuItem>
                                <div  onClick={async () => {
                                    await logout(accessToken, dispatch, navigator);
                                }}>
                                    <Typography textAlign="start" className={''}>Đăng xuất</Typography>
                                </div>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                className={'!outline-0 !border-0 !bg-red-400'}
            >
                <DrawerHeader>
                    <a href={'/'} className={'flex items-center justify-center hover:cursor-pointer'}>
                        <img src={logo} alt="" className={'h-[50px] ml-[-50px]'}/>
                        <div className={''}>
                            <div className={' text-[#018957]  text-[12px]  uppercase font-bold'}>Hỗ trợ </div>
                            <div className={' text-[#018957]  text-[12px]  uppercase font-bold'}>đánh giá Tín dụng</div>
                        </div>
                    </a>
                </DrawerHeader>
                <Divider/>
                <Nav/>
            </Drawer>
            <Main open={open} className={'!bg-[#F4F4F4]'}>
                <DrawerHeader/>
                <Outlet/>
            </Main>
        </Box>
    );
}

export default App;