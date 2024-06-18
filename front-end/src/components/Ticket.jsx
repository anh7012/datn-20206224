import CloseIcon from '@mui/icons-material/Close';
function Ticket({content ,deletePermission,idPermission}) {
    return (
        <div className={'justify-between p-2  flex items-center bg-white border-black border relative !min-w-[50px] rounded-xl'}>
            <div className={'pr-4'}><p className={'line-clamp-1'}>{content}</p></div>
            <div className={'absolute text-red-500 top-[0px]  right-[2px]  '} onClick={()=> {
                console.log('>>>',idPermission,content)
                deletePermission(idPermission)
            }}><CloseIcon className={' !text-[16px] hover:scale-125'}/></div>

        </div>
    );
}

export default Ticket;