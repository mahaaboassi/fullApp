const initialValues = {
    lang : "en",
}

export const reducerLang= (state = initialValues , action)=>{
switch(action.type){
    case "OPEN-LOADING":
        return{
            ...state,
            isOpen : action.isOpen,
        }

    break;
    default :
        return { ...state }
        break;
}
}