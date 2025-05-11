import React, { useRef, useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
    
function Avatar() {
    const user = JSON.parse(localStorage.getItem("$user"))
    const { t, i18n } = useTranslation()
    const [ isOpen , setIsOpen ] = useState(false)
    const menuRef = useRef()
    const navigate = useNavigate()
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
    return ( <div ref={menuRef} className={`container-avatar relative  ${i18n.language=="en"?"pl-2":"pr-2"}`}>
        <div onClick={()=>setIsOpen(true)} className="avatar uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <defs>
                <style>
                    {`.cls-1 { fill: #fff; opacity: 0; } .cls-2 { fill:rgb(255, 255, 255); }`}
                </style>
                </defs>
                <title>person</title>
                <g id="Layer_2" data-name="Layer 2">
                <g id="person">
                    <g id="person-2" data-name="person">
                    <rect className="cls-1" width="24" height="24" />
                    <path className="cls-2" d="M12,11A4,4,0,1,0,8,7,4,4,0,0,0,12,11Z" />
                    <path className="cls-2" d="M18,21a1,1,0,0,0,1-1A7,7,0,0,0,5,20a1,1,0,0,0,1,1Z" />
                    </g>
                </g>
                </g>
            </svg>
        </div>
        {
            isOpen && <div className={`${i18n.language == "en"?"right-0 ":"left-0"} absolute language-menu top-9 md:top-12 w-40`}>
            <ul>
                <li  onClick={()=>{
                    setIsOpen(false)
                }} className="flex justify-center gap-2 pb-2">
                    <div className="flex weight-medium  capitalize items-center">
                        {user.name} 
                    </div>
                </li>
                <li>
                    <div style={{background:"#27cbbe", width:"100%",height:"1px"}}></div>
                </li>
                <li onClick={()=>{
                    setIsOpen(false)
                    navigate("/properties")
                }}  className="flex !py-1 gap-2">
                    <div className="flex capitalize items-center">
                      {t("my-properties")}
                    </div>
                </li>
                
                <li onClick={()=>{
                    setIsOpen(false)
                    localStorage.removeItem("$user")
                    localStorage.removeItem("$-TOKEN")
                    window.location.reload()
                }}  className="flex gap-2">
                    <div className="flex capitalize items-center">
                      {t("logout")}
                    </div>
                </li>
            </ul>
            

        </div>
        }
        
    </div> );
}

export default Avatar;