import React ,{useState}  from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../home/sections/banner';

// Images
import image from "../../images/about_us.webp"
import small_size from "../../images/info 700x330.webp"
// import small_size from "../../images/about us 500 x330.webp"
import medium_size from "../../images/info 700x330.webp"
import about_1 from "../../images/about (1).webp"
import about_2 from "../../images/about (2).webp"
import { dataFAQ } from '../../data/dataFAQ';
import Accordion from '../../components/accordion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';


function AboutUs() {
    const { t  } = useTranslation();
    const data = [{
      img : window.innerWidth <= 500 ? small_size : (window.innerWidth <=700 ? medium_size: image),
      background_img : window.innerWidth <= 500 ? small_size : (window.innerWidth <=700 ? medium_size: image) ,
      count : 0,
      title : t("about-text-1"),
      hint :  t("about-hint-1")
    }]
    const [offsetY, setOffsetY] = useState(0);
    const navigate = useNavigate()
    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.scrollTo({ top: 0,  behavior: 'smooth' })
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return ( <div className='about'>
        <Helmet>
            <title>Foreshore | About Us</title>
        </Helmet>
        <Banner data={data}  />

        <div className='px-6 md:px-20  lg:px-36 about-content '>
            <h2 className='flex justify-center weight-semiBold py-10'>{t("about-sub-title")}</h2>
            <div className='grid grid-cols-1  lg:grid-cols-2 gap-4'>
                <div  className=' relative root-img '>
                    <img style={{transform: `scale(${1 + offsetY * 0.0002})` }} src={about_1} alt='about-us' />
                </div>
                <div className=''>
                    <p>{t("about-desc-1")}</p>
                    <p className='py-3'>{t("about-desc-2")}</p>
                    <p>{t("about-desc-3")}</p>
                    <div className='pt-3 flex justify-center lg:justify-start'>
                        <button  onClick={()=>navigate("/destinations")} className='btn-main px-4'>{t("benefit-btn")}</button>
                    </div>
                </div>
                

            </div>
            <div className='flex flex-col-reverse grid-cols-1 lg:grid   lg:grid-cols-2 gap-4 py-10 md:py-12 lg:py-20'>
                <div className=''>
                    <p >{t("about-desc-4")}</p>
                    <p className='py-3'>{t("about-desc-5")}</p>
                    <p>{t("about-desc-6")}</p>
                    <div className='pt-3 flex justify-center lg:justify-start'>
                        <button onClick={()=>navigate("/destinations")}  className='btn-main px-4'>{t("benefit-btn")}</button>
                    </div>
                </div>
                <div  className={`relative flex justify-end items-end root-img `}>
                    <img  style={{transform: `scale(${1 + offsetY * 0.0002})` }} src={about_2} alt='about-us' />
                </div>
                

            </div>

        </div>

        <div className='my-10 px-6 md:px-20  lg:px-36'>
          <h2 className='flex justify-center weight-semiBold py-10'>{t("wonder-title")}</h2>
          { dataFAQ.map((e)=>(<Accordion key={`Accordion_About_Us_${e.ques}`} withIcons={true} question={t(e.ques)} answer={t(e.answer)}  />))}

        </div>
    </div> );
}

export default AboutUs;