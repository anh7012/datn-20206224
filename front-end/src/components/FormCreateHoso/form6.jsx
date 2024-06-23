import FileUpload from "../UpLoadFile.jsx";

function Form6({id}) {
    return (
        <div className="w-full h-full flex items-center flex-col">
            <div className={'px-8 w-full pt-8'}>
                <h2 className="text-2xl font-semibold mb-2 text-green-800">V. TẢI LÊN HỒ SƠ GỐC</h2>
                <div className={'mt-8 border-t-[1px] border-black'}>
                    <FileUpload id={id} hiddent={true}/>

                </div>
            </div>
        </div>

)
    ;
}

export default Form6;