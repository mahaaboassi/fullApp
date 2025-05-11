
import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';


function Dropdown({trigger,content,icon,returnedValue}) {
    const [isOpen, setIsOpen] =  useState()
    const { t,i18n } = useTranslation()
    const [value, setValue] = useState("")
    const [ darkColor , setDarkColor] = useState(false)
    useEffect(()=>{setValue(trigger)},[trigger])

    return ( <div className="dropdowp relative">
        <div onClick={()=>setIsOpen(!isOpen)}  className="dropdwon-trigger h-9 lg:h-12 cursor-pointer py-4 px-3 flex items-center gap-2">
            <div>{icon}</div>
            <div className={`${darkColor && "!text-slate-950"}`}>{t(value)}</div>
        </div>
        {isOpen && <div style={i18n.language == "en"?{right:0}:{left:0}} className="menu w-full absolute top-14 ">
                {content.map((e)=>(<p onClick={()=>{
                    setValue(e)
                    returnedValue(e)
                    setIsOpen(false)
                    setDarkColor(true)
                }} 
                className={`dropdown-content  bg-white capitalize transition-all duration-300 ease-in-out p-2 rounded-md cursor-pointer`}>{t(e)}</p>))}
        </div>}
    </div> );
}

export default Dropdown;