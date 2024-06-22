 export function formatString(str) {
    // Chuyển đổi thành chữ thường
    str = str.toLowerCase();

    // Thay thế các ký tự có dấu bằng ký tự không dấu
    const accents = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'đ': 'd'
    };

    return str.split('').map(char => accents[char] || char).join('');
}


export const format = (name) => {
    return name.replace(/([A-Z])/g, (match) => match.toLowerCase());
};
export const formatStringRevert = (e)=>{
    switch (e) {
        default:
            return null;
        case formatString("Vay mua ô tô"):
            return "Vay mua ô tô";
        case formatString("Vay nhu cầu nhà ở"):
            return "Vay nhu cầu nhà ở";
        case formatString("Vay tiêu dùng không tài sản đảm bảo"):
            return "Vay tiêu dùng không tài sản đảm bảo";
        case formatString("Vay du học"):
            return "Vay du học";
        case formatString("Vay tiêu dùng có tài sản đảm bảo"):
            return "Vay tiêu dùng có tài sản đảm bảo";
        case formatString("Vay sản xuất kinh doanh"):
            return "Vay sản xuất kinh doanh";
        case formatString("Vay cầm cố"):
            return "Vay cầm cố";
        case formatString("Vay đầu tư"):
            return "Vay đầu tư";
        case formatString("Vay thông thường"):
            return "Vay thông thường";

        case 'da thanh toan du':
            return "Đã thanh toán đủ"
        case 'dang hoat dong':
            return "Đang hoạt động"
    }
}
export function getFileNameFromUrl(url) {
     // Tách chuỗi URL bằng dấu /
     const parts = url.split('/');
     // Lấy phần tử cuối cùng trong mảng parts
    // Trả về tên tập tin
     return parts[parts.length - 1];
 }