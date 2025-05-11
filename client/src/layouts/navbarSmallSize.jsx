import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';


function MenuNav() {
    const menuRef = useRef()
    const { t, i18n } = useTranslation();
    const userExist = localStorage.getItem("$user")
    const data = [{  name : "destination", link : "/destinations"},
        { name : "list-your-property", link : "/listYourProperty" },
        { name : "about-us", link : "/aboutUs" },
        { name : "contact-us", link : "/contactUs" },
        ... (!userExist ? [{ name : "sign-in", link : "/auth/signIn" } ]: [])

    ]
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();  // Get current location
    const isActive = (link) => {  
        return location.pathname === link ;
    };
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
    return ( <div ref={menuRef} onClick={()=>{setIsOpen(!isOpen)}} className='cursor-pointer md:hidden menu-icon' >
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
        <path d="M2.16669 6C2.16669 5.73478 2.28082 5.48043 2.48399 5.29289C2.68715 5.10536 2.9627 5 3.25002 5H22.75C23.0373 5 23.3129 5.10536 23.5161 5.29289C23.7192 5.48043 23.8334 5.73478 23.8334 6C23.8334 6.26522 23.7192 6.51957 23.5161 6.70711C23.3129 6.89464 23.0373 7 22.75 7H3.25002C2.9627 7 2.68715 6.89464 2.48399 6.70711C2.28082 6.51957 2.16669 6.26522 2.16669 6ZM2.16669 12.032C2.16669 11.7668 2.28082 11.5124 2.48399 11.3249C2.68715 11.1374 2.9627 11.032 3.25002 11.032H22.75C23.0373 11.032 23.3129 11.1374 23.5161 11.3249C23.7192 11.5124 23.8334 11.7668 23.8334 12.032C23.8334 12.2972 23.7192 12.5516 23.5161 12.7391C23.3129 12.9266 23.0373 13.032 22.75 13.032H3.25002C2.9627 13.032 2.68715 12.9266 2.48399 12.7391C2.28082 12.5516 2.16669 12.2972 2.16669 12.032ZM3.25002 17.065C2.9627 17.065 2.68715 17.1704 2.48399 17.3579C2.28082 17.5454 2.16669 17.7998 2.16669 18.065C2.16669 18.3302 2.28082 18.5846 2.48399 18.7721C2.68715 18.9596 2.9627 19.065 3.25002 19.065H22.75C23.0373 19.065 23.3129 18.9596 23.5161 18.7721C23.7192 18.5846 23.8334 18.3302 23.8334 18.065C23.8334 17.7998 23.7192 17.5454 23.5161 17.3579C23.3129 17.1704 23.0373 17.065 22.75 17.065H3.25002Z" fill="white"/>
        </svg> */}
        <div className={`menu-icon-div ${isOpen&&"open"}`}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        <div className={`menu-nav ${isOpen && "open"}`}>
            <div className="px-6  menu-content-nav  lg:px-10 ">
                <ul className={`gap-3  md:flex`}>
                    {
                        data.map((e,index)=>(<li key={`Navbar_${e.name}_${index}`}>
                            <NavLink to={e.link} className={isActive(e.link) ? "weight-semiBold capitalize" : "weight-regular capitalize"}>
                                {t(e.name)}
                            </NavLink>
                        </li>))
                    }
                </ul>
            </div>
        </div>
    </div>);
}

export default MenuNav;