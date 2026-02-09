import { useEffect, useState } from "react"


const useFetch = (url)=>{

    const [data,setData] = useState()
    const [loading,setLoading] = useState(false)
    const [err,setError] = useState(null)

    useEffect(()=>{

        const fetchData = async () => {
            
            try {
                const token = localStorage.getItem("adminToken")

                setLoading(true)

                const headers = {
                  "Content-Type":"application/json"
                }

                if(token){
                headers.Authorization = `Bearer ${token}`
                }

               const response = await fetch(url,{
                headers:headers
               })

               if(!response.ok){
                throw new Error("Failed to fetch data.")
               }

               const result = await response.json()

               setData(result)
            } catch (error) {
                setError(error.message)
            }finally{
                setLoading(false)
            }


           
        }

        fetchData()

    },[url])
    
    return {data,loading,err}
}



export default useFetch