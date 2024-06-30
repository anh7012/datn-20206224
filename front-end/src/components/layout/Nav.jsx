import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {navRouter} from "../../routes/Permission.jsx";

function Nav() {
    const roleUser = useSelector(state => state.auth.login?.currentUser?.data?.parentPermission);
    console.log(roleUser)
    const [arr, setArr] = useState([]);

    useEffect(() => {
        if (roleUser.includes('danhgiatindung'))
            setArr((e) => {
                return e.includes(navRouter.danhgiatindung) ? e : [
                    ...e,
                    navRouter.danhgiatindung
                ]
            })
        if (roleUser.includes('quanlykhachhang'))
            setArr((e) => {
                return e.includes(navRouter.quanlykhachhang) ? e : [
                    ...e,
                    navRouter.quanlykhachhang
                ]
            })
        if (roleUser.includes('quanlyhopdong'))
            setArr((e) => {
                return e.includes(navRouter.quanlyhopdong) ? e : [
                    ...e,
                    navRouter.quanlyhopdong
                ]
            })
        if (roleUser.includes('quanlynhanvien'))
            setArr((e) => {
                return e.includes(navRouter.quanlynhanvien) ? e : [
                    ...e,
                    navRouter.quanlynhanvien
                ]
            })
        if (roleUser.includes('quanlyhoso'))
            setArr((e) => {
                return e.includes(navRouter.quanlyhoso) ? e : [
                    ...e,
                    navRouter.quanlyhoso
                ]
            })
    }, []);

    return (
        <div>
            <List>
                {arr.map((e, i) => (
                    <Link to={e.path} key={i} style={{textDecoration: 'none', color: 'inherit'}}>
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
