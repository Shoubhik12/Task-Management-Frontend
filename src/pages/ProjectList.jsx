import { useEffect } from "react"
import { useParams } from "react-router"
import useFetch from "../useFetch"
import { useState } from "react"


const ProjectList =()=>{

    const [pjList,setList] = useState([])

    
    const {data,loading,err} = useFetch("https://task-management-ashy-one.vercel.app/projects")

    useEffect(()=>{
        if(!loading && data ){
            console.log(data)
            setList(data)
        }
    },[data])
    
    let email = localStorage.getItem("email")


    return(
        <div className="d-flex flex-column flex-wrap">
             <header className="bg-primary-subtle text-primary px-4 py-4 text-center" >
                   <h1 className="display-4">Project List</h1>
             </header>
             <main className="container-fluid h-auto" >
                  <div className="row" style={{minHeight:"500px"}} >
                        <div className="col-sm-12   col-md-2  py-3 bg-info-subtle">
                            <p className="text-center py-2 fs-5"  ><a href={`/dashboard/${email}`} className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Home</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/pjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Projects</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/tjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Team</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/report" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Reports</a></p>
                        </div>
                        <div className="col-sm-12 col-md-10 py-2  text-info" style={{minHeight:"500px"}}>
                              <div className="row">
                                 <div className="col-2"><h2>Name</h2></div>
                                 <div className="col-10"><h2>Description</h2></div>
                              </div>  
                               <div>{
                                    !loading  && pjList.map(dt=><div className="row"><div className="col-2" >{dt.name}</div>    <div className="col-10">{dt.description}</div></div>)
                                }</div>

                                <a  className="btn btn-info float-end mx-4" href="/createpj">Create Project</a>
                        </div>
                  </div>
             </main>
             <footer className="bg-primary-subtle text-primary px-4 py-4 mb-auto text-center">
                    &copy;Taskhub.All Rights Reserved.
             </footer>
        </div>
    )
}


export default ProjectList