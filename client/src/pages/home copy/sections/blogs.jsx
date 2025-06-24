import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/header";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import { blogsData } from '../../../data/blogData';


function Blog() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()

    return ( <div className='blog'>
        <Header title={t("blog-title")} description={t("blog-desc")} />
        <div style={{direction: "ltr"}}>
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            simulateTouch={true} 
            modules={[Autoplay,Navigation]}
            breakpoints={{
                320: {
                    slidesPerView:2, // 1 slide for screens 320px and larger
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2, // 2 slides for screens 768px and larger
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 4, // 3 slides for screens 1024px and larger
                    spaceBetween: 20,
                },
            }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
                {blogsData.map((e,i)=>(<SwiperSlide key={`Blog_${e.title_en}_${i}`}>
                    <div className='flex flex-col items-center max-w-96'>
                        <div className='content-blog '>
                            <div className='flex justify-center'>
                                <img className='w-full object-cover h-32 sm:h-40 md:h-52 '  src={e.image} alt={e.title_en} />
                            </div>
                            <h5 style={i18n.language=="ar"?{direction:"rtl"}:{direction:"ltr"}}  className='weight-blod capitalize py-3 flex min-h-16 sm:min-h-14 md:min-h-20 items-center '>
                                {window.innerWidth<400?i18n.language == "en"?e.title_en:e.title_ar
                                :i18n.language == "en"?e.title_en:e.title_ar}
                            </h5>
                            <div >
                                <button onClick={()=>navigate(`/blog/${e.id}`)} className='btn-main !w-full capitalize  button-mark'>
                                    {i18n.language=="ar" && <span className='px-2 flex items-center'>&lt;</span>}
                                    {t("see-more")} {i18n.language=="en" && <span className='px-2 flex items-center'>&gt;</span>}
                                </button>
                                {/* <div  className='button-mark'><span className='px-2 flex items-center'>&gt;</span></div> */}
                            </div>
                        </div>
                    </div>
                </SwiperSlide>))}
            </Swiper>
        </div>


    </div> );
}

export default Blog;