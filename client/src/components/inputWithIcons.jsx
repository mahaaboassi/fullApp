import { useEffect, useState } from "react";

function InputWithIcon({icon,placeholder,isPassword=false,onChange, type,register}) {
    const [typeInput, settypeInput] = useState("")
    const [ valueInput, setValueInput ] = useState("")
    useEffect(()=>{
        settypeInput(type)
    },[type])
    return (  <div className="input-with-icon w-full ">
        <div className="px-2 sm:px-3 text-gray-500">
          {icon}
        </div>
        <input
          {...register}
          type={typeInput}
          onChange={(e)=>{
                    if (register?.onChange) register.onChange(e);  // Call register's onChange
                    if (onChange) onChange(e);  // Call custom onChange if provided
                     setValueInput(e.target.value)
        }}
          placeholder={placeholder}
          className="outline-none bg-transparent flex-1 sm:p-2"
        />

        {isPassword && <div className="cursor-pointer px-2" onClick={()=>{
            if(typeInput == "password"){
                settypeInput("text")
            }else{
                settypeInput("password")
            }
        }}>
            { typeInput=="password"?<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none">
                    <g clipPath="url(#clip0_150_607)">
                    <path d="M11.0003 5.95833C14.4745 5.95833 17.5728 7.91083 19.0853 11C17.5728 14.0892 14.4837 16.0417 11.0003 16.0417C7.51699 16.0417 4.42783 14.0892 2.91533 11C4.42783 7.91083 7.52616 5.95833 11.0003 5.95833ZM11.0003 4.125C6.41699 4.125 2.50283 6.97583 0.916992 11C2.50283 15.0242 6.41699 17.875 11.0003 17.875C15.5837 17.875 19.4978 15.0242 21.0837 11C19.4978 6.97583 15.5837 4.125 11.0003 4.125ZM11.0003 8.70833C12.2653 8.70833 13.292 9.735 13.292 11C13.292 12.265 12.2653 13.2917 11.0003 13.2917C9.73532 13.2917 8.70866 12.265 8.70866 11C8.70866 9.735 9.73532 8.70833 11.0003 8.70833ZM11.0003 6.875C8.72699 6.875 6.87533 8.72667 6.87533 11C6.87533 13.2733 8.72699 15.125 11.0003 15.125C13.2737 15.125 15.1253 13.2733 15.1253 11C15.1253 8.72667 13.2737 6.875 11.0003 6.875Z" fill="#777978"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_150_607">
                    <rect width="22" height="22" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clipPath="url(#clip0_296_714)">
                            <path d="M10 4.99984C13.1584 4.99984 15.975 6.77484 17.35 9.58317C16.8584 10.5998 16.1667 11.4748 15.3417 12.1832L16.5167 13.3582C17.675 12.3332 18.5917 11.0498 19.1667 9.58317C17.725 5.92484 14.1667 3.33317 10 3.33317C8.94171 3.33317 7.92504 3.49984 6.96671 3.80817L8.34171 5.18317C8.88337 5.07484 9.43337 4.99984 10 4.99984ZM9.10837 5.94984L10.8334 7.67484C11.3084 7.88317 11.6917 8.2665 11.9 8.7415L13.625 10.4665C13.6917 10.1832 13.7417 9.88317 13.7417 9.57484C13.75 7.50817 12.0667 5.83317 10 5.83317C9.69171 5.83317 9.40004 5.87484 9.10837 5.94984ZM1.67504 3.22484L3.90837 5.45817C2.55004 6.52484 1.47504 7.9415 0.833374 9.58317C2.27504 13.2415 5.83337 15.8332 10 15.8332C11.2667 15.8332 12.4834 15.5915 13.6 15.1498L16.45 17.9998L17.625 16.8248L2.85004 2.0415L1.67504 3.22484ZM7.92504 9.47484L10.1 11.6498C10.0667 11.6582 10.0334 11.6665 10 11.6665C8.85004 11.6665 7.91671 10.7332 7.91671 9.58317C7.91671 9.5415 7.92504 9.5165 7.92504 9.47484V9.47484ZM5.09171 6.6415L6.55004 8.09984C6.35837 8.55817 6.25004 9.05817 6.25004 9.58317C6.25004 11.6498 7.93337 13.3332 10 13.3332C10.525 13.3332 11.025 13.2248 11.475 13.0332L12.2917 13.8498C11.5584 14.0498 10.7917 14.1665 10 14.1665C6.84171 14.1665 4.02504 12.3915 2.65004 9.58317C3.23337 8.3915 4.08337 7.40817 5.09171 6.6415Z" fill="#6C6D6C"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_296_714">
                            <rect width="20" height="20" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>}
            </div>}

    </div> );
}

export default InputWithIcon;