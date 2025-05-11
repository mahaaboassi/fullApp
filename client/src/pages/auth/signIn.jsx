import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import InputWithIcon from "../../components/inputWithIcons";
import img from "../../images/logo_main.webp"
// for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Helper } from '../../functionality/helper';
import { apiRoutes } from '../../functionality/apiRoutes';
import { useDispatch } from 'react-redux';
import { changeNotification } from '../../redux/actions/notification';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format') // Ensures the email is valid
    .required('Email is required'),
    password: Yup.string().min(6,"Password must be at least 6 characters long").required('Password is required'),   
  });
function SignIn() {
    const { t  } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm(
        {resolver: yupResolver(validationSchema), 
            mode: 'onChange'   }
    );
    const onSubmit = async (data) => {
        setloading(true)
        const {response ,message} = await Helper({
            url : apiRoutes.auth.signIn,
            method : "POST",
            body : {
                email : data.email,
                password : data.password
            }
        })
        if(response){
            
            if(response.error == 1){
                dispatch(changeNotification({
                    isOpen : true,
                    bgColor : "bg-error",
                    message : response.message
                }))
            }else{
                
                localStorage.setItem("$user",JSON.stringify({
                    name : response.data.name || "",
                    email : response.data.email || "",
                    role : response.data.role || "",
                    id : response.data.userId || "",
                    country_dial : response.data.country? response.data.country.country_dial : "",
                    phone_number : response.data.country? response.data.country.phone_number : ""
                }))
                localStorage.setItem("$-TOKEN",response.data.token)
                dispatch(changeNotification({
                    isOpen : true,
                    bgColor : "bg-successfully",
                    message : message
                }))
                navigate("/")
            }
            setloading(false)
            
        } else{
            setloading(false)
            dispatch(changeNotification({
                isOpen : true,
                bgColor : "bg-error",
                message : message
            }))
        }  
    }
    const [loading, setloading] = useState(false)
    useEffect(()=>{ 
        if(localStorage.getItem("$user")) navigate("/")
        window.scrollTo({ top: 0,  behavior: 'smooth' })
    },[])
    return ( <div className='card-auth px-2  md:px-8'>
        <Helmet>
            <title>Foreshore | Sign In</title>
        </Helmet>
        <div className="flex justify-center pb-5">
            <img className='w-20' src={img} alt="logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <InputWithIcon register={register("email")} placeholder={t("email")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12.5 1.75H1.5C0.947715 1.75 0.5 2.19772 0.5 2.75V11.25C0.5 11.8023 0.947715 12.25 1.5 12.25H12.5C13.0523 12.25 13.5 11.8023 13.5 11.25V2.75C13.5 2.19772 13.0523 1.75 12.5 1.75Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M0.5 3L6.36 6.52424C6.53969 6.62973 6.76615 6.6875 7 6.6875C7.23385 6.6875 7.46031 6.62973 7.64 6.52424L13.5 3" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>} />
                {errors.email && <p className="p-0.5 text-error">{errors.email.message}</p>}
            </div>
            <div className='py-5'>
                <InputWithIcon register={register("password")} isPassword={true} type="password" placeholder={t("password")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M13.3573 6.67871H3.643C2.97237 6.67871 2.42871 7.22237 2.42871 7.893V15.1787C2.42871 15.8494 2.97237 16.393 3.643 16.393H13.3573C14.0279 16.393 14.5716 15.8494 14.5716 15.1787V7.893C14.5716 7.22237 14.0279 6.67871 13.3573 6.67871Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.75 6.67885V4.85742C12.75 3.73025 12.3023 2.64924 11.5052 1.85222C10.7082 1.05519 9.62717 0.607422 8.5 0.607422C7.37283 0.607422 6.29182 1.05519 5.4948 1.85222C4.69777 2.64924 4.25 3.73025 4.25 4.85742V6.67885" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.49972 12.143C8.83503 12.143 9.10686 11.8712 9.10686 11.5359C9.10686 11.2005 8.83503 10.9287 8.49972 10.9287C8.16441 10.9287 7.89258 11.2005 7.89258 11.5359C7.89258 11.8712 8.16441 12.143 8.49972 12.143Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>} />
                {errors.password && <p className="p-0.5 text-error">{errors.password.message}</p>}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-1'>
                    <input type='checkbox' />
                    <p>{t("remember-me")}</p>
                </div>
                <div>
                    <p className='auth-link'>{t("forget-password")} ?</p>
                </div>
            </div>
            <div className='w-full py-5'>
                <button type='submit' className='btn-main !w-full'>{loading?<div className='loader  '></div>:t("submit")}</button>
            </div>
            {/* <div className='flex gap-3'>
                <div>
                    
                    <p>{t("new-member")}</p>
                </div>
                <div>
                    <p className='auth-link'><Link to={"/auth/signUp"}>{t("sign-up")} </Link></p>
                </div>
            </div> */}
            {/* <div className='flex justify-center  py-4'>
                <div className='flex items-center w-16 sm:w-32  px-2' > <div className='line-auth' ></div></div>
                <div> <p>{t("or-continue")}</p></div>
                <div className='flex items-center w-16 sm:w-32 px-2' ><div className='line-auth' ></div></div>
            </div> */}
            {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div>
                    <div className='flex btn-social'>
                        <div> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g clipPath="url(#clip0_150_643)">
                            <path d="M9 7.36328V10.8487H13.8436C13.6309 11.9696 12.9927 12.9188 12.0354 13.5569L14.9563 15.8233C16.6581 14.2525 17.64 11.9452 17.64 9.20428C17.64 8.56611 17.5827 7.95242 17.4763 7.36338L9 7.36328Z" fill="#4285F4"/>
                            <path d="M3.95645 10.7129L3.29768 11.2172L0.96582 13.0335C2.44673 15.9708 5.48196 17.9999 9.00011 17.9999C11.43 17.9999 13.4673 17.1981 14.9564 15.8235L12.0355 13.5572C11.2337 14.0972 10.211 14.4245 9.00011 14.4245C6.66012 14.4245 4.672 12.8454 3.96013 10.7181L3.95645 10.7129Z" fill="#34A853"/>
                            <path d="M0.965384 4.9668C0.351781 6.17766 0 7.54404 0 9.00038C0 10.4567 0.351781 11.8231 0.965384 13.034C0.965384 13.0421 3.95998 10.7103 3.95998 10.7103C3.77998 10.1703 3.67359 9.59764 3.67359 9.00029C3.67359 8.40293 3.77998 7.83024 3.95998 7.29025L0.965384 4.9668Z" fill="#FBBC05"/>
                            <path d="M9.00029 3.58363C10.3258 3.58363 11.5039 4.0418 12.4448 4.92545L15.0221 2.34821C13.4594 0.891874 11.4303 0 9.00029 0C5.48214 0 2.44673 2.02091 0.96582 4.96637L3.96033 7.29001C4.6721 5.16271 6.66031 3.58363 9.00029 3.58363Z" fill="#EA4335"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_150_643">
                            <rect width="18" height="18" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </div>
                        <div>Google</div>

                    </div>
                </div>
                <div>
                    <div className='flex btn-social'>
                        <div> <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path d="M18.2975 9.24086C18.2975 13.9081 14.8722 17.7666 10.4228 18.3929C10.0067 18.4514 9.581 18.4817 9.14902 18.4817C8.65014 18.4817 8.16074 18.4413 7.68345 18.3636C3.32677 17.6553 0 13.8405 0 9.24086C0 4.13726 4.09591 0 9.1485 0C14.2011 0 18.297 4.13726 18.297 9.24086H18.2975Z" fill="#1877F7"/>
                            <path d="M10.4232 7.41937V9.43239H12.8887L12.4983 12.1446H10.4232V18.3928C10.0071 18.4514 9.5814 18.4817 9.14942 18.4817C8.65053 18.4817 8.16113 18.4412 7.68385 18.3636V12.1446H5.41016V9.43239H7.68385V6.96972C7.68385 5.44146 8.91025 4.20215 10.4238 4.20215V4.20375C10.428 4.20375 10.4322 4.20215 10.4364 4.20215H12.8892V6.54722H11.2867C10.8099 6.54722 10.4238 6.93726 10.4238 7.41884L10.4232 7.41937Z" fill="white"/>
                            </svg>
                        </div>
                        <div>Facebook</div>

                    </div>
                    
                </div>

            </div> */}
        </form>
    </div> );
}

export default SignIn;