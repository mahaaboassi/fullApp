import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from "../logo.svg"
import logo_light from "../logo_light.svg"
import { Link, NavLink, useLocation } from "react-router-dom";
import Languages from '../components/language';
import MenuNav from './navbarSmallSize';
import Avatar from '../components/avatar';

function Navbar() {
    const { t, i18n } = useTranslation();
    const userExist = localStorage.getItem("$user")
    const data = [{  name : "destination", link : "/destinations"},
        { name : "list-your-property", link : "/listYourProperty" },
        { name : "about-us", link : "/aboutUs" },
        { name : "contact-us", link : "/contactUs" },
        ... (!userExist ? [{ name : "sign-in", link : "/auth/signIn" } ]: [])

    ]
    const location = useLocation();  // Get current location
    const [scrolled, setScrolled] = useState(false);
    const isActive = (link) => {  
        return location.pathname === link ;
    };
    const [ user, setUser ] = useState({})
    const handleScroll = () => {
        if (window.scrollY > 100) { // Change 50 to the scroll position threshold
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
    
      useEffect(() => {
        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
        
      }, []);
    return ( <div className="container-nav py-3 px-6  lg:py-5 lg:px-10 ">
            <div className={`flex justify-between  ${scrolled ? "scrolled-nav":"nav"}`}>
                <div>
                    <Link to='/'><img src={scrolled?logo_light:logo} alt="forshore"/></Link>
                </div>
                <div className='flex items-center'>
                    <MenuNav/>
                    <ul className='  gap-3 hidden md:flex '>
                        {
                            data.map((e,index)=>(<li key={`Navbar_${e.name}_${index}`}>
                                <NavLink to={e.link} className={isActive(e.link) ? `weight-semiBold active ${i18n.language == "ar"? "ar-nav" :"en-nav"}  capitalize` : `weight-regular ${i18n.language == "ar"? "ar-nav" :"en-nav"} not-active capitalize`}>
                                    {t(e.name)}
                                </NavLink>
                            </li>))
                        }
                    </ul>
                    {userExist &&  <Avatar/>}
                    <div className='my-2 line'>
                        
                    </div>
                   
                    
                    <Languages/>
                    
                </div>
                
            </div>
    </div> );
}

export default Navbar;