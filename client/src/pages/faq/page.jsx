import React, { useEffect }  from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import Accordion from "../../components/accordion";
import { dataFAQ } from "../../data/dataFAQ";

function FAQ() {
    const { t , i18n } = useTranslation()
    useEffect(()=>{ window.scrollTo({ top: 0,  behavior: 'smooth' })},[])
    return ( <div className='pt-24 md:pt-32 px-6  lg:px-10'>
        <Helmet>
                <title>Foreshore | FAQs</title>
        </Helmet>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            {dataFAQ.map((e,index)=>{
                if(index%2 == 0){
                    return <div className='lg:w-3/4'><Accordion isFromFAQ={true} withIcons={true} key={`Accordion_For_FAQs_${e.ques}`} question={t(e.ques)} answer={t(e.answer)} /></div>
                }else{
                    return <div className='lg:pt-5 lg:w-3/4'><Accordion isFromFAQ={true} withIcons={true} key={`Accordion_For_FAQs_${e.ques}`} question={t(e.ques)} answer={t(e.answer)} /></div>
                }
            })}

        </div>
    </div> );
}

export default FAQ;