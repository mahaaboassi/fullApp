import { useEffect, useState , useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNotification } from "../redux/actions/notification";
function Notification() {
    const dispatch = useDispatch()
    const dataRedux = useSelector(state => state.notification )
    const [ data , setData ] = useState({
        isOpen : false,
        message : "",
        bgColor : ""
    })
    const noteRef = useRef(null); // Create a ref for the dropdown
     // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
        if (noteRef.current && !noteRef.current.contains(event.target)) {
            dispatch(changeNotification({
                isOpen : false,
                message : "",
                bgColor : ""
          }))
        }
    };

    useEffect(() => {
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(()=>{
        setData(dataRedux)
    },[dataRedux]) 
    return ( data.isOpen ? <div ref={noteRef} className={`fixed bottom-4 right-0 md:right-4 ${data.bgColor} max-w-42 md:max-w-96  text-white px-4 pt-2 pb-4 rounded-lg shadow-lg animate-slide-in`}>
        <div onClick={()=>dispatch(changeNotification({
              isOpen : false,
              message : "",
              bgColor : ""
        }))} className="flex justify-end cursor-pointer py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_17_1174)">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
                    </g>
                    <defs>  
                    <clipPath id="clip0_17_1174">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
        </div>
        <p>{data.message}</p>
      </div> : "");
}

export default Notification;