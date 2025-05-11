
const initialValues = {
    isOpen : false,
    component : <></>,
    isForm : false,
}
export const reducerPopup = (state = initialValues , action)=>{
switch(action.type){
    case "CHANGE-POPUP-STATUS":
        return{
            ...state,
            isOpen : action.isOpen,
            component : action.component,
            isForm : action.isForm
        }

    break;
    default :
        return { ...state }
        break;
}
}