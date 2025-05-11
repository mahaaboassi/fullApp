import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';

function Confirmations({nextStep, onSubmit,loading}) {
    const { t ,i18n } = useTranslation();
    const [location, setLoacation] = useState({})
    const [basic, setBasic] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setLoacation(JSON.parse(localStorage.getItem("location")))
        setBasic(JSON.parse(localStorage.getItem("basic-info")))
    },[])
    useEffect(()=>{setIsLoading(loading)},[loading])
    return ( <div className={`px-5 ${i18n.language == "en" ?"list-confirm":"list-confirm-ar"}`}>
        <div className='py-3'>
            <h2 className='pb-1 '>{t("basic-info")}</h2>
            <ul>
                <li><div className='ilist-conf-title'>{t("property-type")} </div>: {basic.type}</li>
                <li><div className='ilist-conf-title'>{t("property-size")}</div> : {basic.size}</li>
                <li><div className='ilist-conf-title'>{t("bedrooms")}</div> : {basic.bedrooms}</li>
                <li><div className='ilist-conf-title'>{t("bathrooms")}</div> : {basic.bathrooms}</li>
                <li><div className='ilist-conf-title'>{t("furnishing")}</div> : {basic.furnishing}</li>
                <li><div className='ilist-conf-title'>{t("ready")}</div> : {basic.ready}</li>
                <li><div className='ilist-conf-title'>{t("title-deep")}</div> : {basic.title}</li>
            </ul>
        </div>
        <div className='py-3'>
            <h2 className=''>{t("location")}</h2>
            <ul>
                <li><div className='ilist-conf-title'>{t("city")} </div>: {location.city}</li>
                <li><div className='ilist-conf-title'>{t("region")} </div>: {location.region}</li>
                <li><div className='ilist-conf-title'>{t("building")}</div> : {location.building}</li>
                <li><div className='ilist-conf-title'>{t("street")} </div>: {location.street}</li>
                <li><div className='ilist-conf-title'>{t("floor")}</div> : {location.floor}</li>
            </ul>
        </div>
        <div>
            <h2>{t("documents")}</h2>
            <p>{JSON.parse(localStorage.getItem("documents")).length} {t("files")}</p>
        </div>


        

        <div className=' py-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <div><button onClick={()=>{nextStep(1)
                  localStorage.removeItem("$user-info")
                localStorage.removeItem("location")
                localStorage.removeItem("basic-info")
                localStorage.removeItem("documents")
            }} type="submit" className='btn-grey p-5 !w-full'>{t("cancel")}</button></div>
            <div>
                <button onClick={onSubmit}  type="submit" className='btn-main p-5 !w-full'>
                    {isLoading?<div  className="loader"></div>:t("submit")} 
                    </button></div>
        </div>
    </div> );
}

export default Confirmations;