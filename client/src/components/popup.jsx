import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePopup } from "../redux/actions/popup";

const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_17_1174)">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
                    </g>
                    <defs>  
                    <clipPath id="clip0_17_1174">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>

function PopupComponent() {
    const openPopupRedux = useSelector( state => state.popup)
    const dispatch = useDispatch()
    const [ open, setOpen ] = useState(false)
    useEffect(()=>{
        setOpen(openPopupRedux.isOpen)
    },[openPopupRedux])

    return ( open && <div style={openPopupRedux.isForm ? {}:{height:window.innerHeight-100}} className={`${openPopupRedux.isForm?"alert-card-form p-5":"alert-card div-scroll"} `}>
        <div>
        <div className="flex justify-end">
                <div onClick={()=>dispatch(changePopup({
                    isOpen:false,
                    component : <></>,
                    isForm : false
                    }))} className="icon-close-chat">
                {closeIcon}
                </div>
                


            </div>
            <div>
                {  openPopupRedux.component   }
            </div>
        </div>
            
    </div> );
}

export default PopupComponent;