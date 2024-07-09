import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TreemapChart = ({data}) => {
    const chuyenDoi = (e) => {
        switch (e) {
            case 'Cash Withdrawal':
                return 'Rút tiền mặt'
            case 'Remittance to Another Bank':
                return 'Chuyển tiền tới ngân hàng khác'
            case 'Credit in Cash':
                return 'Cho vay tiền mặt'
            case 'Collection from Another Bank':
                return 'Nhận tiền từ ngân hàng khác'
            case 'Credit Card Withdrawal':
                return 'Rút tiền thẻ tín dụng'
            default:
                return 'F'

        }
    }
    const series = [
        {
            data: data?.map(e => ({
                x: chuyenDoi(e.PhuongThuc),
                y: e.SoLuongGiaoDich
            })) || []
        }
    ];

    const options = {
        chart: {
            type: 'treemap',
            toolbar: {
                show: false // Ẩn nút ba gạch (menu)
            }
        },
        title: {
            text: undefined // Ẩn tiêu đề
        },
        plotOptions: {
            treemap: {
                enableShades: true,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 500,
                            color: '#00A100'
                        },
                        {
                            from: 501,
                            to: 5000,
                            color: '#128FD9'
                        },
                        {
                            from: 5001,
                            to: 10000,
                            color: '#FFB200'
                        },
                        {
                            from: 10001,
                            to: 20000,
                            color: '#FF0000'
                        },
                        {
                            from: 20001,
                            to: 50000,
                            color: '#FF4560'
                        }
                    ]
                }
            }
        }
    };

    return (
        <ReactApexChart options={options} series={series} type="treemap" className={'!p-4'}/>
    );
};

export default TreemapChart;
