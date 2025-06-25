import React from 'react';
import { useTranslation } from 'react-i18next';

import logo_1 from "../../../images/best-quality-service.webp"
import logo_2 from "../../../images/airbnb.webp"
import logo_3 from "../../../images/property-finder.webp"
import logo_4 from "../../../images/customer-satisfaction.webp"
import logo_5 from "../../../images/guest-favorite.webp"
import { Link } from 'react-router-dom';

function Hero({fromHomePage}) {
    const {t, i18n } = useTranslation()
    const data = [{
      name : "Best Quality Service",
      img : logo_1
    },{
      name : "Property finder",
      img : logo_3
    },{
      name : "airbnb",
      img : logo_2
    },{
      name : "Guest Favorite",
      img : logo_5
    },{
      name : "Customer Satisfaction",
      img : logo_4
    }]
    return (<div  className={`relative hero ${fromHomePage?"home-hero":""}`}>
        <div className={`px-2 flex flex-col gap-5 sm:px-5 md:px-7 ${i18n.language == "ar" ? "w-full":"w-full en-dir"} `}>
            <h1 className={`text-main  weight-bold text-center `}>{t("hero-title-home-page")}</h1>
            <h2 className={`text-dark weight-medium m-auto`}>{t("hero-hint-home-page")}</h2>
            <div className='flex justify-center'>
              <Link to={"/listYourProperty"}><button  className='btn-main p-4'>{t("partner-with-us-btn")}</button></Link>
            </div>
            <div className='absolute icons-hero bottom-10 flex justify-center gap-5 sm:gap-10'>
               {data.map((e,idx)=>(<div key={`Icons_Awords_${e.name}_${idx}`}>
                <img  src={e.img} alt={e.name} />
                </div>))}
            </div>
        </div>


    </div>   );
}

export default Hero;


