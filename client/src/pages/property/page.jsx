import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../home/sections/banner';

import { Link, useSearchParams} from 'react-router-dom';
import { Helper } from '../../functionality/helper';
import { apiRoutes, HostImages } from '../../functionality/apiRoutes';
import SearchCard from '../home/sections/searchCard';
// Images For Banners
import image from "../../images/1300x500.webp"
import small_size from "../../images/500x500-explore.webp"
import medium_size from "../../images/explore 700x500.webp"
import banner_3 from "../../images/banner 03 back.webp"
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { changePopup } from '../../redux/actions/popup';
import { changeNotification } from '../../redux/actions/notification';
import MessageInfo from '../../components/messageInfo';

function Destinations() {
    const {t,i18n} = useTranslation()
    const [ searchParams, setSearchParams] = useSearchParams()
    const [notFound, setNotFound ] = useState("")
    const dispatch = useDispatch()
    const data = [{
        img : window.innerWidth <= 500 ? small_size : (window.innerWidth <=700 ? medium_size: image) ,
        background_img : banner_3,
        count : 0,
        title : t("destination-title-0"),
        hint :  t("destination-hint-0")
      }]
    const [ loading, setLoading] = useState(true)
    const [ dataFromApi, setDataFromApi] = useState([])
    useEffect(()=>{
        setNotFound("")
        const controller = new AbortController()
        const signal = controller.signal
        const city = searchParams.get("city") || ""
        const guests = parseInt(searchParams.get("guests") )|| ""
        const type = searchParams.get("type") || ""
        const params = {page : 1, limit : 50}
        if(city) params.city = city
        if(type) params.type = type
        if(guests) params.guests = guests

        getData(signal,params)
        // window.scrollTo({ top: 0,  behavior: 'smooth' })
        return ()=> controller.abort()

    },[searchParams])
    const getData = async (signal,params)=>{
        setDataFromApi([])
        const { response , message } = await Helper({
            url : apiRoutes.property.getAllProperties,
            signal,
            params,
            method : "GET"
        })
        if(response){
            setDataFromApi(response.data)

            setLoading(false)
        }else{
            setLoading(false)
            if(message == "No properties found."){

                setNotFound(i18n.language == "en"?"No properties found ^_*.":"لا يوجد عقارات ^_*.")

                getData(undefined , {page :1 , limit:10})
                
                
            }
            
        }
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

    return ( <div className='our-properties'>
        <Helmet>
            <title>Foreshore | Destinations</title>
        </Helmet>
        <Banner children={<SearchCard isDestinationPage={true} />} fromHomePage={true} data={data} />
        {notFound != "" && <div className='flex capitalize justify-center pb-5'>
            <p className='text-error py-4 font-medium'>
                {notFound}
            </p>
        </div>}
        <div className="px-6 py-10  lg:px-10">
            <div className='flex justify-between items-center'>
            <h3  className='capitalize weight-semiBold'>{t("our-properties")} 
                {/* ({dataFromApi?dataFromApi.length:"-"}) */}
                </h3>
            </div>
            
        </div>
       
        {loading || dataFromApi.length == 0 ?<div className="loading">
        <div className="bounce"></div>
        <div className="bounce"></div>
        <div className="bounce"></div>
    </div>:
        <div className='grid px-6  lg:px-10 gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
        { dataFromApi.length > 0 ? dataFromApi.map((e,i)=>{
            if(e.ready == 1){
                return <div className='' key={`Card_Property_${i}_${e._id}`}>
            
                <div className='card-property cursor-pointer'>
                    <Link to={`/property/${e._id}`}>
                        <div className='overflow-hidden h-32 sm:h-40 md:h-40 lg:h-52'>
                            <img className='!w-full rounded object-cover h-full' src={e.files.length>0? HostImages +e.files[0].path:""} alt='Proparty Image' />
                        </div>
                    </Link>
                   
                    <div className='p-2'>
                    <Link to={`/property/${e._id}`}>
                        <h4 className='pb-1 flex items-center weight-regular'>{i18n.language == "en" ? (e.name_en?e.name_en:""):(e.name_ar?e.name_ar:"")}</h4>
                    </Link>
                     
                      
                      <div className='flex justify-between'>
                           <p className=''>{e.city?e.city:""},{" "}{e.region?e.region:""}</p>
                            <div className='flex gap-1 items-center'>
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
                                    <p>4.3</p>
                            </div>
                      </div>
                      <div className='mt-2 '>
                        {/* <Link to={e.rms_link.length>0 && e.rms_link != " " ? e.rms_link: "#"} target={e.rms_link.length>0 && e.rms_link != " "?"_blank": ""}> */}
                            <button onClick={()=>{showForm(e.rms_link)}} className='!w-full btn-main'  >{t("book-now")}</button>
                        {/* </Link> */}
                        
                      </div>
                    </div>
                    <div>
    
                    </div>
                </div>
                
              
            </div>
            }
        })
        :<div>
            <p>No Properties Yet.</p>
            </div>}

    </div>}
    </div> );
}

export default Destinations;