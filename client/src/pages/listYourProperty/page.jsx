import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';
import { Helper } from '../../functionality/helper';
import { apiRoutes } from '../../functionality/apiRoutes';
import { useDispatch } from 'react-redux';
// Components
import BasicInformation from "./components/basicInfo";
import Location from "./components/location";
import Documents from "./components/documnets";
import Confirmations from "./components/confirmation";
import UserInfo from './components/userInfo';
import { changeNotification } from '../../redux/actions/notification';
import { Helmet } from 'react-helmet-async';


function ListYourProperty() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [currentSelected, setCurrentSelected] = useState(1)
    const [isSignIn, setIsSignIn] = useState(false)
    const [ loading , setLoading ] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem("$user") || localStorage.getItem("$user-info")){
            setIsSignIn(true)
        }
    },[])
    const [files, setFiles] = useState([])
    const onSubmit = async()=>{
        const data = new FormData()
        setLoading(true)
        if(localStorage.getItem("$user-info")){
            const user = JSON.parse(localStorage.getItem("$user-info"))
            Object.keys(user).forEach((key)=>{
                data.append(key,user[key])
                
            })
        }
        if(localStorage.getItem("$user")){
            const user = JSON.parse(localStorage.getItem("$user"))
            Object.keys(user).forEach((key)=>{
                data.append(key,user[key])
                
            })
        }
        if(localStorage.getItem("location")){
            const location = JSON.parse(localStorage.getItem("location")) 
            Object.keys(location).forEach((key)=>{
                data.append(key,location[key])
            })
        }
        if(localStorage.getItem("basic-info")){
            const basic = JSON.parse(localStorage.getItem("basic-info"))
            Object.keys(basic).forEach((key)=>{
                if(key == "furnishing" || key == "ready"){
                    data.append(key,basic[key]== "Yes"?"1":"0")   
                }else{
                    data.append(key,basic[key])
                }
            })
        }
        if(files.length>0){
            files.forEach((e,i)=>{
                data.append(`files`,e)
            })

        }

        fetch(apiRoutes.sendEmail, {
            method : "POSt",
            body : data
        }).then(res=> res.json()).then(res=>{
            if(res.error == "0"){
                dispatch(changeNotification({
                    isOpen : true ,
                    bgColor : "bg-success",
                    message : res.message
                }))
                localStorage.removeItem("location")
                localStorage.removeItem("basic-info")
                localStorage.removeItem("documents")
                setCurrentSelected(1)

            }else{
                dispatch(changeNotification({
                    isOpen : true ,
                    bgColor : "bg-error",
                    message : res.message
                }))
            }
            console.log(res);
            setLoading(false)
            
            
        }).catch(err=>{
            setLoading(false)
            console.log(err)
        })
        return
        const { response , message } = await Helper({
            url : apiRoutes.sendEmail,
            method : "POSt",
            body : data
        })
        if(response){
            console.log(response);
            
        }else{
            console.log(message);
            
        }
    }
    return ( <div className="pt-24  md:pt-32 px-6 lg:px-10 sm:flex justify-center">
        <Helmet>
            <title>Foreshore | List Your Property</title>
        </Helmet>
        <div className="form-list flex flex-col px-2  md:px-8 py-5">
         <h2 className="capitalize text-center">{t("list-your-property")}</h2>
         {!isSignIn? <div className='pt-8'>
            <p className='sm:w-96 pb-4'>{t("welcome-list-1")} {" "} {t("welcome-list-2")} </p>
            <UserInfo returnedGoNext={(res)=>{
                if(res) {
                    setCurrentSelected(1)
                    setIsSignIn(true)
                }
            }}/>
         </div>:<>
         <div  className="flex scale-70  sm:scale-70 md:scale-100 h-28 justify-center items-center">
            <div  className={`list-circular ${(localStorage.hasOwnProperty("basic-info") && currentSelected!=1) && "done"} ${currentSelected==1  && "active"} `}>
                <div className={`number`}>
                    01
                </div>
                <div className={`list-text text-nowrap capitalize`}>
                    {t("basic-info")}
                </div>
            </div>
            <div className="flex justify-center items-center px-2">
                <div className="w-11 sm:w-20 h-1 bg-stone-200" ></div>
            </div>
            <div  className={`list-circular ${localStorage.hasOwnProperty("location") && currentSelected !=2 && "done"} ${currentSelected==2 && "active"} `}>
                <div className={`number-bottom`}>
                    02
                </div>
                <div className={`list-text-top text-nowrap capitalize`}>
                     {t("location")}
                </div>
            </div>
            <div  className="flex justify-center items-center px-2">
                <div className="w-11 sm:w-20 h-1 bg-stone-200" ></div>
            </div>
            <div  className={`list-circular ${localStorage.hasOwnProperty("documents") && currentSelected !=3 && "done"}  ${currentSelected==3 && "active"}`}>
                <div className={`number`}>
                    03
                </div>
                <div className={`list-text text-nowrap capitalize`}>
                    {t("documents")}
                </div>
            </div>
            <div className="flex justify-center items-center px-2">
                <div className="w-11 sm:w-20 h-1 bg-stone-200" ></div>
            </div>
            <div  className={`list-circular ${currentSelected==4 && "active"} `}>
                <div className={`number-bottom`}>
                    04
                </div>
                <div className={`list-text-top text-nowrap capitalize`}>
                    {t("confirm")}
                </div>
            </div>
         </div>

         {currentSelected == 1 && <BasicInformation nextStep={(res)=>setCurrentSelected(res)}/> }
         {currentSelected == 2 && <Location nextStep={(res)=>setCurrentSelected(res)} /> }
         {currentSelected == 3 && <Documents filesExist={files} returnedFiles={(res)=>setFiles(res)} nextStep={(res)=>setCurrentSelected(res)} /> }
         {currentSelected == 4 && <Confirmations loading={loading} onSubmit={onSubmit} nextStep={(res)=>{
            setCurrentSelected(res)
            setIsSignIn(false)
            
            
         }} /> }

         </>}
         
        </div>
        
    </div> );
}

export default ListYourProperty;