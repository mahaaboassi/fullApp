import React , {useState ,useRef , useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Helper } from '../../../functionality/helper';
import { apiRoutes } from '../../../functionality/apiRoutes';

function SearchCard({isDestinationPage = false}) {
    const { t, i18n } = useTranslation()
    const [ types, setTypes] = useState([])
    const navigate = useNavigate()
    const [ isOpen , setIsOpen] = useState({
        location: false,
        type : false,
        guest :false
    })
    const [ values , setValues] = useState({
        location: "",
        type : ""
    })
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ count, setCount ] = useState(1)
    const [ resetOpen, setResetOpen] = useState(false)
    const locationRef = useRef(null);
    const typeRef = useRef(null);
    const guestRef = useRef(null);
    const closeDropdown = (type,value)=>{
        setValues(prev=>({...prev,[type]:value}))
        setIsOpen({
            location :false,type:false,guest:false
        })
    }
    const changeCount = (type)=>{
        if(type == "pls"){
            if(count<7) setCount(count+1)
        }else if(type == "min"){
            if(count>1) setCount(count-1)
        }
    }
    
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
    useEffect(()=>{
        setValues({
            location : searchParams.get("city") || "",
            type : searchParams.get("type") || ""
        })
        setCount(parseInt(searchParams.get("guests"))|| 1)
        if(searchParams.get("city") || searchParams.get("type") || searchParams.get("guests")) {
            setResetOpen(true)
        }else{
            setResetOpen(false)
        }
    },[searchParams])
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
    const handleSearch = ()=>{
        if(!isDestinationPage){

            navigate(`/destinations?${values.location?`city=${values.location}&`:""}${values.type?`type=${values.type}&`:""}${count>1?`guests=${count}`:""}`)
        }else{
            
            if (values.location) searchParams.set("city", values.location);
            if (values.type) searchParams.set("type", values.type);
            if (count > 1) searchParams.set("guests", count); // Ensures guests count is valid
            setSearchParams(searchParams)
        }
        
    }
    const resetFilter = ()=>{
        searchParams.delete("city")
        searchParams.delete("guests")
        searchParams.delete("type")
        setSearchParams(searchParams)
    }
    return ( <div className=' px-6  lg:px-28 '>
        <div className='search-2-container grid grid-cols-2  sm:grid-cols-4 flex justify-between p-3 lg:p-5 gap-2 sm:gap-3 lg:gap-6'>
            <div ref={locationRef} className='first flex items-center  gap-2'>
                    <div onClick={()=>setIsOpen({
                            location :!isOpen.location,type:false,guest:false
                        })} className='semi-input relative flex items-center gap-1 sm:gap-2'>
                        <div>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 15 15" fill="none">
                                <g clipPath="url(#clip0_203_2297)">
                                    <path d="M7.5 7.5C6.8125 7.5 6.25 6.9375 6.25 6.25C6.25 5.5625 6.8125 5 7.5 5C8.1875 5 8.75 5.5625 8.75 6.25C8.75 6.9375 8.1875 7.5 7.5 7.5ZM11.25 6.375C11.25 4.10625 9.59375 2.5 7.5 2.5C5.40625 2.5 3.75 4.10625 3.75 6.375C3.75 7.8375 4.96875 9.775 7.5 12.0875C10.0312 9.775 11.25 7.8375 11.25 6.375ZM7.5 1.25C10.125 1.25 12.5 3.2625 12.5 6.375C12.5 8.45 10.8313 10.9062 7.5 13.75C4.16875 10.9062 2.5 8.45 2.5 6.375C2.5 3.2625 4.875 1.25 7.5 1.25Z" fill="#27cbbe"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_203_2297">
                                        <rect width="15" height="15" fill="#27cbbe"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            
                        </div>
                        <div className=' items-center '>
                            {t("location")} {""}
                           {values.location != "" &&  <span className='capitalize' style={{fontSize:"12px"}} >({values.location})</span>}
                        {/* <div style={{fontSize:"12px"}}>{values.location}</div> */}
                        </div>
                        {isOpen.location && <div  className='absolute-card-2 min-w-40'>
                            <ul>
                                <li onClick={()=>{closeDropdown("location",t("dubai"))}} className='capitalize dropdown-content p-1'>{t("dubai")}</li>
                                <li onClick={()=>{closeDropdown("location",t("sharjah"))}}  className='capitalize dropdown-content p-1'>{t("sharjah")}</li>
                                <li onClick={()=>{closeDropdown("location",t("abo"))}} className='capitalize dropdown-content p-1'>{t("abo")}</li>
                            </ul>
                        </div>}
                    </div>
            </div>
            <div ref={typeRef} className='second flex items-center'>
                    <div onClick={()=>setIsOpen({
                            location :false,type:!isOpen.type,guest:false
                        })} className='semi-input relative flex items-center gap-1 sm:gap-2'>
                        <div>
                           <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 16" fill="none">
                              <path d="M7.47965 0.000297778C7.34639 0.00477873 7.21807 0.0511048 7.11344 0.132507L1.19141 4.72617C0.439782 5.30939 0 6.2006 0 7.14279V14.9744C0 15.5338 0.473502 16 1.04167 16H5.20833C5.7765 16 6.25 15.5338 6.25 14.9744V10.8719C6.25 10.7508 6.3354 10.6668 6.45833 10.6668H8.54167C8.6646 10.6668 8.75 10.7508 8.75 10.8719V14.9744C8.75 15.5338 9.2235 16 9.79167 16H13.9583C14.5265 16 15 15.5338 15 14.9744V7.14279C15 6.2006 14.5602 5.30939 13.8086 4.72617L7.88656 0.132507C7.77098 0.0426112 7.62687 -0.00421137 7.47965 0.000297778ZM7.5 1.39931L13.0355 5.6933C13.4872 6.0438 13.75 6.57692 13.75 7.14279V14.7693H10V10.8719C10 10.0863 9.33956 9.43602 8.54167 9.43602H6.45833C5.66044 9.43602 5 10.0863 5 10.8719V14.7693H1.25V7.14279C1.25 6.57692 1.51281 6.0438 1.96452 5.6933L7.5 1.39931Z" fill="#27cbbe"/>
                            </svg>

                        </div>
                        <div className=' items-center '>
                            {t("type")} {" "}
                            {values.type != "" && <span className='capitalize' style={{fontSize:"12px"}} >({values.type})</span>}

                        </div>
                        {isOpen.type && types.length>0 && <div className='absolute-card-2 min-w-40'>
                                <ul>
                                {types.map((e)=>(<li key={`Types_Search_Card_${e._id}`} onClick={()=>{closeDropdown("type",i18n.language == "en"?(e.name_en?e.name_en:""):(e.name_ar?e.name_ar:""))}}  className='capitalize dropdown-content p-1'>{i18n.language == "en"?(e.name_en?e.name_en:""):(e.name_ar?e.name_ar:"")}</li>))}
                                </ul>
                            </div>}
                    </div>
                        
                    
            </div>
            <div ref={guestRef} className='third flex items-center '>
                    <div onClick={()=>setIsOpen({
                                location :false,type:false,guest:true
                            })} className='semi-input relative flex items-center gap-1 sm:gap-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 20 19" fill="none">
                                    <path d="M9.99999 6.31179C11.4881 6.31179 12.6944 5.16577 12.6944 3.75209C12.6944 2.33841 11.4881 1.19238 9.99999 1.19238C8.5119 1.19238 7.30556 2.33841 7.30556 3.75209C7.30556 5.16577 8.5119 6.31179 9.99999 6.31179Z" stroke="#27cbbe" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14.7153 10.791C14.7153 9.60297 14.2185 8.4636 13.3342 7.62353C12.4499 6.78347 11.2506 6.31152 10 6.31152C8.74946 6.31152 7.55012 6.78347 6.66585 7.62353C5.78156 8.4636 5.28477 9.60297 5.28477 10.791V12.7108H7.3056L7.9792 17.8302H12.0208L12.6944 12.7108H14.7153V10.791Z" stroke="#27cbbe" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className=' items-center '>
                            {t("guest")} {" "}
                            <span style={{fontSize:"12px", display:"inline-block"}} >({count})</span>
                        </div>
                        {isOpen.guest && <div className='absolute-card-2 min-w-40'>
                            <div className='flex justify-between p-3'>
                                <div style={{borderRadius:"50%"}} onClick={()=>changeCount("min")} className='flex btn-2 justify-center cursor-pointer bg-main text-white items-center h-6 w-6'>-</div>
                                <div className='flex justify-center items-center'>{count}</div>
                                <div style={{borderRadius:"50%"}} onClick={()=>changeCount("pls")} className='flex btn-2 justify-center cursor-pointer bg-main text-white items-center h-6 w-6'>+</div>
                            </div>
                        </div>}
                    </div>
            </div>
            <div className='fourth flex items-center gap-2'>
                   {resetOpen && <div onClick={resetFilter} className='btn-search-2 flex capitalize items-center gap-2'>  
                        <div className=' items-center '>
                            {t("reset")}
                            {/* <span style={{fontSize:"12px"}} >({count})</span> */}
                        </div>
                    </div>}
                    <div onClick={handleSearch} className='btn-search-2 capitalize flex items-center gap-2'>  
                        <div className=' items-center '>
                            {t("search")}
                            {/* <span style={{fontSize:"12px"}} >({count})</span> */}
                        </div>
                    </div>
            </div>
        </div>
        

     </div> );
}

export default SearchCard;