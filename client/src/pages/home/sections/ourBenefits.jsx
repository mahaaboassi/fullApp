import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from "../../../components/header";
// Images
import img_1 from "../../../images/services_1.webp"
import img_2 from "../../../images/services_2.webp"
import { useNavigate } from 'react-router-dom';

function OurBenefits() {
    const { t, i18n} = useTranslation()
    const navigate = useNavigate()
    const data = [{
        title: t("benefit-title-1"),
        hint : t("benefit-hint-1"),
        desc : t("benefit-desc-1"),
        btn : t("benefit-btn"),
        link : "/destinations",
        img : img_1
    },{
        title: t("benefit-title-2"),
        hint : t("benefit-hint-2"),
        desc : t("benefit-desc-2"),
        btn : t("partner-with-us-btn"),
        link : "/listYourProperty",
        img : img_2
    }]
    const [offsetY, setOffsetY] = useState(0);
    
    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };
     React.useEffect(() => {
            window.addEventListener("scroll", handleScroll);
            window.scrollTo({ top: 0,  behavior: 'smooth' })
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);
    return ( <div className='benefit md:mt-10'>
        <Header title={t("benefit-title")} description={t("benefit-desc")} />
        <div className='lg:px-10 mt-5'>
            {data.map((e)=>{
                return <div key={`Benefit_${e.title}`} className={`block md:flex mb-5 justify-center items-center ${i18n.language == "en"?"benefit-container":"benefit-container-ar"} md:px-5`}>
                        <div className='container-img'>
                            <img style={{transform: `scale(${1 + offsetY * 0.0003})` }} src={e.img} alt={e.title} />
                        </div>
                        <div className='relative  w-full px-6'>
                            <div className={`${i18n.language == "en"?"benefit-content":"benefit-content-ar"} bg-white w-full px-6  lg:px-10 py-5 px-5 md:px-10 shadow`}>
                                <div className='' >
                                    <h4 className='text-center md:text-start weight-medium capitalize'>{e.title}</h4>
                                    <p className='text-center md:text-start py-3 text-grey'>{e.hint}</p>
                                    <p className='text-center md:text-start text-grey'>{e.desc}</p>
                                    <div className=' pt-3 flex justify-center md:justify-start'>
                                        <button onClick={()=>navigate(e.link)} className='btn-main p-3 '>{e.btn}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                </div>
            })}
          
               
        </div>


    </div> );
}

export default OurBenefits;