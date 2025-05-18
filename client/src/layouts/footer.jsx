import React from 'react';
import { useTranslation } from 'react-i18next';
// Images
import img from "../images/logo_light.webp"
import img_2 from "../images/logo_dark.webp"
import { Link } from 'react-router-dom';
import { contactData } from '../data/contactData';

// for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {  useState } from "react";
import { Helper } from '../functionality/helper';
import { apiRoutes } from '../functionality/apiRoutes';
import { useDispatch } from 'react-redux';
import { changeNotification } from '../redux/actions/notification';

const validationSchema = Yup.object({
    email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
  });

  
function Footer() {
    const {t , i18n} = useTranslation()
    const data = [{
        name : "home",
        link :"/"
    },{
        name : "explore-destination",
        link :"/destinations"
    },{
        name : "about-us",
        link :"/aboutUs"
    },{
        name : "list-your-property",
        link :"/listYourProperty"
    },{
        name : "contact-us",
        link :"/contactUs"
    },{
        name : "faq",
        link :"/FAQs"
    }]
    const dispatch = useDispatch()
    const [ loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors }} = useForm(
                {resolver: yupResolver(validationSchema), 
                 mode: 'onChange'   }
    );
    const onSubmit = async (data) => {
        setLoading(true)
        const { response, message } = await Helper({
            url : apiRoutes.contact.subsecribe,
            method : "POST",
            body : { email : data.email}
        })
        if(response){
            setLoading(false)
            dispatch(changeNotification({
                isOpen : true,
                bgColor : "bg-success",
                message : response.message

            }))
            reset();
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
    return ( <footer className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className={`${i18n.language == "en"?"footer-en":"footer-ar"} footer-right`}>
                <div className="flex justify-center py-2 sm:py-5">
                    <div className="photo-container">
                        <div className="flip-box">
                            <div className="flip-box-inner">
                            <div className="flip-box-front">
                                <img src={img_2} alt="Front Photo"/>
                            </div>
                            <div className="flip-box-back">
                                <img src={img} alt="Back Photo"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="">
                {t("footer-desc")}
                </p>

            </div>
            <div className={`px-5 ${i18n.language == "en"?"footer-container-en":"footer-container-ar"}`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="weight-regular mt-10 md:mt-0 text-center sm:text-start">{t("footer-subscribe")}</h5>
                    <div   className="flex pt-4 pb-1 justify-center sm:justify-start ">
                        <input style={{width:"100%"}} {...register("email")} placeholder={t("email")} />
                        <button className="btn-footer cursor-pointer p-3 min-w-32 capitalize">{loading?<div className='loader'></div>:t("subscribe")}</button>
                    </div>
                    {errors.email && <p className="p-0.5 text-error">{errors.email.message}</p>}
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 ">
                    <div className="pages">
                        <h4 className="uppercase weight-semiBold text-center sm:text-start py-3">{t("pages")}</h4>
                        <ul className="flex flex-col gap-1">
                            {data.map((e)=>(<li key={`Footer_Pages_${e.name}`} className="capitalize text-center sm:text-start cursor-pointer">
                                <Link to={e.link}>{t(e.name)}</Link>
                            </li>))}
                        </ul>
                    </div>
                    <div className="contact">
                        <h4 className="uppercase  weight-semiBold py-3">{t("contact-us")}</h4>
                        <ul className="flex flex-col gap-1">
                        <li className=" cursor-pointer flex">
                            <a target="_blank" href={`tel:${contactData.call}`} className="flex items-center space-x-2">
                                <div className="min-w-8">
                                    <svg width="25" height="25" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PhoneIcon" style={{ color: "white" }}>
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                                    </svg>
                                </div>
                                <div>{contactData.call}</div>
                            </a>
                        </li>
                        <li className=" cursor-pointer flex">
                            <a target="_blank" href={`mailto:${contactData.email}`} className="flex items-center space-x-2">
                                <div className="min-w-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 25 24" fill="none">
                                        <path d="M12.5 11.1075L22.085 4.95C21.6996 4.66096 21.2317 4.50323 20.75 4.5H4.24998C3.76828 4.50323 3.30033 4.66096 2.91498 4.95L12.5 11.1075Z" fill="black"/>
                                        <path d="M12.905 12.6303L12.7775 12.6903H12.7175C12.6484 12.7212 12.5751 12.7414 12.5 12.7503C12.4377 12.7582 12.3748 12.7582 12.3125 12.7503H12.2525L12.125 12.6903L2.075 6.19531C2.02698 6.37647 2.00179 6.56291 2 6.75031V17.2503C2 17.847 2.23705 18.4193 2.65901 18.8413C3.08097 19.2633 3.65326 19.5003 4.25 19.5003H20.75C21.3467 19.5003 21.919 19.2633 22.341 18.8413C22.7629 18.4193 23 17.847 23 17.2503V6.75031C22.9982 6.56291 22.973 6.37647 22.925 6.19531L12.905 12.6303Z" fill="black"/>
                                    </svg>
                                </div>
                                <div>{contactData.email}</div>
                            </a>
                        </li>
                        <li className="capitalize cursor-pointer flex">
                            <a target="_blank" href="https://maps.app.goo.gl/uMgb61PbfuKiYHxq8"  rel="noopener noreferrer" className="flex items-center space-x-2">
                                <div className="min-w-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 15 15" fill="none">
                                        <g clipPath="url(#clip0_203_2297)">
                                            <path d="M7.5 7.5C6.8125 7.5 6.25 6.9375 6.25 6.25C6.25 5.5625 6.8125 5 7.5 5C8.1875 5 8.75 5.5625 8.75 6.25C8.75 6.9375 8.1875 7.5 7.5 7.5ZM11.25 6.375C11.25 4.10625 9.59375 2.5 7.5 2.5C5.40625 2.5 3.75 4.10625 3.75 6.375C3.75 7.8375 4.96875 9.775 7.5 12.0875C10.0312 9.775 11.25 7.8375 11.25 6.375ZM7.5 1.25C10.125 1.25 12.5 3.2625 12.5 6.375C12.5 8.45 10.8313 10.9062 7.5 13.75C4.16875 10.9062 2.5 8.45 2.5 6.375C2.5 3.2625 4.875 1.25 7.5 1.25Z" fill="#202020"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_203_2297">
                                                <rect width="15" height="15" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div>{i18n.language == "en"?contactData.location_en:contactData.location_ar}</div>
                            </a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="final-footer py-2 px-3">
            <div className="md:grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 flex-col-reverse flex">
                <div className="flex justify-center items-center  md:justify-start">
                    <p> {t("final-hint-1")} <a className='link-li' href='/' target='_blank'>Foreshore</a></p> &nbsp; | &nbsp;
                    <p> {t("final-hint-2")} <a className='link-li' href='https://arizglobal.com' target='_blank'>ArizGlobal</a></p>
                </div>
               
                <div className="flex justify-center items-center md:justify-end">
                    <ul className="flex gap-4">
                        <li className="capitalize">
                            <Link  to="/terms&conditions">
                                {t("terms-and-conditions")}
                            </Link>

                        </li>
                        <li className="capitalize">
                            <Link  to="/privacyPolicy">
                                {t("privacy-policy")}
                            </Link>

                        </li>
                    </ul>
                    
                    
                </div>

            </div>
         
        </div>
    </footer> );
}

export default Footer;