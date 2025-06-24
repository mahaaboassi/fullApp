import React, { useRef, useState , useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import img from "../../../images/bg.webp"
import Retype from '../../../components/retype';
import { useNavigate } from 'react-router-dom';


function Getaway() {
    const targetRef = useRef()
    const navigate = useNavigate()
    const { t , i18n } = useTranslation()
    const [isInView, setIsInView] = useState(false);
    
    useEffect(() => {
      const handleIntersection = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true); // Set state to true when the div is in view
          } else {
            setIsInView(false); // Set state to false when the div is out of view
          }
        });
      };
  
      const observer = new IntersectionObserver(handleIntersection, {
        root: null, // Observe with respect to the viewport
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the div is visible
      });
  
      // Start observing the target div
      if (targetRef.current) {
        observer.observe(targetRef.current);
      }
  
      // Cleanup observer on component unmount
      return () => {
        if (targetRef.current) observer.unobserve(targetRef.current);
      };
      }, []);
    return ( <div ref={targetRef} className="flex justify-center getaway my-20 px-6 lg:px-10  ">
        <div className="relative">
            <img className='w-full' src={img} alt="banner"/>
            <div className='bg'> </div>
            <div className='absolute top-0 right-0 bottom-0 left-0 content-img  flex flex-col justify-center px-10'>
                {isInView && <h2 className='weight-semiBold py-5'><Retype text={t("gateway-title-basic")} /> </h2>}

                <p className={`weight-medium  ${isInView && "animated-text"} `}>{t("gateway-desc-basic")}</p>
                <div className=' py-5 '>
                  <button onClick={()=>navigate("/listYourProperty")} className='btn-main p-3 capitalize'>{t("partner-with-us-btn")}</button>
              </div>
            </div>
        </div>
    </div> );
}

export default Getaway;