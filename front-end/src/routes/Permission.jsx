import AnalyticsIcon from "@mui/icons-material/Analytics.js";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts.js";

export const navRouter = {
    danhgiatindung: {title: 'Đánh giá tín dụng', icon: <AnalyticsIcon/>, path: '/home/danhgiatindung'},
    quanlyhoso: {title: 'Quản lý hồ sơ', icon: <ManageAccountsIcon/>, path: '/home/quanlyhoso'},
    quanlyhopdong: {title: 'Quản lý hợp đồng', icon: <ManageAccountsIcon/>, path: '/home/quanlyhopdong'},
    quanlykhachhang:{title: 'Danh sách khách hàng', icon: <ManageAccountsIcon/>, path: '/home/quanlykhachhang'},
    quanlynhanvien: {title: 'Quản lý nhân viên', icon: <ManageAccountsIcon/>, path: '/home/quanlynhanvien'},
}
