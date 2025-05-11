import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';

import InputWithIcon from "../../../components/inputWithIcons";

// for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Dropdown from '../../../components/dropdown';

const validationSchema = Yup.object({
    city: Yup.string().required('City is required'),
    region: Yup.string().required('Region is required'),
    street: Yup.string().required('Street is required'),
    building : Yup.string().required('Building is required'),
    floor : Yup.string().required('Floor is required'),

  });


function Location({nextStep}) {
    const {t,i18n} = useTranslation()
    const { register, handleSubmit, formState: { errors },clearErrors,watch,setValue } = useForm(
        // {resolver: yupResolver(validationSchema),
        //  mode: 'onChange'}
        );
    const onSubmit = (data) => {
        localStorage.setItem("location",JSON.stringify(data))
        nextStep(3)
        
    }
    const [isOpen, setIsOpen] = useState({
        type : false,
        furnishing : false,
        ready : false

    })
    useEffect(()=>{
        if(localStorage.hasOwnProperty("location")){
            const data = JSON.parse(localStorage.getItem("location"))
            setValue("city",data.city)
            setValue("street",data.street)
            setValue("building",data.building)
            setValue("floor",data.floor)
            setValue("region",data.region)

        }
    },[])
    return ( <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            
            
         <div>
                <div className='pb-2 label-title'>
                    {t("city")}
                </div>
                <div>
                    <InputWithIcon register={register("city")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path d="M12.072 2.44727C11.024 2.44727 10.0188 2.86363 9.27764 3.60476C8.53648 4.34589 8.12012 5.35108 8.12012 6.3992C8.12012 9.49235 11.1375 13.2137 11.9281 14.1277C11.9705 14.1762 12.0305 14.206 12.0949 14.2105C12.1592 14.215 12.2227 14.1939 12.2715 14.1517L12.2956 14.1277C13.0757 13.2102 16.0244 9.49191 16.0244 6.3992C16.0244 5.88019 15.9222 5.36626 15.7236 4.88676C15.525 4.40726 15.2338 3.97158 14.8668 3.6046C14.4997 3.23763 14.0641 2.94654 13.5846 2.74796C13.105 2.54938 12.5911 2.4472 12.072 2.44727ZM12.072 8.07133C11.6884 8.07124 11.3134 7.9574 10.9945 7.74422C10.6755 7.53102 10.4269 7.22806 10.2802 6.8736C10.1334 6.51916 10.0951 6.12915 10.1699 5.75289C10.2448 5.37663 10.4295 5.03102 10.7008 4.75975C10.9721 4.48848 11.3177 4.30374 11.6939 4.22887C12.0702 4.15401 12.4602 4.19238 12.8146 4.33916C13.1691 4.48593 13.472 4.7345 13.6853 5.05344C13.8984 5.37238 14.0123 5.74738 14.0123 6.13102V6.13583C14.0112 6.64963 13.8063 7.14199 13.4425 7.50485C13.0787 7.86772 12.5858 8.07144 12.072 8.07133Z" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.9486 7.29476L16.4627 7.25977L18.5938 17.7637L14.1645 18.5503M14.1645 18.5503L7.20169 17.8145L2.40625 18.5503L3.70038 7.76726L7.63306 7.25977M14.1645 18.5503L13.4164 12.6778M7.63306 7.25977L8.197 7.28777M7.63306 7.25977L7.35219 17.8307" stroke="#27CBBE" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>} placeholder={t("city")} />
                     {errors.city && <p className="p-0.5 text-error">{errors.city.message}</p>}
                </div>
                
            </div>

            <div>
                <div className='pb-2 label-title'>
                    {t("region")}
                </div>
                <div>
                    <InputWithIcon register={register("region")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path d="M7.875 16.625L3.31625 18.1449C3.23726 18.1712 3.15313 18.1785 3.07081 18.1659C2.98849 18.1534 2.91035 18.1213 2.84281 18.0726C2.77528 18.0239 2.72031 17.9598 2.68244 17.8857C2.64457 17.8115 2.62488 17.7294 2.625 17.6461V4.75388C2.62503 4.64375 2.65968 4.53641 2.72406 4.44706C2.78844 4.35772 2.87929 4.29088 2.98375 4.256L7.875 2.625M7.875 16.625L13.125 18.375M7.875 16.625V2.625M7.875 2.625L13.125 4.375M13.125 18.375L18.0163 16.7449C18.1208 16.71 18.2118 16.6429 18.2762 16.5534C18.3406 16.4639 18.3752 16.3564 18.375 16.2461V3.353C18.375 3.26981 18.3552 3.1878 18.3173 3.11375C18.2794 3.0397 18.2243 2.97573 18.1569 2.9271C18.0893 2.87848 18.0113 2.84659 17.9289 2.83408C17.8467 2.82157 17.7627 2.82878 17.6837 2.85513L13.125 4.375M13.125 18.375V4.375" stroke="#27CBBE" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>} placeholder={t("region")} />
                     {errors.region && <p className="p-0.5 text-error">{errors.region.message}</p>}
                </div>
                
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("street")}
                </div>
                <div>
                    <InputWithIcon register={register("street")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <g clipPath="url(#clip0_154_1577)">
                        <path d="M0.536133 14.4657L3.75042 0.537109M7.5004 0.537109V2.67997M7.5004 6.42994V8.57281M7.5004 12.3228V14.4657M14.4647 14.4657L11.2504 0.537109" stroke="#27CBBE" stroke-width="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_154_1577">
                        <rect width="15" height="15" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>} placeholder={t("street")} />
                     {errors.street && <p className="p-0.5 text-error">{errors.street.message}</p>}
                </div>
                
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("building")}
                </div>
                <div>
                    <InputWithIcon register={register("building")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path d="M16.3609 4.22461H12.1387V5.28016H16.3609V16.3635H12.1387V17.419H17.4164V5.28016C17.4164 5.00021 17.3052 4.73173 17.1073 4.53377C16.9093 4.33581 16.6408 4.22461 16.3609 4.22461Z" fill="#27CBBE"/>
                        <path d="M10.4924 1.58301H3.23021C2.93347 1.58301 2.64887 1.70089 2.43904 1.91073C2.22921 2.12056 2.11133 2.40515 2.11133 2.70189V17.4163H11.6113V2.70189C11.6113 2.40515 11.4934 2.12056 11.2836 1.91073C11.0738 1.70089 10.7892 1.58301 10.4924 1.58301ZM10.5558 16.3608H8.97244V14.7775H4.75021V16.3608H3.16688V2.70189C3.16688 2.69358 3.16852 2.68534 3.1717 2.67766C3.17488 2.66997 3.17955 2.66299 3.18543 2.65711C3.19131 2.65124 3.19829 2.64656 3.20597 2.64338C3.21366 2.6402 3.22189 2.63856 3.23021 2.63856H10.4924C10.5008 2.63856 10.509 2.6402 10.5167 2.64338C10.5243 2.64656 10.5313 2.65124 10.5373 2.65711C10.5431 2.66299 10.5478 2.66997 10.5509 2.67766C10.5541 2.68534 10.5558 2.69358 10.5558 2.70189V16.3608Z" fill="#27CBBE"/>
                        <path d="M4.22266 4.22461H5.27822V5.28016H4.22266V4.22461Z" fill="#27CBBE"/>
                        <path d="M6.33301 4.22461H7.38856V5.28016H6.33301V4.22461Z" fill="#27CBBE"/>
                        <path d="M8.44434 4.22461H9.49994V5.28016H8.44434V4.22461Z" fill="#27CBBE"/>
                        <path d="M4.22266 6.85938H5.27822V7.91494H4.22266V6.85938Z" fill="#27CBBE"/>
                        <path d="M6.33301 6.85938H7.38856V7.91494H6.33301V6.85938Z" fill="#27CBBE"/>
                        <path d="M8.44434 6.85938H9.49994V7.91494H8.44434V6.85938Z" fill="#27CBBE"/>
                        <path d="M4.22266 9.5H5.27822V10.5555H4.22266V9.5Z" fill="#27CBBE"/>
                        <path d="M6.33301 9.5H7.38856V10.5555H6.33301V9.5Z" fill="#27CBBE"/>
                        <path d="M8.44434 9.5H9.49994V10.5555H8.44434V9.5Z" fill="#27CBBE"/>
                        <path d="M4.22266 12.1406H5.27822V13.1962H4.22266V12.1406Z" fill="#27CBBE"/>
                        <path d="M6.33301 12.1406H7.38856V13.1962H6.33301V12.1406Z" fill="#27CBBE"/>
                        <path d="M8.44434 12.1406H9.49994V13.1962H8.44434V12.1406Z" fill="#27CBBE"/>
                        <path d="M12.1387 6.85938H13.1942V7.91494H12.1387V6.85938Z" fill="#27CBBE"/>
                        <path d="M14.25 6.85938H15.3055V7.91494H14.25V6.85938Z" fill="#27CBBE"/>
                        <path d="M12.1387 9.5H13.1942V10.5555H12.1387V9.5Z" fill="#27CBBE"/>
                        <path d="M14.25 9.5H15.3055V10.5555H14.25V9.5Z" fill="#27CBBE"/>
                        <path d="M12.1387 12.1406H13.1942V13.1962H12.1387V12.1406Z" fill="#27CBBE"/>
                        <path d="M14.25 12.1406H15.3055V13.1962H14.25V12.1406Z" fill="#27CBBE"/>
                        </svg>} placeholder={t("building")} />
                     {errors.building && <p className="p-0.5 text-error">{errors.building.message}</p>}
                </div>
                
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("floor")}
                </div>
                <div>
                    <InputWithIcon register={register("floor")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M8.08617 2.4478e-06C8.01043 -0.000185927 7.93348 0.010493 7.86068 0.0338523L0.568761 2.39746C0.480517 2.41856 0.396065 2.45653 0.318851 2.51078C0.118831 2.65169 0 2.88541 0 3.13332V12.9174C0 13.2158 0.171122 13.4871 0.438061 13.6077L7.786 16.9352C7.88086 16.9782 7.98256 17 8.0833 17C8.18478 17 8.28575 16.9789 8.38061 16.9352C9.07847 16.6173 15.2126 13.8235 15.595 13.6268C15.8443 13.4987 16.0007 13.2368 16 12.9513L15.9756 3.1348C15.9756 3.11596 15.9756 3.09552 15.9741 3.07593C15.9521 2.7715 15.7524 2.51078 15.4686 2.41659L8.31023 0.0353241C8.23743 0.0112112 8.16192 0.00019083 8.08617 2.4478e-06ZM8.07899 1.54385L13.1332 3.22457L8.0833 5.13047L2.98312 3.19661L8.07899 1.54385ZM1.47074 4.22829L7.34793 6.45797V15.0882L1.47074 12.4273V4.22829ZM14.5077 4.31071L14.5278 12.4715C13.424 12.9846 10.424 14.3558 8.81867 15.0867V6.45944L14.5077 4.31071ZM14.2492 5.47338L13.5167 5.73976L12.902 10.6789L12.0991 6.29608L11.4614 6.5139L10.6815 11.6944L9.97199 7.04666L9.14614 7.3366L10.1846 13.4384L11.0363 13.0263L11.7688 8.16077L12.5472 12.47L13.3745 12.13L14.2492 5.47338ZM4.20826 6.27253C3.74424 6.27253 2.69587 6.27301 2.69587 7.82227C2.69587 8.79055 3.64608 9.55816 4.46822 10.2183C5.34257 10.9205 5.71993 12.4709 4.586 12.2772C3.45206 12.0835 3.47576 10.5818 3.47576 10.5818C3.47576 10.5818 3.1454 10.4369 2.62549 10.2433C2.5549 11.6953 3.64105 12.8577 4.586 13.0513C5.08531 13.1538 5.99436 13.2449 6.05099 11.768C6.09731 10.533 5.40609 9.93252 4.91634 9.5648C4.53247 9.2762 3.45135 8.40324 3.45135 7.82227C3.45135 7.62861 3.52289 7.02255 4.20826 7.04666C5.2238 7.08283 5.29551 8.64497 5.29551 8.64497C5.29551 8.64497 5.7204 8.83845 6.09838 8.9349C6.09838 7.14376 5.15321 6.27253 4.20826 6.27253Z" fill="#27CBBE"/>
                        </svg>} placeholder={t("floor")} />
                     {errors.floor && <p className="p-0.5 text-error">{errors.floor.message}</p>}
                </div>
                
            </div>
        </div>
        <div className=' py-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <div><button onClick={()=>{
                localStorage.removeItem("location")
                nextStep(1)}} type="submit" className='btn-grey p-5 !w-full'>{t("back")}</button></div>
            <div><button type="submit" className='btn-main p-5 !w-full'>{t("next")}</button></div>
        </div>
    </form> );
}

export default Location;