import { useEffect, useState } from "react";

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
function Gallery({images,closed,selectedSlide}) {
    const [ data, setData ] = useState([])
    useEffect(()=>{setData(images)
        setCurrentSlide(selectedSlide)
    },[selectedSlide])
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };
    
    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };
    return ( <div className="gallery">
        <div className="icon-gallery">
            <div onClick={closed} className="cursor-pointer">{closeIcon}</div>
        </div>
        <div className="container-gallery">
            <div className="slider-container-gallery">
                {images.map((slide,idx)=>(<div
                className={`slider-item ${idx === currentSlide ? "active" : ""}`}
                key={`Slide-Gallery -${slide.id}`}>
                    <img style={{objectFit: "cover"}} src={slide.image} alt={`Slide -${slide.id}`} />
                </div>))}

            </div>
            <button className="slider-nav-gallery left" onClick={handlePrev}>
                &#10094;
            </button>
            <button className="slider-nav-gallery right" onClick={handleNext}>
                &#10095;
            </button>
        </div>

    </div>);
}

export default Gallery;