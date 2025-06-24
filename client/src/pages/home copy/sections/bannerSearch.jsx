import React ,{useEffect, useRef, useState}  from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { Helper } from '../../../functionality/helper';
import { apiRoutes } from '../../../functionality/apiRoutes';


function BannerSearch() {
    
    const { t ,i18n } = useTranslation();
    const navigate = useNavigate();
    const [ isOpen , setIsOpen] = useState({
        location: false,
        type : false,
        guest :false
    })
    const [ values , setValues] = useState({
        location: "",
        type : ""
    })
    const [count, setCount] = useState(1)
    const locationRef = useRef(null);
    const typeRef = useRef(null);
    const guestRef = useRef(null);
    const closeDropdown = (type,value)=>{
        const temp = {
            location :false,type:false,guest:false
        }
    
        setValues(prev=>({...prev,[type]:value}))
        setIsOpen(temp)
    }
    const changeCount = (type)=>{
        if(type == "pls"){
            if(count<7) setCount(count+1)
        }else if(type == "min"){
            if(count>1) setCount(count-1)
        }
    }
    const [ types, setTypes] = useState(undefined)
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const handleClickOutside = (e) => {
        if (
            locationRef.current &&
            !locationRef.current.contains(e.target) &&
            typeRef.current &&
            !typeRef.current.contains(e.target) &&
            guestRef.current &&
            !guestRef.current.contains(e.target)
        ) {
            setIsOpen({
            location: false,
            type: false,
            guest: false,
            });
        }
        };

        document.addEventListener("click", handleClickOutside);
        getTypes(signal)
        return () => {
        document.removeEventListener("click", handleClickOutside);
        controller.abort()
        };
    }, []);
    const getTypes = async (signal) =>{
        const { response, message} = await Helper({
            url : apiRoutes.type.getAllTypes,
            params :{page :1, limit : 10},
            method : "GET",
            signal
        })
        if(response){
            setTypes(response.data)
        }else{
            console.log(message);
            
        }
    }
    return ( <div className='search-banner '>
        <div className={`flex  ${window.innerWidth < 600 && "justify-between"}`}>
            <label ref={locationRef} onClick={()=>setIsOpen({
                location :!isOpen.location,type:false,guest:false
            })} className='flex items-center gap-1 sm:gap-2 p-1 lg:p-4 relative'>
                <div className='flex items-center icon-container-banner '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 15 15" fill="none">
                            <g clipPath="url(#clip0_203_2297)">
                                <path d="M7.5 7.5C6.8125 7.5 6.25 6.9375 6.25 6.25C6.25 5.5625 6.8125 5 7.5 5C8.1875 5 8.75 5.5625 8.75 6.25C8.75 6.9375 8.1875 7.5 7.5 7.5ZM11.25 6.375C11.25 4.10625 9.59375 2.5 7.5 2.5C5.40625 2.5 3.75 4.10625 3.75 6.375C3.75 7.8375 4.96875 9.775 7.5 12.0875C10.0312 9.775 11.25 7.8375 11.25 6.375ZM7.5 1.25C10.125 1.25 12.5 3.2625 12.5 6.375C12.5 8.45 10.8313 10.9062 7.5 13.75C4.16875 10.9062 2.5 8.45 2.5 6.375C2.5 3.2625 4.875 1.25 7.5 1.25Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_203_2297">
                                    <rect width="15" height="15" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                </div>
                <div className=' items-center '>
                  {t("location")}
                  <div style={{fontSize:"12px"}}>{values.location}</div>
                </div>
                {isOpen.location && <div  className='location-card min-w-40'>
                    <ul>
                        <li onClick={()=>{closeDropdown("location",t("dubai"))}} className='capitalize dropdown-content p-1'>{t("dubai")}</li>
                        <li onClick={()=>{closeDropdown("location",t("sharjah"))}}  className='capitalize dropdown-content p-1'>{t("sharjah")}</li>
                        <li onClick={()=>{closeDropdown("location",t("abo Dhabi"))}} className='capitalize dropdown-content p-1'>{t("abo")}</li>
                    </ul>
                </div>}
            </label >
            <label  ref={typeRef}   onClick={()=>setIsOpen({
                location :false,type:true,guest:false
            })} className='flex items-center relative gap-1 sm:gap-2 p-1 lg:p-4'>
                <div className='flex items-center icon-container-banner'>
                   <svg className='larg-icon' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 15 16" fill="none">
                     <path d="M7.47965 0.000297778C7.34639 0.00477873 7.21807 0.0511048 7.11344 0.132507L1.19141 4.72617C0.439782 5.30939 0 6.2006 0 7.14279V14.9744C0 15.5338 0.473502 16 1.04167 16H5.20833C5.7765 16 6.25 15.5338 6.25 14.9744V10.8719C6.25 10.7508 6.3354 10.6668 6.45833 10.6668H8.54167C8.6646 10.6668 8.75 10.7508 8.75 10.8719V14.9744C8.75 15.5338 9.2235 16 9.79167 16H13.9583C14.5265 16 15 15.5338 15 14.9744V7.14279C15 6.2006 14.5602 5.30939 13.8086 4.72617L7.88656 0.132507C7.77098 0.0426112 7.62687 -0.00421137 7.47965 0.000297778ZM7.5 1.39931L13.0355 5.6933C13.4872 6.0438 13.75 6.57692 13.75 7.14279V14.7693H10V10.8719C10 10.0863 9.33956 9.43602 8.54167 9.43602H6.45833C5.66044 9.43602 5 10.0863 5 10.8719V14.7693H1.25V7.14279C1.25 6.57692 1.51281 6.0438 1.96452 5.6933L7.5 1.39931Z" fill="white"/>
                    </svg>
                </div>
                <div className=' items-center '>
                  {t("type")}
                  <div style={{fontSize:"12px"}}>{values.type}</div>
                </div>
                {isOpen.type && <div className='location-card min-w-40'>
                    <ul>
                        {types.map((e)=>(<li onClick={()=>{closeDropdown("type",t("studio"))}}  className='capitalize dropdown-content p-1'>{i18n.language == "en"?(e.name_en?e.name_en:""):(e.name_ar?e.name_ar:"")}</li>))}
                        
                        
                        <li onClick={()=>{closeDropdown("type",t("villa"))}} className='capitalize dropdown-content p-1'>{t("villa")}</li>
                    </ul>
                </div>}
            </label>
            <label ref={guestRef}  onClick={()=>setIsOpen({
                location :false,type:false,guest:true
            })} className='flex items-center gap-1 sm:gap-2 p-1 lg:p-4' >
                <div className='flex items-center icon-container-banner '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 19" fill="none">
                        <path d="M9.99999 6.31179C11.4881 6.31179 12.6944 5.16577 12.6944 3.75209C12.6944 2.33841 11.4881 1.19238 9.99999 1.19238C8.5119 1.19238 7.30556 2.33841 7.30556 3.75209C7.30556 5.16577 8.5119 6.31179 9.99999 6.31179Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.7153 10.791C14.7153 9.60297 14.2185 8.4636 13.3342 7.62353C12.4499 6.78347 11.2506 6.31152 10 6.31152C8.74946 6.31152 7.55012 6.78347 6.66585 7.62353C5.78156 8.4636 5.28477 9.60297 5.28477 10.791V12.7108H7.3056L7.9792 17.8302H12.0208L12.6944 12.7108H14.7153V10.791Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
                <div className=' items-center '>
                  {t("guest")}<span style={{fontSize:"12px"}} >({count})</span>
                </div>
                {isOpen.guest && <div className='location-card min-w-40'>
                    <div className='flex justify-between p-3'>
                        <div style={{borderRadius:"50%"}} onClick={()=>changeCount("min")} className='flex  justify-center cursor-pointer bg-stone-200 items-center h-5 w-5'>-</div>
                        <div className='flex justify-center items-center'>{count}</div>
                        <div style={{borderRadius:"50%"}} onClick={()=>changeCount("pls")} className='flex justify-center cursor-pointer bg-stone-200 items-center h-5 w-5'>+</div>
                    </div>
                </div>}
            </label>
            <div onClick={()=>navigate("/destinations")} className='flex items-center justify-center p-1 lg:p-4  search-banner-btn'>
                <div className='flex items-center icon-container-banner '>
                     <svg className='larg-icon' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                           <g clipPath="url(#clip0_164_685)">
                           <path d="M6 11.5C9.03757 11.5 11.5 9.03757 11.5 6C11.5 2.96243 9.03757 0.5 6 0.5C2.96243 0.5 0.5 2.96243 0.5 6C0.5 9.03757 2.96243 11.5 6 11.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                           <path d="M13.5 13.5L10 10" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                           </g>
                           <defs>
                           <clipPath id="clip0_164_685">
                           <rect width="14" height="14" fill="white"/>
                           </clipPath>
                           </defs>
                    </svg>
                    </div>
            </div>

        </div>

        

   </div> );
}

export default BannerSearch;