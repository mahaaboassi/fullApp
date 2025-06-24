import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/header";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Helper } from '../../../functionality/helper';
import { apiRoutes, HostImages } from '../../../functionality/apiRoutes';


const SlidesComponent = ({images,onClick})=>{
    const [ slides, setSlides]  = useState([])
    useEffect(()=>{setSlides(images)},[images])
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
    
    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
    return(<div  style={{direction:"ltr"}} className="slider-container-explore w-full ">
            {slides.map((slide, index) => (<div
                key={slide._id}
                className={`slider-item-explore ${index === currentSlide ? "active" : ""}`}
            >
                <img onClick={onClick} src={HostImages+slide.path} alt={`Slide ${slide._id}`} />
            </div>))}
            <button className="slider-nav-explore left" onClick={handlePrev}>
                &#10094;
            </button>
            <button className="slider-nav-explore right" onClick={handleNext}>
                &#10095;
            </button>
            </div>
            )
}

function ExploreDestination() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
   useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
     //  GET DATA 
     getData(signal)
     // Cleanup observer on component unmount
     return () => {
        controller.abort()
     };
     }, []);
    const [ dataFromApi, setDataFromApi ] = useState(undefined)
    const [ loading, setLoading ] = useState(true)

    const getData = async(signal)=>{
        const { response , message } = await Helper({
            url : apiRoutes.property.getAllProperties,
            method : "GET",
            params :{page : 1 , limit:10},
            signal
        })
        if(response){
            setDataFromApi(response.data)
            setLoading(false)
        }else{
            console.log(message)
            setLoading(false)
        }
        
    }


    return ( <div  className='explore'>
        <Header title={t("explore-title")} description={t("explore-desc")} />
        <div className='flex justify-center pt-4 '>
            <button onClick={()=>navigate("/destinations")} className='btn-main p-3 capitalize'>{t("our-destination")}</button>
        </div>
        {loading || dataFromApi == undefined ?
                <div className="loading min-h-80">
                <div className="bounce"></div>
                <div className="bounce"></div>
                <div className="bounce"></div>
            </div>:<div style={{direction: "ltr"}}>
                    <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination,Navigation]}
                    breakpoints={{
                        320: {
                            slidesPerView:2, // 1 slide for screens 320px and larger
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3, // 2 slides for screens 768px and larger
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
                        {dataFromApi.map((e)=>{
                            if(e.ready == 1){
                                return<SwiperSlide key={`Destination_${e.name_en?e.name_en:""}`}>
                                <div className='flex container-images flex-col items-center'>
                                    {/* <div onClick={()=>navigate(`/property/${e._id}`)}  className={`${isInView&&"animated"} cursor-pointer relative`}>
                                        <img   src={e.files?e.files[0].url:""} alt={e.name_en?e.name_en:""} /> */}
                                        {/* <div className={` flex items-center justify-center continer-div explore-title absolute top-0 left-0 right-0 bottom-0`}>
                                            <h4 className='expolre-title  uppercase'>{e.city?e.city:""},{" "} {e.region?e.region:""}</h4>
                                        </div> */}
                                    {/* </div> */}
                                    <SlidesComponent onClick={()=>navigate(`/property/${e._id}`)} images={e.files} />
                                    <p className='weight-medium text-center max-w-52 mt-2 capitalize' >{i18n.language == "en"?(e.name_en?e.name_en:""):(e.name_ar?e.name_ar:"")}</p>
    
                                </div>
                            </SwiperSlide>
                            }
                        })}
                    </Swiper>
                </div>}
        


    </div> );
}

export default ExploreDestination;