import moment from "moment";

export const formattedNgaySinh =(date)=> date ? moment(date).format('YYYY-MM-DD') : '';