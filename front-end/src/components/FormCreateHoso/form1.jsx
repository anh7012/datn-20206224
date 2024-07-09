import React from 'react';

function Form1({ updateFormValues, formValues }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        updateFormValues({ [name]: value });
    };

    return (
        <div className={'w-full h-full flex items-center flex-col justify-center'}>
            <div className={'w-[70%] border-[2px] border-black p-10'}>
                <h1 className="text-3xl font-bold mb-10 text-green-800">HỒ SƠ ĐĂNG KÝ VAY</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-lg">
                        Mã khách hàng
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="MaKH"
                        value={formValues.MaKH}
                        onChange={handleChange}
                        className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline focus:outline-green-400"
                        required
                    />
                    <p className="text-[10px] italic text-gray-500 mt-2">Tối đa 11 ký tự bao gồm tiền tố KH</p>
                </div>
            </div>
        </div>
    );
}

export default Form1;
