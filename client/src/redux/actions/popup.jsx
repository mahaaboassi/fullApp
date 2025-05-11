export const changePopup = ({isOpen , component, isForm}) => {
    return{
        type: "CHANGE-POPUP-STATUS",
        isOpen : isOpen,
        component : component,
        isForm: isForm
    }
}