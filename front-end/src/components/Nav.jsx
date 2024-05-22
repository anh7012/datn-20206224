import List from "@mui/material/List";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";

function Nav() {
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.user?.roleName)
    const [arr, setArr] = useState(() => {
        if (roleUser === 'Quản trị viên') return [
            {title: 'Đánh giá tín dụng', icon: <AnalyticsIcon/>, path: '/danhgiatindung'},
            {title: 'Quản lý nhân viên', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
            {title: 'Quản lý tài khoản tín dụng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
            {title: 'Quản lý hồ sơ', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
            {title: 'Quản lý hợp đồng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
            {title: 'Danh sách khách hàng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
        ]
        else if (roleUser === 'Nhân viên') return [
            {title: 'Đánh giá tín dụng', icon: <AnalyticsIcon/>, path: '/danhgiatindung'},
            {title: 'Quản lý tài khoản tín dụng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
            {title: 'Quản lý hồ sơ', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
            {title: 'Quản lý hợp đồng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
            {title: 'Danh sách khách hàng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
        ]
        else return [
                {title: 'Đánh giá tín dụng', icon: <AnalyticsIcon/>, path: '/danhgiatindung'},
                {title: 'Quản lý tài khoản tín dụng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
                {title: 'Quản lý hồ sơ', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
                {title: 'Quản lý hợp đồng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
                {title: 'Danh sách khách hàng', icon: <ManageAccountsIcon/>, path: '/quanlynhanvien'},
            ]
    })
    if (roleUser)
        return (
            <div className={''}>
                <List>
                    {
                       arr?.map((e, i) => (
                            <Link to={e.path} key={i}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {e.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={e.title}/>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                </List>
            </div>
        );
}

export default Nav;