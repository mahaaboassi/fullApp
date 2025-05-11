import React ,{useEffect, useRef, useState}  from 'react';
import { useTranslation } from 'react-i18next';
import { Helper } from '../functionality/helper';
import { apiRoutes } from '../functionality/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePopup } from '../redux/actions/popup';
import MessageInfo from './messageInfo';
import { changeNotification } from '../redux/actions/notification';


const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 25 25" fill="none">
<g clipPath="url(#clip0_627_942)">
<path d="M10.7145 20.5354C16.1387 20.5354 20.5359 16.1382 20.5359 10.714C20.5359 5.28977 16.1387 0.892578 10.7145 0.892578C5.29026 0.892578 0.893066 5.28977 0.893066 10.714C0.893066 16.1382 5.29026 20.5354 10.7145 20.5354Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.1074 24.1064L17.8574 17.8564" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_627_942">
<rect width="25" height="25" fill="white"/>
</clipPath>
</defs>
</svg>
const controlIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 15" fill="none">
<path d="M1.82182 1.50742C1.59852 1.51006 1.38024 1.57384 1.1907 1.69181C1.00117 1.80979 0.847577 1.97746 0.746745 2.1766C0.632949 2.37539 0.572479 2.6002 0.571235 2.82923C0.569992 3.05825 0.628019 3.28372 0.739649 3.48372L6.42136 12.7825C6.51741 12.9847 6.66857 13.1557 6.85746 13.2759C7.04634 13.3959 7.26529 13.4602 7.48912 13.4614C7.71294 13.4626 7.93257 13.4007 8.12275 13.2827C8.31293 13.1646 8.46594 12.9953 8.56418 12.7942L14.3037 3.55735C14.4174 3.35857 14.4779 3.13375 14.4791 2.90472C14.4804 2.6757 14.4224 2.45024 14.3108 2.25023C14.212 2.05001 14.0603 1.88068 13.872 1.76065C13.6838 1.64062 13.4662 1.57448 13.243 1.56942L1.82182 1.50742Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
function FilterInsideProperty({link}) {
    
    const { t ,i18n } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ types, setTypes] = useState([])
    const guestRef = useRef()
    const [ count, setCount ] = useState(1)
    const [ values, setValues ] = useState({ type : "" , location : "", guest : 1})
    const [ open, setOpen ] = useState({ type : false , location : false, guest : false})
    const selectOption = (key)=>{
        setOpen({type : false , location : false, guest : false,[key]:open[key]?false:true})
    }
    const closeDropdown = (type,value)=>{
        setValues(prev=>({...prev,[type]:value}))
        setOpen({
            location :false,type:false,guest:false
        })
    }
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const handleClickOutside = (e) => {
            
            if (guestRef.current && !guestRef.current.contains(e.target) ) {
                setOpen({
                location: false,
                type: false,
                guest: false,
                });
            }
            };
    
            document.addEventListener("click", handleClickOutside);
        getTypes(signal)
        return () => {
        controller.abort()
        document.removeEventListener("click", handleClickOutside);
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
        const changeCount = (type)=>{
            if(type == "pls"){
                if(count<7) setCount(count+1)
            }else if(type == "min"){
                if(count>1) setCount(count-1)
            }
            setOpen({
                location :false,type:false,guest:true
            })
        }

    const handleSearch = ()=>{
        navigate(`/destinations?${values.location?`city=${values.location}&`:""}${values.type?`type=${values.type}&`:""}${count>1?`guests=${count}`:""}`)

        
    }
    const showForm = (link) =>{
        dispatch(changePopup({
            isOpen : true,
            isForm : true,
            component : <div style={i18n.language == "en" ?{direction : "ltr"}:{direction : "rtl"} } className=" bg-white">
                    <h3 className="text-main weight-medium title-card ">{t("book-your-property")}</h3>
                    <div>
                        <p  className="py-2">{t("desc-your-property")}</p>
                        <div><MessageInfo returnedData={(data)=>{
                            let temp = data
                            temp.message = `This message is from a user requesting to book this property ${link}.`
                            sendData(temp)}} withoutMessage={true}/></div>
                    </div>
            </div>       
       }))
    }
    const sendData = async (data) => {
        const { response , message } = await Helper({
            url : apiRoutes.contact.contactUs,
            method : "POST",
            body : {
                email : data.email,
                name : data.name,
                phone_number :  data.phone_number,
                country_dial : data.country_dial,
                message : data.message || ""
            }
        })
        if(response){
            dispatch(changePopup({
                isOpen : false,
                isForm : false,
                component : <></>     
            }))
            dispatch(changeNotification(
                {
                    isOpen : true,
                    message : message,
                    bgColor : "bg-success"
                }
            ))

        }else{
            dispatch(changePopup({
                isOpen : false,
                isForm : false,
                component : <></>     
            }))
            dispatch(changeNotification(
                {
                    isOpen : true,
                    message : message,
                    bgColor : "bg-error"
                }
            ))
        }
       
    }

    return ( <div className='sticky-div '>
       {/*  <div className={`col-span-5 md:col-span-2 lg:col-span-1 mt-8 sm:mt-10 md:mt-0 relative px-6 ${i18n.language == "en"?"md:pr-10 md:pl-0":"md:pl-10 md:pr-0"} `}> */}
        
            <div className='container-filter-Card p-4 mb-3'>
                <div >
                    <h4 className='capitalize text-center mb-2'>{t("filter-box")}</h4>
                    <div className='' >
                      
                        <div ref={guestRef}  className='container-options mb-2 relative'>
                            <div onClick={()=>selectOption("location")} className='option-border relative flex justify-between option-card p-2'>
                                {/* Location */}
                                <div  className='flex flex-col justify-center'>
                                    <div className='capitalize'>{t("location")}</div>
                                    <p >{values.location == "" ?t("which-location"):values.location } </p>
                                </div>
                                {open.location?<div style={{transform:"rotate(180deg"}} className='flex items-center'>
                                    {controlIcon}
                                    </div>:<div className='flex items-center'>
                                            {controlIcon}
                                    </div>}
                                    {open.location && <div  className='absolute box-shadow h-32 bg-white rounded min-w-40'>
                                                <ul>
                                                    <li onClick={()=>{closeDropdown("location",t("dubai"))}} className='capitalize dropdown-content p-1'>{t("dubai")}</li>
                                                    <li onClick={()=>{closeDropdown("location",t("sharjah"))}}  className='capitalize dropdown-content p-1'>{t("sharjah")}</li>
                                                    <li onClick={()=>{closeDropdown("location",t("abo"))}} className='capitalize dropdown-content p-1'>{t("abo")}</li>
                                                </ul>
                                            </div>}
                            </div>
                            <div onClick={()=>selectOption("type")} className='option-border flex justify-between option-card p-2 relative'>
                                {/* Type */}
                                <div className='flex flex-col justify-center'>
                                    <div className='capitalize'>{t("type")}</div>
                                    <p >{values.type == "" ?t("which-type"):values.type } </p>
                                </div>
                                {open.type?<div style={{transform:"rotate(180deg"}} className='flex items-center'>
                                    {controlIcon}
                                    </div>:<div className='flex items-center'>
                                            {controlIcon}
                                    </div>}
                                {open.type && types.length>0 && <div  className='absolute box-shadow h-32 bg-white rounded min-w-40'>
                                <ul>
                                {types.map((e)=>(<li key={`Types_Search_Card_${e._id}`} onClick={()=>{closeDropdown("type",i18n.language == "en"?(e.name_en?e.name_en:""):(e.name_ar?e.name_ar:""))}}  className='capitalize dropdown-content p-1'>{i18n.language == "en"?(e.name_en?e.name_en:""):(e.name_ar?e.name_ar:"")}</li>))}
                                </ul>
                            </div>}
                            </div>
                            <div onClick={()=>selectOption("guest")}  className='flex justify-between option-card p-2 relative'>
                                {/* Guests */}
                                <div className='flex flex-col justify-center'>
                                    <div className='capitalize'>{t("guest")}</div>
                                    <p>{count} {" "} {t("guest")} </p>
                                </div>
                                {open.guest?<div   style={{transform:"rotate(180deg"}} className='flex items-center'>
                                    {controlIcon}
                                    </div>:<div   className='flex items-center'>
                                            {controlIcon}
                                    </div>}
                                
                                
                            </div>
                            {open.guest && <div  className=' absolute box-guest bg-white rounded min-w-40'>
                                <div className='flex justify-between p-3'>
                                    <div style={{borderRadius:"50%"}} onClick={()=>changeCount("min")} className='flex btn-2 justify-center cursor-pointer bg-main text-white items-center h-6 w-6'>-</div>
                                    <div className='flex justify-center items-center'>{count}</div>
                                    <div style={{borderRadius:"50%"}} onClick={()=>changeCount("pls")} className='flex btn-2 justify-center cursor-pointer bg-main text-white items-center h-6 w-6'>+</div>
                                </div>
                                </div>}
                        </div>
                        
                        <div>
                           
                            {/* Icon & Button */}
                            <div onClick={handleSearch} className='custom-button flex gap-2 justify-center p-2'>
                                <div className='flex items-center justify-center'>{searchIcon}</div>
                                <div className='capitalize flex items-center '>{t("search")}</div>
                            </div>
                          
                        </div>
                    </div>

                </div>
                
            </div>
          <div className='w-full pb-3'>
            <button onClick={()=>showForm(link)} style={{borderRadius:"8px"}} className='btn-main capitalize !w-full'>{t("book-now")}</button>
          </div>
          {/* <div className='w-full'>
            <PDFDownloadLink document={<PropertyPDF property={dataFromApi} />} fileName="document.pdf">
              {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
            </PDFDownloadLink>
            <button  className='btn-main capitalize !w-full'>{t("download")}</button>
          </div> */}
        </div>
      );
}

export default FilterInsideProperty;