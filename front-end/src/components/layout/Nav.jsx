import List from "@mui/material/List";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Nav() {
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.user?.roleName);
    const [arr, setArr] = useState([]);

    useEffect(() => {
        let navItems = [
            { title: 'Đánh giá tín dụng', icon: <AnalyticsIcon />, path: '/home/danhgiatindung' },
            { title: 'Quản lý tài khoản tín dụng', icon: <ManageAccountsIcon />, path: '/home/quanlytaikhoantin' },
            { title: 'Quản lý hồ sơ', icon: <ManageAccountsIcon />, path: '/home/quanlyhoso' },
            { title: 'Quản lý hợp đồng', icon: <ManageAccountsIcon />, path: '/home/quanlyhopdong' },
            { title: 'Danh sách khách hàng', icon: <ManageAccountsIcon />, path: '/home/quanlykhachhang' },
        ];

        if (roleUser === 'Quản trị viên') {
            navItems = [
                ...navItems,
                { title: 'Quản lý nhân viên', icon: <ManageAccountsIcon />, path: '/home/quanlynhanvien' },
            ];
        }

        setArr(navItems);
    }, [roleUser]);

    return (
        <div>
            <List>
                {arr.map((e, i) => (
                    <Link to={e.path} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {e.icon}
                                </ListItemIcon>
                                <ListItemText primary={e.title} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
}

export default Nav;
