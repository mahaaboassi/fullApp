import React from 'react';
import { useTranslation } from 'react-i18next';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, EffectFade} from 'swiper/modules';
import BannerSearch from './bannerSearch';



function Banner({children,data, fromHomePage = false}) {
    const {t, i18n } = useTranslation()
    return (<div  className='relative banner'>
            <Swiper
              spaceBetween={30}
              effect={'fade'}
              loop={true}
              autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
              simulateTouch={true} 
              modules={[EffectFade,Autoplay]}
              className="mySwiper"
            >
              {data.map((ele, index)=>(<SwiperSlide key={`Banner_${ele.title}`}>
                <div className='img-hero'>
                  <img className='w-full' src={ele.background_img} alt="banner" />
                  {fromHomePage && <img className='w-full girl' src={ele.img} alt="girl" />}
                  
                </div>

                <div className={`content-hero left-5 lg:left-10 px-2 sm:px-5 md:px-7 ${i18n.language == "ar" ? "arabic-dir":"w-full en-dir"} `}>
                  <h1  className={`text-main capitalize weight-bold `}>{ele.hint}</h1>
                  <h2 className={`text-dark capitalize weight-medium `}>{ele.title}</h2>
                </div>
                  {/* ----------------------------------- Banner search --------------------------------*/}
                {/* <div className={`${fromHomePage ? "content-hero-home": "content-hero"} left-5 lg:left-10 px-2 sm:px-5 md:px-7 `}>
                  <h1 className='text-main  weight-bold'>{ele.hint}</h1>
                  <h2 className='text-dark weight-bold'>{ele.title}</h2>
                </div> */}
              </SwiperSlide>))}
          </Swiper>

        {children}
        {/* ----------------------------------- Banner search --------------------------------*/}
        {/* {window.innerWidth >600 && fromHomePage  && <div className='absolute-banner left-5 lg:left-10 px-2 sm:px-5 md:px-7'>
          <BannerSearch/>
          </div>}
        {window.innerWidth < 600 && fromHomePage &&<div style={{marginTop:"22px"}} className='px-6 lg:px-10'>
           <BannerSearch/>
          </div>} */}

    </div>   );
}

export default Banner;


