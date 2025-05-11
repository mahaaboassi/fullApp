import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../home/sections/banner';

// Images
import image from "../../images/terms.webp"
import small_size from "../../images/contract 500x330.webp"
import medium_size from "../../images/contract 700x330.webp"
import { Helmet } from 'react-helmet-async';


function TermaAndConditions() {
    const { t  } = useTranslation();
    const data = [{
        img : window.innerWidth <= 500 ? small_size : (window.innerWidth <=700 ? medium_size: image),
        background_img : window.innerWidth <= 500 ? small_size : (window.innerWidth <=700 ? medium_size: image),
        count : 0,
        title : t("terms-and-conditions-title"),
        hint :  t("terms-and-conditions-hint")
      }]
      const dataTerms = [{
        title : "terms-title-1",
        options : ["terms-title-1-option-1","terms-title-1-option-2","terms-title-1-option-3"]
      },{
        title : "terms-title-2",
        options : ["terms-title-2-option-1","terms-title-2-option-2","terms-title-2-option-3","terms-title-2-option-4","terms-title-2-option-5"]
      },{
        title : "terms-title-3",
        options : ["terms-title-3-option-1","terms-title-3-option-2","terms-title-3-option-3"]
      },{
        title : "terms-title-4",
        options : ["terms-title-4-option-1"]
      },{
        title : "terms-title-5",
        options : ["terms-title-5-option-1","terms-title-5-option-2"]
      },{
        title : "terms-title-6",
        options : ["terms-title-6-option-1","terms-title-6-option-2","terms-title-6-option-3"]
      },{
        title : "terms-title-7",
        options : ["terms-title-7-option-1"]
      },{
        title : "terms-title-8",
        options : ["terms-title-8-option-1","terms-title-8-option-2"]
      },{
        title : "terms-title-9",
        options : ["terms-title-9-option-1"]
      },{
        title : "terms-title-10",
        options : ["terms-title-10-option-1","terms-title-10-option-2"]
      },{
        title : "terms-title-11",
        options : ["terms-title-11-option-1"]
      },{
        title : "terms-title-12",
        options : ["terms-title-12-option-1","terms-title-12-option-2"]
      },{
        title : "terms-title-13",
        options : ["terms-title-13-option-1"]
      },{
        title : "terms-title-14",
        options : ["terms-title-14-option-1","terms-title-14-option-2"]
      },{
        title : "terms-title-15",
        options : ["terms-title-15-option-1"]
      },{
        title : "terms-title-16",
        options : ["terms-title-16-option-1"]
      },{
        title : "terms-title-17",
        options : ["terms-title-17-option-1","terms-title-17-option-2"]
      },{
        title : "terms-title-18",
        options : ["terms-title-18-option-1","terms-title-18-option-2"]
      },]
    useEffect(()=>{ window.scrollTo({ top: 0,  behavior: 'smooth' })},[])
    return ( <div>
            <Helmet>
              <title>Foreshore | Terms & Conditions</title>
            </Helmet>
            <Banner data={data}/>
            <div  className=' relative  px-6  lg:px-10'>
                <div className='terms px-5 md:px-10  py-8'>
                    <h2 className='capitalize pb-6 weight-medium'> {t("terms-and-conditions")}</h2>
                    <div>
                        {dataTerms.map((e)=>(<div key={`Terms_${t(e.title)}`}>
                                <h4 className='pb-2 pt-5 weight-regular'>{t(e.title)}</h4>
                                <ul className='px-2'>
                                    {e.options.map(ele=>(<li className='flex items-center gap-2' key={`Terms_options_${t(ele)}`}>
                                        <div className='circular'></div>
                                        <div>{t(ele)}</div>
                                    </li>))}
                                </ul>
                        </div>))}
                    </div>


                </div>
            </div>
    </div> );
}

export default TermaAndConditions;