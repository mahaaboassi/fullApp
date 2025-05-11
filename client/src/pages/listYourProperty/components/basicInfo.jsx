import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';

import InputWithIcon from "../../../components/inputWithIcons";

// for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Dropdown from '../../../components/dropdown';

const validationSchema = Yup.object({
    type: Yup.string().required('Type is required'),
    size: Yup.string().required('Size is required'),
    bedrooms: Yup.number()
    .typeError('Bedrooms must be a number') // Ensures input is a number
    .required('Bedrooms is required')      // Ensures the field is not empty
    .positive('Bedrooms must be a positive number') // Ensures a positive value
    .integer('Bedrooms must be a whole number.') ,// (Optional) Ensures the value is a whole number
    bathrooms: Yup.number()
    .typeError('Bathrooms must be a number') // Ensures input is a number
    .required('Bathrooms is required')      // Ensures the field is not empty
    .positive('Bathrooms must be a positive number') // Ensures a positive value
    .integer('Bathrooms must be a whole number.') ,// (Optional) Ensures the value is a whole number
    furnishing : Yup.string().required('Frunishing is required'),
    ready : Yup.string().required('Ready is required'),
    title : Yup.string().required('Title is required'),
  });


function BasicInformation({nextStep}) {
    const {t,i18n} = useTranslation()
    const { register, handleSubmit, formState: { errors },clearErrors,watch,setValue } = useForm(
        // {resolver: yupResolver(validationSchema),
        // defaultValues: JSON.parse(localStorage.getItem("basic-info") || '{}'), 
        //  mode: 'onChange'   }
    );
    const onSubmit = (data) => {
        localStorage.setItem("basic-info",JSON.stringify(data))
        nextStep(2)
        
    }
   // Simplify useEffect
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("basic-info") || '{}');
        Object.keys(data).forEach(key => setValue(key, data[key]));
    }, [setValue]);

    return ( <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
                <div className='pb-2 label-title'>
                    {t("property-type")}
                </div>

                <Dropdown trigger={watch("type") || "type"} content={["apartment","studio","villa"]} icon={<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 16" fill="none">
                    <path d="M7.47965 0.000297778C7.34639 0.00477873 7.21807 0.0511048 7.11344 0.132507L1.19141 4.72617C0.439782 5.30939 0 6.2006 0 7.14279V14.9744C0 15.5338 0.473502 16 1.04167 16H5.20833C5.7765 16 6.25 15.5338 6.25 14.9744V10.8719C6.25 10.7508 6.3354 10.6668 6.45833 10.6668H8.54167C8.6646 10.6668 8.75 10.7508 8.75 10.8719V14.9744C8.75 15.5338 9.2235 16 9.79167 16H13.9583C14.5265 16 15 15.5338 15 14.9744V7.14279C15 6.2006 14.5602 5.30939 13.8086 4.72617L7.88656 0.132507C7.77098 0.0426112 7.62687 -0.00421137 7.47965 0.000297778ZM7.5 1.39931L13.0355 5.6933C13.4872 6.0438 13.75 6.57692 13.75 7.14279V14.7693H10V10.8719C10 10.0863 9.33956 9.43602 8.54167 9.43602H6.45833C5.66044 9.43602 5 10.0863 5 10.8719V14.7693H1.25V7.14279C1.25 6.57692 1.51281 6.0438 1.96452 5.6933L7.5 1.39931Z" fill="#27CBBE"/>
                    </svg>}  returnedValue={(res)=>{
                        setValue("type", res) 
                        clearErrors("type");
                        }}  />
                    {errors.type && <p className="p-0.5 text-error">{errors.type.message}</p>}
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("property-size")}
                </div>
                <div>
                    <InputWithIcon register={register("size")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M8.08617 2.4478e-06C8.01043 -0.000185927 7.93348 0.010493 7.86068 0.0338523L0.568761 2.39746C0.480517 2.41856 0.396065 2.45653 0.318851 2.51078C0.118831 2.65169 0 2.88541 0 3.13332V12.9174C0 13.2158 0.171122 13.4871 0.438061 13.6077L7.786 16.9352C7.88086 16.9782 7.98256 17 8.0833 17C8.18478 17 8.28575 16.9789 8.38061 16.9352C9.07847 16.6173 15.2126 13.8235 15.595 13.6268C15.8443 13.4987 16.0007 13.2368 16 12.9513L15.9756 3.1348C15.9756 3.11596 15.9756 3.09552 15.9741 3.07593C15.9521 2.7715 15.7524 2.51078 15.4686 2.41659L8.31023 0.0353241C8.23743 0.0112112 8.16192 0.00019083 8.08617 2.4478e-06ZM8.07899 1.54385L13.1332 3.22457L8.0833 5.13047L2.98312 3.19661L8.07899 1.54385ZM1.47074 4.22829L7.34793 6.45797V15.0882L1.47074 12.4273V4.22829ZM14.5077 4.31071L14.5278 12.4715C13.424 12.9846 10.424 14.3558 8.81867 15.0867V6.45944L14.5077 4.31071ZM14.2492 5.47338L13.5167 5.73976L12.902 10.6789L12.0991 6.29608L11.4614 6.5139L10.6815 11.6944L9.97199 7.04666L9.14614 7.3366L10.1846 13.4384L11.0363 13.0263L11.7688 8.16077L12.5472 12.47L13.3745 12.13L14.2492 5.47338ZM4.20826 6.27253C3.74424 6.27253 2.69587 6.27301 2.69587 7.82227C2.69587 8.79055 3.64608 9.55816 4.46822 10.2183C5.34257 10.9205 5.71993 12.4709 4.586 12.2772C3.45206 12.0835 3.47576 10.5818 3.47576 10.5818C3.47576 10.5818 3.1454 10.4369 2.62549 10.2433C2.5549 11.6953 3.64105 12.8577 4.586 13.0513C5.08531 13.1538 5.99436 13.2449 6.05099 11.768C6.09731 10.533 5.40609 9.93252 4.91634 9.5648C4.53247 9.2762 3.45135 8.40324 3.45135 7.82227C3.45135 7.62861 3.52289 7.02255 4.20826 7.04666C5.2238 7.08283 5.29551 8.64497 5.29551 8.64497C5.29551 8.64497 5.7204 8.83845 6.09838 8.9349C6.09838 7.14376 5.15321 6.27253 4.20826 6.27253Z" fill="#27CBBE"/>
                        </svg>} placeholder={t("size")} />
                     {errors.size && <p className="p-0.5 text-error">{errors.size.message}</p>}
                </div>
                
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("bedrooms")}
                </div>
                <div>
                    <InputWithIcon type="number" register={register("bedrooms")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M7.28571 0C5.95407 0 4.85714 1.09693 4.85714 2.42857H1.61905C0.734187 2.42857 0 3.16276 0 4.04762V8.90476H1.61905C2.07645 8.90476 2.42857 9.25688 2.42857 9.71429C2.42857 10.1717 2.07645 10.5238 1.61905 10.5238H0V15.381C0 16.2658 0.734187 17 1.61905 17H6.47619V15.381C6.47619 14.9235 6.82831 14.5714 7.28571 14.5714C7.74312 14.5714 8.09524 14.9235 8.09524 15.381V17H12.9524C13.8372 17 14.5714 16.2658 14.5714 15.381V12.1429C15.9031 12.1429 17 11.0459 17 9.71429C17 8.38264 15.9031 7.28571 14.5714 7.28571V4.04762C14.5714 3.16276 13.8372 2.42857 12.9524 2.42857H9.71429C9.71429 1.09693 8.61736 0 7.28571 0ZM7.28571 1.61905C7.74312 1.61905 8.09524 1.97117 8.09524 2.42857V4.04762H12.9524V8.90476H14.5714C15.0288 8.90476 15.381 9.25688 15.381 9.71429C15.381 10.1717 15.0288 10.5238 14.5714 10.5238H12.9524V15.381H9.71429C9.71429 14.0493 8.61736 12.9524 7.28571 12.9524C5.95407 12.9524 4.85714 14.0493 4.85714 15.381H1.61905V12.1429C2.95069 12.1429 4.04762 11.0459 4.04762 9.71429C4.04762 8.38264 2.95069 7.28571 1.61905 7.28571V4.04762H6.47619V2.42857C6.47619 1.97117 6.82831 1.61905 7.28571 1.61905Z" fill="#27CBBE"/>
                        </svg>} placeholder={t("bedrooms")} />
                    {errors.bedrooms && <p className="p-0.5 text-error">{errors.bedrooms.message}</p>}
                </div>
                
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("bathrooms")}
                </div>
                <div>
                    <InputWithIcon type={"number"} register={register("bathrooms")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M7.28571 0C5.95407 0 4.85714 1.09693 4.85714 2.42857H1.61905C0.734187 2.42857 0 3.16276 0 4.04762V8.90476H1.61905C2.07645 8.90476 2.42857 9.25688 2.42857 9.71429C2.42857 10.1717 2.07645 10.5238 1.61905 10.5238H0V15.381C0 16.2658 0.734187 17 1.61905 17H6.47619V15.381C6.47619 14.9235 6.82831 14.5714 7.28571 14.5714C7.74312 14.5714 8.09524 14.9235 8.09524 15.381V17H12.9524C13.8372 17 14.5714 16.2658 14.5714 15.381V12.1429C15.9031 12.1429 17 11.0459 17 9.71429C17 8.38264 15.9031 7.28571 14.5714 7.28571V4.04762C14.5714 3.16276 13.8372 2.42857 12.9524 2.42857H9.71429C9.71429 1.09693 8.61736 0 7.28571 0ZM7.28571 1.61905C7.74312 1.61905 8.09524 1.97117 8.09524 2.42857V4.04762H12.9524V8.90476H14.5714C15.0288 8.90476 15.381 9.25688 15.381 9.71429C15.381 10.1717 15.0288 10.5238 14.5714 10.5238H12.9524V15.381H9.71429C9.71429 14.0493 8.61736 12.9524 7.28571 12.9524C5.95407 12.9524 4.85714 14.0493 4.85714 15.381H1.61905V12.1429C2.95069 12.1429 4.04762 11.0459 4.04762 9.71429C4.04762 8.38264 2.95069 7.28571 1.61905 7.28571V4.04762H6.47619V2.42857C6.47619 1.97117 6.82831 1.61905 7.28571 1.61905Z" fill="#27CBBE"/>
                        </svg>} placeholder={t("bathrooms")} />
                    {errors.bathrooms && <p className="p-0.5 text-error">{errors.bathrooms.message}</p>}
                </div>
                
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("furnishing")}
                </div>
                <div>
                    <Dropdown trigger={watch("furnishing")?watch("furnishing"):"furnishing"} content={["yes","no"]} icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M0 0V14H14V0H0ZM1.4 1.4H12.6V12.6H1.4V1.4ZM10.7844 3.63125L6.3 8.09375L4.00312 5.79688L2.99688 6.80312L5.79688 9.60312L6.3 10.0844L6.80312 9.60312L11.7688 4.61562L10.7844 3.63125Z" fill="#27CBBE"/>
                        <path d="M0 0V14H14V0H0ZM1.4 1.4H12.6V12.6H1.4V1.4ZM10.7844 3.63125L6.3 8.09375L4.00312 5.79688L2.99688 6.80312L5.79688 9.60312L6.3 10.0844L6.80312 9.60312L11.7688 4.61562L10.7844 3.63125Z" fill="#27CBBE"/>
                        </svg>}  returnedValue={(res)=>{
                        setValue("furnishing", res) 
                        clearErrors("furnishing");
                        }}  />
                    {errors.furnishing && <p className="p-0.5 text-error">{errors.furnishing.message}</p>}
                </div>
                
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("ready")}
                </div>
                <div className='relative'>
                    <Dropdown trigger={watch("ready")?watch("ready"):"ready"} content={["yes","no"]} icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M0 0V14H14V0H0ZM1.4 1.4H12.6V12.6H1.4V1.4ZM10.7844 3.63125L6.3 8.09375L4.00312 5.79688L2.99688 6.80312L5.79688 9.60312L6.3 10.0844L6.80312 9.60312L11.7688 4.61562L10.7844 3.63125Z" fill="#27CBBE"/>
                        <path d="M0 0V14H14V0H0ZM1.4 1.4H12.6V12.6H1.4V1.4ZM10.7844 3.63125L6.3 8.09375L4.00312 5.79688L2.99688 6.80312L5.79688 9.60312L6.3 10.0844L6.80312 9.60312L11.7688 4.61562L10.7844 3.63125Z" fill="#27CBBE"/>
                        </svg>}  returnedValue={(res)=>{
                            setValue("ready", res) 
                            clearErrors("ready");
                                }}  />
                    {errors.ready && <p className="p-0.5 text-error">{errors.ready.message}</p>}
                    
                </div>
                
            </div>
            <div>
                <div className='pb-2 label-title'>
                    {t("title-deep")}
                </div>
                <div>
                    <InputWithIcon register={register("title")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2.5 3.33301V4.99967H17.5V3.33301H2.5ZM5 6.66634C4.77899 6.66636 4.56704 6.75417 4.41077 6.91044C4.25449 7.06672 4.16669 7.27867 4.16667 7.49967V11.6663C4.16669 11.8873 4.25449 12.0993 4.41077 12.2556C4.56704 12.4118 4.77899 12.4997 5 12.4997H6.06608L7.17611 15.833H2.5V17.4997H17.5V15.833H12.8239L13.9339 12.4997H15C15.221 12.4997 15.433 12.4118 15.5892 12.2556C15.7455 12.0993 15.8333 11.8873 15.8333 11.6663V7.49967C15.8333 7.27867 15.7455 7.06672 15.5892 6.91044C15.433 6.75417 15.221 6.66636 15 6.66634H5ZM5.83333 8.33301H14.1667V10.833H5.83333V8.33301ZM7.82389 12.4997H12.1761L11.0661 15.833H8.93392L7.82389 12.4997Z" fill="#27CBBE"/>
                            </svg>} placeholder={t("title")} />
                    {errors.title && <p className="p-0.5 text-error">{errors.title.message}</p>}
                </div>
                
            </div>
        </div>
        <div className=' py-2'>
            <button type="submit" className='btn-main p-5 !w-full'>{t("next")}</button>
        </div>
    </form> );
}

export default BasicInformation;