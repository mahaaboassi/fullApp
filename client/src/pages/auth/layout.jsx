import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from "react-router-dom";

function LayoutAuth() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const [currentPath, setCurrentPath] = useState('');
    useEffect(()=>{
        const pathParts = location.pathname.split('/'); // Splits path by "/"
        const signInPart = pathParts[2]; // This will be "sign-in"
        setCurrentPath(signInPart);
    },[location])
    return ( <div className="pt-24 md:pt-32 auth flex justify-center">
        <div className="auth-first hidden lg:flex">
            <div className="auth-img flex flex-col justify-center items-center">
                <h1 className='uppercase weight-bold'>{currentPath == "signIn" ? t("sign-in"): t("sign-up")}</h1>
                <p className='capitalize weight-semiBold'>{t("welcome-auth")}</p>
            </div>
        </div>
        <div className={` ${i18n.language == "en" ? "auth-second-en":"auth-second-ar"} p-3 md:p-6`}>
            <Outlet/>
        </div>
    </div> );
}

export default LayoutAuth;