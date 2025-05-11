const initialValues = {
    isOpen : true,
}
export const reducerChat = (state = initialValues , action)=>{
switch(action.type){
    case "CHANGE-SUPPORT-STATUS":
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