const tinhGocLaiTBTheoThang = async ({tongtientra, laisuatvay, kyhan, loaitragoc, loaitralai}) => {
    let tongLai = 0;
    let laisuatthang = laisuatvay / 12 / 100;
    let TBthang;
    let tonggoclaitra;

    if (loaitragoc === 'tra goc deu') {
        const soTienThanhToan = tongtientra / kyhan;
        let soTienDaTra = 0;

        if (loaitralai === 'lai tren du goc con lai') {
            let duGocConLai = tongtientra;
            for (let i = 0; i < kyhan; i++) {
                let laiThang = duGocConLai * laisuatthang;
                duGocConLai -= soTienThanhToan;
                tongLai += laiThang;
            }
            TBthang = (soTienThanhToan + (tongLai / kyhan)).toFixed(0);
        } else if (loaitralai === 'lai don') {
            for (let i = 0; i < kyhan; i++) {
                soTienDaTra += soTienThanhToan;
                let laiThang = soTienDaTra * laisuatthang;
                tongLai += laiThang;
            }
            TBthang = (soTienThanhToan + (tongLai / kyhan)).toFixed(0);
        } else {
            for (let i = 0; i < kyhan; i++) {
                soTienDaTra += soTienThanhToan;
                let laiThang = (soTienDaTra + tongLai) * laisuatthang;
                tongLai += laiThang;
            }
            TBthang = (soTienThanhToan + (tongLai / kyhan)).toFixed(0);
        }
        tonggoclaitra = parseFloat(tongtientra) + parseFloat(tongLai);
    } else if (loaitragoc === 'tra goc lai deu') {
        TBthang = ((tongtientra * laisuatthang * Math.pow(1 + laisuatthang, kyhan)) / (Math.pow(1 + laisuatthang, kyhan) - 1)).toFixed(0);
        tonggoclaitra = TBthang * kyhan;
    } else if (loaitragoc === 'tra goc lai khi dao han' && loaitralai === 'lai nhap goc') {
        let duGocConLai = tongtientra;
        for (let i = 0; i < kyhan; i++) {
            let laiThang = duGocConLai * laisuatthang;
            duGocConLai += laiThang;
            tongLai += laiThang;
        }
        const soDuCuoiKy = duGocConLai - tongLai;
        tonggoclaitra = soDuCuoiKy + tongLai;
        TBthang = (tonggoclaitra / kyhan).toFixed(0);
    } else {
        tongLai = tongtientra * kyhan * laisuatthang;
        TBthang = ((parseFloat(tongtientra) + tongLai) / kyhan).toFixed(0);
    }

    return { TBthang, tonggoclaitra };
};

module.exports = { tinhGocLaiTBTheoThang };
