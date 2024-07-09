import moment from "moment";

export const formattedNgaySinh =(date)=> date ? moment(date).format('YYYY-MM-DD') : '';
export const formattedDate =(date)=> date ? moment(date).format('MM-DD-YYYY') : '';