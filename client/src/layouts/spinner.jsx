import img from "../images/logo_main.webp"
import img_2 from "../images/logo_dark.webp"

const Spinner = ()=>{
    return(<div className="spinner">
       <div className="flex justify-center ">
            <div className="photo-container">
                <div className="flip-box">
                    <div className="flip-box-inner">
                    <div className="flip-box-front">
                        <img src={img_2} alt="Front Photo"/>
                    </div>
                    <div className="flip-box-back">
                        <img src={img} alt="Back Photo"/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Spinner