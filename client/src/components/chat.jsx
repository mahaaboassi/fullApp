import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { ChangeChat } from "../redux/actions/chat";
import  MessageInfo  from "./messageInfo"
import { Helper } from "../functionality/helper";
import { apiRoutes } from "../functionality/apiRoutes";
import { changePopup } from "../redux/actions/popup";
import { changeNotification } from '../redux/actions/notification';


const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_17_1174)">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
                    </g>
                    <defs>  
                    <clipPath id="clip0_17_1174">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>



function ChatComonent() {
    const openChatRedux = useSelector( state => state.chat)
    const dispatch = useDispatch()
    const [ open, setOpen ] = useState(false)
    const { t , i18n } = useTranslation()
    useEffect(()=>setOpen(openChatRedux.isOpen),[openChatRedux])
    const sendData = async(data)=>{
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
                    message : response.data.message,
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
    const selectOption  = (key) => {
        dispatch(changePopup({
            isOpen : true,
            isForm : true,
            component : <div style={i18n.language == "en" ?{direction : "ltr"}:{direction : "rtl"} } className=" bg-white">
                    <h3 className="text-main weight-medium title-card ">{key == "list" ?t("list-your-property"):t("book-your-property")}</h3>
                    <div>
                        <p  className="py-2">{t("desc-your-property")}</p>
                        <div><MessageInfo returnedData={(data)=>{
                            let temp = data
                            temp.message = key == "list" ? "This message is from a user requesting to list a property." : "This message is from a user requesting to book a property."
                            sendData(temp)}} withoutMessage={true}/></div>
                    </div>
            </div>       
       }))
        
    }
    return ( <div className="container-chat">
        { open && <div className="container-conversation">
            <div className="flex justify-end">
                <div onClick={()=>dispatch(ChangeChat({isOpen:false}))} className="icon-close-chat">
                {closeIcon}
                </div>


            </div>
            <div onClick={()=>selectOption("book")} className="option my-1"> {t("book-your-property")}</div>
            <div onClick={()=>selectOption("list")} className="option"> {t("list-your-property")}</div>
                
            </div>}
         <div className="container-icon">
            <div onClick={()=>dispatch(ChangeChat({isOpen:true}))} className="chat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2C9.4 2 4 7.3 4 13.9V17.4C4 17.5 4 17.5 4 17.6C4 17.7 4 17.9 4 18C4 20.8 6.2 23 9 23C9.6 23 10 22.6 10 22V14C10 13.4 9.6 13 9 13C7.9 13 6.8 13.4 6 14V13.8C6 8.4 10.5 4 16 4C21.5 4 26 8.4 26 13.9V14C25.2 13.4 24.1 13 23 13C22.4 13 22 13.4 22 14V22C22 22.6 22.4 23 23 23C23.7 23 24.4 22.8 25 22.6C24 24.7 22.2 26.3 20 27.2C20 27.1 20 27.1 20 27C20 26.4 19.6 26 19 26H16C15.4 26 15 26.4 15 27V29C15 29.6 15.4 30 16 30C22.6 30 28 24.8 28 18.4V17.4V15V13.9C28 7.3 22.6 2 16 2Z" fill="#27CBBE"/>
                </svg>
            </div>
         </div>
            
    </div> );
}

export default ChatComonent;