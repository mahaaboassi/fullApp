import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MobileInput from "./mobileInput";
import InputWithIcon from "./inputWithIcons";

// for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



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


function MessageInfo({ returnedData, withoutMessage = false}) {
        const { register, handleSubmit, formState: { errors },clearErrors,watch,setValue } = useForm(
            {resolver: yupResolver(validationSchema), 
             mode: 'onChange'   }
        );
        const { t } = useTranslation()
        const onSubmit = (data) => {
            setLoading(true)
            data["country_dial"] = country.dial_code
            data["message"] = message || ""
            setIsSend(true)
            returnedData(data)
            
        }
        const [country, setCountry] = useState({})
        const [message, setMessage] = useState("")
        const [isSend, setIsSend] = useState(false)
        const [loading, setLoading] = useState(false)
    return ( <form onSubmit={handleSubmit(onSubmit)}   className="w-full flex bg-white flex-col gap-3">
        <div>
              <InputWithIcon register={register("name")} placeholder={t("name")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 10 12" fill="none">
                  <path d="M4.85709 5.28571C6.04056 5.28571 6.99995 4.32632 6.99995 3.14286C6.99995 1.95939 6.04056 1 4.85709 1C3.67362 1 2.71423 1.95939 2.71423 3.14286C2.71423 4.32632 3.67362 5.28571 4.85709 5.28571Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 11.2856H4.85714H8.71429V10.8209C8.70746 10.1676 8.53516 9.52666 8.21348 8.95803C7.8918 8.38932 7.43123 7.91146 6.8748 7.56904C6.31836 7.22661 5.68421 7.03082 5.03159 6.99992C4.97341 6.99717 4.91524 6.99573 4.85714 6.99561C4.79905 6.99573 4.74088 6.99717 4.6827 6.99992C4.03008 7.03082 3.39593 7.22661 2.83949 7.56904C2.28306 7.91146 1.82249 8.38932 1.5008 8.95803C1.17912 9.52666 1.00682 10.1676 1 10.8209V11.2856Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>} />
                  {errors.name && <p className="p-0.5 text-error">{errors.name.message}</p>}
              
          </div>
          <div className=''>
              <InputWithIcon register={register("email")}  placeholder={t("email")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12.5 1.75H1.5C0.947715 1.75 0.5 2.19772 0.5 2.75V11.25C0.5 11.8023 0.947715 12.25 1.5 12.25H12.5C13.0523 12.25 13.5 11.8023 13.5 11.25V2.75C13.5 2.19772 13.0523 1.75 12.5 1.75Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M0.5 3L6.36 6.52424C6.53969 6.62973 6.76615 6.6875 7 6.6875C7.23385 6.6875 7.46031 6.62973 7.64 6.52424L13.5 3" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>} />
                     
               {errors.email && <p className="p-0.5 text-error">{errors.email.message}</p>}
          </div>
          
          <div className='w-full small-size-auth-input ' >
              <MobileInput register={register("phone_number")}  fromChatPopup={true} returnedCountry={(ele)=>{setCountry(ele) }}/>
              {errors.phone_number && <p className="p-0.5 text-error">{errors.phone_number.message}</p>}
          </div>
          {!withoutMessage && <div className='w-full small-size-auth-input ' >
              <textarea onChange={(e)=>setMessage(e.target.value)} placeholder={"Message"}  />
          </div>}
          
      <div className=''>
          <button disabled={isSend} type="submit" className='btn-main  !w-full'>
            {loading?<div className='loader  '></div>:t("submit")}
          </button>
      </div>
    </form> );
}

export default MessageInfo;