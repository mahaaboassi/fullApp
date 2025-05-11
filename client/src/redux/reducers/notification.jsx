const initialValues = {
    isOpen : false,
    bgColor : "",
    message : ""
}

export const reducerNotification = (state = initialValues , action)=>{
switch(action.type){
    case "CHANGE-NOTIFICATION-STATUS":
        return{
            ...state,
            isOpen : action.isOpen,
            bgColor : action.bgColor,
            message : action.message,
        }

    break;
    default :
        return { ...state }
        break;
}
}