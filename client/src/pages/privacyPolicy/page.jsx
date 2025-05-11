import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../home/sections/banner';
import { Helmet } from 'react-helmet-async';

// images 
import image from "../../images/privacy p1350x500.webp"
import small_size from "../../images/privacy 500x500.webp"
import medium_size from "../../images/privacy 700x500.webp"

function PrivacyPolicy() {
    const { t  } = useTranslation();
    const data = [{
        img : window.innerWidth <= 500 ? small_size : (window.innerWidth <=700 ? medium_size: image),
        background_img : window.innerWidth <= 500 ? small_size : (window.innerWidth <=700 ? medium_size: image),
        count : 0,
        title : t("privacy-policy-title"),
        hint :  t("privacy-policy-hint")
      }]
      const dataPolicy = [{
        title : "",
        desc : "policy-desc"
      },{
        title : "policy-title-1",
        desc : "policy-desc-1"
      },{
        title : "policy-title-2",
        desc : "policy-desc-2"
      },{
        title : "policy-title-3",
        desc : "policy-desc-3"
      },{
        title : "policy-title-4",
        desc : "policy-desc-4"
      },{
        title : "policy-title-5",
        desc : "policy-desc-5"
      },{
        title : "policy-title-6",
        desc : "policy-desc-6"
      },{
        title : "policy-title-7",
        desc : "policy-desc-7"
      }]
    useEffect(()=>{ window.scrollTo({ top: 0,  behavior: 'smooth' })},[])
    return ( <div>
            <Helmet>
              <title>Foreshore | Privacy Policy</title>
            </Helmet>
            <Banner data={data}/>
            <div  className=' relative  px-6  lg:px-10'>
                <div className='terms px-5 md:px-10  py-8'>
                    <h2 className='capitalize pb-6 weight-medium'> {t("privacy-policy")}</h2>
                    <div>
                        {dataPolicy.map((e)=>(<div key={`Terms_${t(e.title)}`}>
                                {e.title && <h4 className='pb-2 pt-5 weight-regular'>{t(e.title)}</h4>}
                                <p>{t(e.desc)}</p>
                        </div>))}
                    </div>


                </div>
            </div>
    </div> );
}

export default PrivacyPolicy;