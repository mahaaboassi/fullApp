import React, { useState, useEffect , useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { changePopup } from '../redux/actions/popup';


function Languages() {
    const [isOpen, setIsOpen] = useState(false)
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    const changeLanguage = (lang) => {
      i18n.changeLanguage(lang);
        dispatch(changePopup({
            isOpen : false ,
            isForm : false ,
            component : <></>     
        })) 
    };
    const menuRef = useRef()
    useEffect(() => {
        const handleClickOutside = (e) => {
            
        if (menuRef.current &&!menuRef.current.contains(e.target)  ) {
            setIsOpen(false);
        }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return ( <div ref={menuRef} className="relative">
        <div onClick={()=>setIsOpen(!isOpen)} className='cursor-pointer global-icon'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clipPath="url(#clip0_536_712)">
            <path d="M11.99 1C6.47 1 2 5.48 2 11C2 16.52 6.47 21 11.99 21C17.52 21 22 16.52 22 11C22 5.48 17.52 1 11.99 1ZM18.92 7H15.97C15.65 5.75 15.19 4.55 14.59 3.44C16.43 4.07 17.96 5.35 18.92 7ZM12 3.04C12.83 4.24 13.48 5.57 13.91 7H10.09C10.52 5.57 11.17 4.24 12 3.04ZM4.26 13C4.1 12.36 4 11.69 4 11C4 10.31 4.1 9.64 4.26 9H7.64C7.56 9.66 7.5 10.32 7.5 11C7.5 11.68 7.56 12.34 7.64 13H4.26ZM5.08 15H8.03C8.35 16.25 8.81 17.45 9.41 18.56C7.57 17.93 6.04 16.66 5.08 15V15ZM8.03 7H5.08C6.04 5.34 7.57 4.07 9.41 3.44C8.81 4.55 8.35 5.75 8.03 7V7ZM12 18.96C11.17 17.76 10.52 16.43 10.09 15H13.91C13.48 16.43 12.83 17.76 12 18.96ZM14.34 13H9.66C9.57 12.34 9.5 11.68 9.5 11C9.5 10.32 9.57 9.65 9.66 9H14.34C14.43 9.65 14.5 10.32 14.5 11C14.5 11.68 14.43 12.34 14.34 13ZM14.59 18.56C15.19 17.45 15.65 16.25 15.97 15H18.92C17.96 16.65 16.43 17.93 14.59 18.56V18.56ZM16.36 13C16.44 12.34 16.5 11.68 16.5 11C16.5 10.32 16.44 9.66 16.36 9H19.74C19.9 9.64 20 10.31 20 11C20 11.69 19.9 12.36 19.74 13H16.36Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_536_712">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
                                
        </div>
        {
            isOpen && <div className={`${i18n.language == "en"?"right-0 ":"left-0"} absolute language-menu top-9 md:top-12 w-40`}>
            <ul>
                <li  onClick={()=>{
                    setIsOpen(false)
                    changeLanguage('ar')
                }} className="flex gap-2 pb-2">
                    <div className="flex items-center">
                        <div><img className="w-7  rounded" src="https://flagcdn.com/w320/ae.png" alt="Arabic" /></div>
                    </div>
                    <div className="flex capitalize items-center">
                        {t("arabic")}
                    </div>
                </li>
                <li onClick={()=>{
                    setIsOpen(false)
                    changeLanguage('en')
                }}  className="flex gap-2">
                    <div className="flex items-center">
                        <div><img className="w-7 rounded" src="https://flagcdn.com/w320/gb.png" alt="English" /></div>
                    </div>
                    <div className="flex capitalize items-center">
                      {t("english")}
                    </div>
                </li>
               
            </ul>
            

        </div>
        }
    </div> );
}

export default Languages;