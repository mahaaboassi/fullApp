import React ,{useEffect, useState}  from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from '../../components/dataTable';
import { Helper } from '../../functionality/helper';
import { apiRoutes } from '../../functionality/apiRoutes';
import { useNavigate } from 'react-router-dom';     
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';



function UserProperties() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const [data , setData] =  useState([])
    const [loading , setLoading] =  useState(true)
    const columns = [
        {
          accessorKey: "id",
          header: "",
          cell : ({row})=>(<div  className='cursor-pointer' onClick={()=>navigate(`/property/${row.original.id}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none">
                    <g clipPath="url(#clip0_150_607)">
                    <path d="M11.0003 5.95833C14.4745 5.95833 17.5728 7.91083 19.0853 11C17.5728 14.0892 14.4837 16.0417 11.0003 16.0417C7.51699 16.0417 4.42783 14.0892 2.91533 11C4.42783 7.91083 7.52616 5.95833 11.0003 5.95833ZM11.0003 4.125C6.41699 4.125 2.50283 6.97583 0.916992 11C2.50283 15.0242 6.41699 17.875 11.0003 17.875C15.5837 17.875 19.4978 15.0242 21.0837 11C19.4978 6.97583 15.5837 4.125 11.0003 4.125ZM11.0003 8.70833C12.2653 8.70833 13.292 9.735 13.292 11C13.292 12.265 12.2653 13.2917 11.0003 13.2917C9.73532 13.2917 8.70866 12.265 8.70866 11C8.70866 9.735 9.73532 8.70833 11.0003 8.70833ZM11.0003 6.875C8.72699 6.875 6.87533 8.72667 6.87533 11C6.87533 13.2733 8.72699 15.125 11.0003 15.125C13.2737 15.125 15.1253 13.2733 15.1253 11C15.1253 8.72667 13.2737 6.875 11.0003 6.875Z" fill="green"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_150_607">
                    <rect width="22" height="22" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
          </div>)
      
        },
        {
          accessorKey: "photo",
          header: "Photo",
          cell : ({row})=>(<div>
            <img className='photo-datatable' src={row.original.photo} alt={""} />
          </div>)
        },
        {
          accessorKey: "name_en",
          header: "English Name",
          cell : ({row})=>(<div style={{width :"200px"}}> {row.original.name_en} </div>)
        },
        {
          accessorKey: "name_ar",
          header: "Arabic Name",
          cell : ({row})=>(<div style={{width :"200px"}}> {row.original.name_ar} </div>)
        },
        {
          accessorKey: "badrooms",
          header: "Badrooms",
        },
        {
          accessorKey: "bathrooms",
          header: "Bathrooms",
        },
        {
          accessorKey: "beds",
          header: "Beds",
        },
        {
          accessorKey: "guests",
          header: "Guests",
        },
        {
          accessorKey: "city",
          header: "City",
        },
        {
          accessorKey: "region",
          header: "Region",
        },
        {
          accessorKey: "building",
          header: "Building",
        },
        {
          accessorKey: "floor",
          header: "Floor",
        },
        {
          accessorKey: "type",
          header: "Type",
          cell : ({row})=>(<div>
            <div className={`p-2 ${row.original.type === "apartment"?"bagde-first":(row.original.type === "townhouse"?"bagde-2":"bagde-3")}`}>
                {row.original.type }
            </div>
          </div>)
        },
        {
          accessorKey: "date",
          header: "Date",
        },
      ];
    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal
        if(!localStorage.getItem("$-TOKEN")  || !localStorage.getItem("$user")) navigate("/")
        
        getData(signal)
        return ()=> {
          controller.abort()}
    },[])
    const getData = async (signal)=>{
        if(!localStorage.getItem("$user")) {
          navigate("/")
          return
        }
        setLoading(true)
        setData([])
        const { response, message} = await Helper({
            url : apiRoutes.property.getAllPropertiesForUser,
            method : "GEt",
            hasToken :true,
            signal,
            params : { owner : JSON.parse(localStorage.getItem("$user")).id}
        })
        if(response){
            response.data.forEach(ele =>{
                setData(prev=>[...prev, {
                    id: ele._id, 
                    photo : ele.files[0].url,
                    name_en: ele.name_en || "",
                    name_ar: ele.name_ar || "",
                    type : ele.type.name_en || "",
                    bathrooms : ele.bathrooms || "",
                    badrooms : ele.bedrooms || "",
                    beds : ele.beds || "",
                    guests : ele.guests || "",
                    city : ele.city || "",
                    region : ele.region || "-",
                    building : ele.building || "-",
                    floor : ele.floor || "-",
                    date : format(new Date(ele.date), 'MMMM dd, yyyy')

                },])

            })
            setLoading(false)
        }else{
            if(message == "Token has expired."){
                localStorage.removeItem("$user")
                localStorage.removeItem("$-TOKEN")
                navigate("/auth/signIn")
            }
            if( message != "Signal is aborted without reason"){
              setLoading(false)
            }
            
            console.log(message);
            
            
        }

    }
    return ( <div className=" px-6 pt-16 md:pt-24 lg:pt-28 lg:px-10">
       <Helmet>
          <title>Foreshore | My Properties</title>
        </Helmet>
        <div>
            <h2 className='capitalize weight-medium text-center'>{t("my-properties")} {` (${data?data.length:0})`}</h2>
        </div>
        {
            loading  || !data  ?<div className="loading ">
            <div className="bounce"></div>
            <div className="bounce"></div>
            <div className="bounce"></div>
        </div>:<div>
            <DataTable columns={columns} data={data?data:[]} />
        </div>
        }
        

    </div> );
}

export default UserProperties;