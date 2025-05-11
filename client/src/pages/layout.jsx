import React from 'react';
import { useTranslation } from 'react-i18next';

import { Outlet } from "react-router-dom";
import Footer from "../layouts/footer";
import Navbar from "../layouts/navbar";
import FixedComponent from '../layouts/fixedComponent';

function LayoutPages() {
    const { i18n } = useTranslation()
    return ( <div style={i18n.language == "en"?{direction:"ltr"}:{direction:"rtl"}}>
        <Navbar/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
        <FixedComponent/>
    </div> );
}

export default LayoutPages;