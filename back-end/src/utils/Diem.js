const Diem = {
    DiemTyleTienTraTrenTN: async (tyle) => {
        if (tyle < 0.3) {
            return 100;
        } else if (tyle > 0.3 && tyle < 0.45) {
            return 75;
        } else if (tyle > 0.45 && tyle < 0.6) {
            return 50;
        } else if (tyle >= 0.6 && tyle < 0.75) {
            return 25;
        } else {
            return 0;
        }
    },
    DiemTSDBTrenTongNo: async (tyle) => {
        if (tyle > 2) {
            return 100;
        } else if (tyle > 1.5 && tyle < 2) {
            return 75;
        } else if (tyle > 1 && tyle < 1.5) {
            return 50;
        } else if (tyle >= 0.7 && tyle < 1) {
            return 25;
        } else {
            return 0;
        }
    },
    DiemDuNoTrenTSRong: async (duno, taisanrong) => {
        const tyle = (duno / taisanrong).toFixed(2)
        if (tyle == 0) {
            return 100;
        } else if (tyle > 0 && tyle <= 0.2) {
            return 75;
        } else if (tyle > 0.2 && tyle <= 0.4) {
            return 50;
        } else if (tyle >= 0.4 && tyle <= 0.6) {
            return 25;
        } else {
            return 0;
        }
    },
    DiemLoiNhuanTrenTN: async (loinhuan, doanhthu, thunhap) => {
        if (loinhuan === null || doanhthu === null) {
            if (thunhap > 10000000) {
                return 100;
            } else if (thunhap > 5000000 && thunhap <= 10000000) {
                return 75;
            } else if (thunhap > 3000000 && thunhap <= 5000000) {
                return 50;
            } else if (thunhap >= 1000000 && thunhap <= 3000000) {
                return 25;
            } else {
                return 0;
            }
        } else {
            tyle = (loinhuan/doanhthu).toFixed(2)
            if (tyle > 0.25) {
                return 100;
            } else if (tyle > 0.2 && tyle <= 0.25) {
                return 75;
            } else if (tyle > 0.15 && tyle <= 0.2) {
                return 50;
            } else if (tyle >= 0.1 && tyle <= 0.15) {
                return 25;
            } else {
                return 0;
            }
        }
    },
    DiemTienKeHoachTrenNguonTraNo: async (tongtien,nguontrano) => {
        tyle = (tongtien/nguontrano).toFixed(2)
        if (tyle < 0.3) {
            return 100;
        } else if (tyle >= 0.3 && tyle < 0.45) {
            return 75;
        } else if (tyle >= 0.45 && tyle < 0.6) {
            return 50;
        } else if (tyle >= 0.6 && tyle <= 0.75) {
            return 25;
        } else {
            return 0;
        }
    },
    DiemTuoi: async (tuoi) => {
        if (tuoi >= 36 && tuoi <= 55) {
            return 100;
        } else if (tuoi >= 26 && tuoi <= 35) {
            return 75;
        } else if (tuoi >= 56 && tuoi <= 60) {
            return 50;
        } else if (tuoi >= 20 && tuoi <= 25) {
            return 25;
        } else {
            return 0;
        }
    }
}

module.exports = Diem