import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../home/sections/banner';
import InputWithIcon from '../../components/inputWithIcons';
import { changeNotification } from '../../redux/actions/notification';
import { Helper } from '../../functionality/helper';
import { apiRoutes } from '../../functionality/apiRoutes';
import { contactData } from '../../data/contactData';
import MobileInput from '../../components/mobileInput';
// Images
import image from "../../images/contact us  1350x500.webp"
import small_size from "../../images/contact us p500x500.webp"
import medium_size from "../../images/contact us p700x500.webp"


// for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';



const validationSchema = Yup.object({
    email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
   name: Yup.string()
    .required('Name is required'),
    phone_number: Yup.string()
    .matches(/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits')
    .required('Phone number is required'),
  });





function ContactUs() {
    const { t  ,i18n} = useTranslation();
    const data = [{
        img : window.innerWidth <= 520 ? small_size : (window.innerWidth <=750 ? medium_size: image),
        background_img : window.innerWidth <= 520 ? small_size : (window.innerWidth <=750 ? medium_size: image),
        count : 0,
        title : t("contact-title"),
        hint :  t("contact-hint")
      }]

    const dispatch = useDispatch()
    useEffect(()=>{ window.scrollTo({ top: 0,  behavior: 'smooth' })},[])
    const { register, handleSubmit, formState: { errors },clearErrors,watch,setValue } = useForm(
        {resolver: yupResolver(validationSchema), 
            mode: 'onChange'   }
    );
    const [ loading, setLoading ] = useState(false)
    const [ country, setCountry ] = useState({})
    const [ lastName, setLastName ] = useState("")
    const [ messageForm, setMessage ] = useState("")
    const onSubmit = async (data) => {
        setLoading(true)
        
        data["country_dial"] = country.dial_code
        data["name"] = data.name + " "+ lastName
        data["message"] = messageForm || ""
        const { response , message } = await Helper({
            url : apiRoutes.contact.contactUs,
            method : "POST",
            body : data
        })
        if(response){
            dispatch(changeNotification({
                           isOpen : true,
                           bgColor : "bg-success",
                           message : response.message
           
                       }))
            setLoading(false)

        }else{
            console.log(message);
            setLoading(false)
            dispatch(changeNotification({
                isOpen : true,
                bgColor : "bg-error",
                message : message

            }))
        }
        
    }
    const infoContact = [{
        name : contactData.call,
        icon : <svg width="25" height="25" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PhoneIcon" >
                    <path fill='white' d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                </svg>,
        link : `tel:${contactData.call}`
    },{
        name : contactData.email,
        icon :  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 25 24" fill="none">
                    <path d="M12.5 11.1075L22.085 4.95C21.6996 4.66096 21.2317 4.50323 20.75 4.5H4.24998C3.76828 4.50323 3.30033 4.66096 2.91498 4.95L12.5 11.1075Z" fill="white"/>
                    <path d="M12.905 12.6303L12.7775 12.6903H12.7175C12.6484 12.7212 12.5751 12.7414 12.5 12.7503C12.4377 12.7582 12.3748 12.7582 12.3125 12.7503H12.2525L12.125 12.6903L2.075 6.19531C2.02698 6.37647 2.00179 6.56291 2 6.75031V17.2503C2 17.847 2.23705 18.4193 2.65901 18.8413C3.08097 19.2633 3.65326 19.5003 4.25 19.5003H20.75C21.3467 19.5003 21.919 19.2633 22.341 18.8413C22.7629 18.4193 23 17.847 23 17.2503V6.75031C22.9982 6.56291 22.973 6.37647 22.925 6.19531L12.905 12.6303Z" fill="white"/>
                </svg>,
        link : `mailto:${contactData.email}` 
    },{
        name : i18n.language == "en" ? contactData.location_en: contactData.location_ar,
        icon : <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 15 15" fill="none">
                    <g clipPath="url(#clip0_203_2297)">
                        <path d="M7.5 7.5C6.8125 7.5 6.25 6.9375 6.25 6.25C6.25 5.5625 6.8125 5 7.5 5C8.1875 5 8.75 5.5625 8.75 6.25C8.75 6.9375 8.1875 7.5 7.5 7.5ZM11.25 6.375C11.25 4.10625 9.59375 2.5 7.5 2.5C5.40625 2.5 3.75 4.10625 3.75 6.375C3.75 7.8375 4.96875 9.775 7.5 12.0875C10.0312 9.775 11.25 7.8375 11.25 6.375ZM7.5 1.25C10.125 1.25 12.5 3.2625 12.5 6.375C12.5 8.45 10.8313 10.9062 7.5 13.75C4.16875 10.9062 2.5 8.45 2.5 6.375C2.5 3.2625 4.875 1.25 7.5 1.25Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_203_2297">
                            <rect width="15" height="15" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>,
        link : "https://goo.gl/maps/YOUR_LOCATION_MAP"
    }]
    return ( <div className='contact-us-content'>

        <Helmet>
            <title>Foreshore | Contact Us</title>
        </Helmet>
        <Banner data={data} />
        <form onSubmit={handleSubmit(onSubmit)} className=' relative  px-6 md:lg-20 lg:px-36'>
            <div className='form-contact p-5 md:px-10 lg:px-20 flex flex-col gap-5'>
                <div>
                    <h3 className='flex justify-center weight-semiBold capitalize'>{t("contact-us")}</h3>
                </div>
                <div className='grid grid-cols=1 sm:grid-cols-2 gap-5'>
                    <div>
                        <InputWithIcon register={register("name")} placeholder={t("first-name")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 10 12" fill="none">
                                <path d="M4.85709 5.28571C6.04056 5.28571 6.99995 4.32632 6.99995 3.14286C6.99995 1.95939 6.04056 1 4.85709 1C3.67362 1 2.71423 1.95939 2.71423 3.14286C2.71423 4.32632 3.67362 5.28571 4.85709 5.28571Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 11.2856H4.85714H8.71429V10.8209C8.70746 10.1676 8.53516 9.52666 8.21348 8.95803C7.8918 8.38932 7.43123 7.91146 6.8748 7.56904C6.31836 7.22661 5.68421 7.03082 5.03159 6.99992C4.97341 6.99717 4.91524 6.99573 4.85714 6.99561C4.79905 6.99573 4.74088 6.99717 4.6827 6.99992C4.03008 7.03082 3.39593 7.22661 2.83949 7.56904C2.28306 7.91146 1.82249 8.38932 1.5008 8.95803C1.17912 9.52666 1.00682 10.1676 1 10.8209V11.2856Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>} />
                        {errors.name && <p className="p-0.5 text-error">{errors.name.message}</p>}
                    </div>
                    <div>
                        <InputWithIcon onChange = {(e)=>setLastName(e.target.value)} placeholder={t("last-name")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 10 12" fill="none">
                                <path d="M4.85709 5.28571C6.04056 5.28571 6.99995 4.32632 6.99995 3.14286C6.99995 1.95939 6.04056 1 4.85709 1C3.67362 1 2.71423 1.95939 2.71423 3.14286C2.71423 4.32632 3.67362 5.28571 4.85709 5.28571Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 11.2856H4.85714H8.71429V10.8209C8.70746 10.1676 8.53516 9.52666 8.21348 8.95803C7.8918 8.38932 7.43123 7.91146 6.8748 7.56904C6.31836 7.22661 5.68421 7.03082 5.03159 6.99992C4.97341 6.99717 4.91524 6.99573 4.85714 6.99561C4.79905 6.99573 4.74088 6.99717 4.6827 6.99992C4.03008 7.03082 3.39593 7.22661 2.83949 7.56904C2.28306 7.91146 1.82249 8.38932 1.5008 8.95803C1.17912 9.52666 1.00682 10.1676 1 10.8209V11.2856Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>} />
                    </div>
                </div>
                <div className='grid grid-cols=1 sm:grid-cols-2 gap-5'>
                    <div>
                        <InputWithIcon register={register("email")} placeholder={t("email")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M12.5 1.75H1.5C0.947715 1.75 0.5 2.19772 0.5 2.75V11.25C0.5 11.8023 0.947715 12.25 1.5 12.25H12.5C13.0523 12.25 13.5 11.8023 13.5 11.25V2.75C13.5 2.19772 13.0523 1.75 12.5 1.75Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M0.5 3L6.36 6.52424C6.53969 6.62973 6.76615 6.6875 7 6.6875C7.23385 6.6875 7.46031 6.62973 7.64 6.52424L13.5 3" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>} />
                        {errors.email && <p className="p-0.5 text-error">{errors.email.message}</p>}
                    </div>
                    <div>
                        <MobileInput register={register("phone_number")}  returnedCountry={(ele)=>setCountry(ele)} />
                        {errors.phone_number && <p className="p-0.5 text-error">{errors.phone_number.message}</p>}
                    </div>
                </div>
                <div>
                    <textarea onChange={(e)=>setMessage(e.target.value)}  rows={5}  className='w-full' placeholder={t("message")} />
                </div>
                <div className='flex justify-center'>
                    <button className='btn-grey p-5'>{loading?<div className='loader'></div>:t("submit")}</button>
                </div>

            </div>
        </form>
        <div className='my-20 grid grid-cols-1 lg:grid-cols-2  px-6 md:lg-20 lg:px-36 gap-4 '>
            <div>
                <div className='pb-5'>
                    <h3 className='weight-semiBold  capitalize'>{t("contact-info")}</h3>
                    <p className=''>{t("contact-body")}</p>
                </div>
                
            <ul className='contact-us-div flex flex-col gap-4'>
                {infoContact.map((e)=>(<li key={`Contact_us_info_${e.name}`}>
                    <a  target="_blank" href={e.link}>
                        <div className='contact-us-icon'>
                            {e.icon}
                        </div>
                        <div className='w-52 sm:w-80 md:w-96 lg:w-80'>{e.name}</div>
                    </a>
                </li>))}
                
            </ul>

            </div>
            <div>
                <iframe src={contactData.map} width="600" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

        </div>

    </div> );
}

export default ContactUs;