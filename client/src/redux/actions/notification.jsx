export const changeNotification = ({isOpen,bgColor , message}) => {
    return{
        type: "CHANGE-NOTIFICATION-STATUS",
        isOpen : isOpen,
        bgColor : bgColor,
        message : message
    }
}