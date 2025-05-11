import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';
import Retype from "../../components/retype";
import { Helper } from '../../functionality/helper';
import { apiRoutes, HostImages } from '../../functionality/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { changePopup } from '../../redux/actions/popup';
import Gallery from '../../components/gallery';
import FilterInsideProperty from '../../components/filterInsideProperty';

function PropertyDetails() {
   const { t ,i18n } = useTranslation();
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [ slides, setSlides]  = useState([])
   const [ openBoxGallary, setOpenBoxGallary] = useState(false)
   const bufferToString = (buffer) => {
        return new TextDecoder().decode(new Uint8Array(buffer));
    };  
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const handleNext = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const handlePrev = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
    const [hintAmentities , setHintAmentities] = useState([])
    const [ loading, setLoading] = useState(true)
    const [ dataFromApi, setDataFromApi] = useState(undefined)
    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal
        const getData = async (signal)=>{
            const { response , message } = await Helper({
                url : apiRoutes.property.getOne(id),
                signal,
                method : "GET"
            })
            if(response){
                setSlides([])
                setDataFromApi(response.data)
                response.data.files.forEach(file=>{
                  setSlides(prev=>[...prev,{ id: file._id, image: HostImages+file.path, background: HostImages+file.path }])
                })
                response.data.features.forEach(ele => {
                  let index = 0;
                  for (const child of ele.subFeatures) {
                    if (index < 1) {
                      setHintAmentities(prev => [...prev, child]);
                      index++;
                    } else {
                      break; // Move to the next `ele`
                    }
                  }
                });
                setLoading(false)
            }else{
                console.log(message);
                if(message == "Property not found."){
                  navigate("/destinations")
                }
                if(message == "Something went wrong, please try again."){
                  navigate("/destinations")
                }
                setLoading(false)
                
            }
        }
        window.scrollTo({ top: 0,  behavior: 'smooth' })
        getData(signal)
        return ()=> controller.abort()

    },[id])
    const openPopup = ()=>{
      dispatch(changePopup({
        isOpen : true,
        isForm : false,
        component : <div>
        <h4 className='capitalize pt-5 pb-2'>{t("what-this-place-offers")}</h4>
       <div className='px-2 grid grid-cols-1 sm:grid-cols-2'>
     {
       dataFromApi.features.map((e)=>(<div  key={`Features_Property_${e.id}`}>
         <h5  className='weight-medium'>{i18n.language == "en"? (e.name_en?e.name_en:""):(e.name_ar?e.name_ar:"")}</h5>
         <ul className='py-2'>
             {e.subFeatures.map(child=>(<li className='flex items-center gap-3 mb-2' key={`Title_amenities_${child.id}`}>
               <div dangerouslySetInnerHTML={{__html : bufferToString(child.icon?.data)}}></div>
               <div className=''>{i18n.language == "en" ?(child.name_en?child.name_en:""):(child.name_ar?child.name_ar:"")}</div>
             </li>))}
         </ul>

       </div>))
     }
        </div>
        </div>
      }))
    }
    return (<>
    <Helmet>
      <title>Foreshore | Property Details</title>
    </Helmet>
    { loading || dataFromApi == undefined ?<div className="loading pt-40">
            <div className="bounce"></div>
            <div className="bounce"></div>
            <div className="bounce"></div>
        </div>: <div className='one-property'>
            <div
                className="background-container"
                style={{ backgroundImage: `url(${slides.length>0?slides[currentSlide].background:""})` }}
              >
            <div className="flex justify-center flex-col items-center info-pro">
                <div>
                    <h2 className="capitalize py-3 text-center px-2"><Retype text={i18n.language=="en"?(dataFromApi.name_en?dataFromApi.name_en:""):(dataFromApi.name_ar?dataFromApi.name_ar:"")} /></h2> 
                </div>
                <p className="pb-2">{`${currentSlide+1}/${slides.length}`}</p>
            </div>
            <div style={{direction:"ltr"}} className="slider-container md:h-96 ">
              {slides.map((slide, index) => (<div
                key={slide.id}
                className={`slider-item ${index === currentSlide ? "active" : ""}`}
              >
                <img className='cursor-pointer' onClick={()=>setOpenBoxGallary(true)} src={slide.image ? slide.image : ""} alt={`Slide ${slide.id}`} />
              </div>))}
              <button className="slider-nav left" onClick={handlePrev}>
                &#10094;
              </button>
              <button className="slider-nav right" onClick={handleNext}>
                &#10095;
              </button>
            </div>
          </div>
          <div className="container-cols  py-3 gap-3 px-6 lg:px-10 ">
            <div className="first-col">
              <div className='content-property p-2 md:p-5'>
                <p>
                  ({dataFromApi.guests?dataFromApi.guests:""}) {" "} {t("guest")} , ({dataFromApi.bedrooms?dataFromApi.bedrooms:""})  {" "} {t("bedrooms")} , ({dataFromApi.beds?dataFromApi.beds:""}) {" "} {t("beds")} , ({dataFromApi.bathrooms?dataFromApi.bathrooms:""}) {" "} {t("bathrooms")}
                </p>
                <div className='flex gap-1 pt-3'>
                    {[1,2,3,4,5].map((e)=><div key={`Stars_${e}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <g clipPath="url(#clip0_17_4829)">
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#f59e0b"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_17_4829">
                          <rect width="24" height="24" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>
                    </div>)}
                </div>

                <div className='min-h-40 '>

                <h4 className='capitalize pt-5 pb-2'>{t("about-this-place")}</h4>
                <p className='px-2' dangerouslySetInnerHTML={{__html : i18n.language == "en"? (dataFromApi.description_en?dataFromApi.description_en:""):(dataFromApi.description_ar?dataFromApi.description_ar:"")}}></p>
                
                <h4 className='capitalize pt-5 pb-2'>{t("what-this-place-offers")}</h4>
                <div className='px-2 grid grid-cols-1 sm:grid-cols-2'>
                    {
                          hintAmentities.map((child)=>(<div  key={`Hint_Features_Property_${child.id}`}>
                              <div className='flex items-center gap-3 mb-2 hint' >
                                  <div dangerouslySetInnerHTML={{__html : bufferToString(child.icon?.data)}}></div>
                                  <div className=''>{i18n.language == "en" ?(child.name_en?child.name_en:""):(child.name_ar?child.name_ar:"")}</div>
                                </div>
                          </div>))
                        }
                </div>
                <div className='my-4'>
                  <button onClick={openPopup} className='btn-main p-5 capitalize' >{t("show-all-anemities")}</button>
                </div>

                
                <h4 className='capitalize pt-5 pb-2'> {t("where-you’ll-be")}</h4>
                {<div className='!w-full px-2'>
                    <p className='pb-3'>{dataFromApi.region?dataFromApi.region:""},
                    {" "}{dataFromApi.city?dataFromApi.city:""} , United Arab Emirates
                    </p>
                    <iframe className='!w-full rounded' src={dataFromApi.link_map?dataFromApi.link_map:""} width="600" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>}
                </div>
              </div>
              
            </div>
            <div className='second-col'>
              <FilterInsideProperty link={dataFromApi.rms_link}/>
            </div>
          
            
          </div>
        </div>}
        {openBoxGallary && <Gallery selectedSlide={currentSlide} images={slides} closed={()=>setOpenBoxGallary(false)} />}
    
    </>);
}

export default PropertyDetails;
