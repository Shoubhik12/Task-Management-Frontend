import { useEffect } from "react"
import { useParams } from "react-router"
import useFetch from "../useFetch"
import { useState } from "react"


const ProjectDetails =()=>{

    const proj = useParams()
    
    const {data,loading,err} = useFetch("https://task-management-ashy-one.vercel.app/projects")

    const tasks = useFetch("https://task-management-ashy-one.vercel.app/tasks")

    const [project,setProject] = useState([])

    const [taskList,setTasks] = useState([])
    const [filters,setFilters] = useState("status")
    
    let email = localStorage.getItem("email")

    useEffect(()=>{
        let newProject = data ?data.filter(dt=>dt.name== proj.name):[]
        
        setProject(newProject)

        console.log(proj.name)

        console.log(project)
    },[data])

    useEffect(()=>{
        if(!tasks.loading && tasks.data){
            const newTask = tasks.data.filter(tk=>tk.project.name==proj.name)
            setTasks(newTask)
            console.log(taskList)
        }
    },[tasks])


    return(
        <div className="d-flex flex-column  ">
             <header className="bg-primary-subtle text-primary px-4 py-4 text-center" >
                   <h1 className="display-4">Project Details</h1>
             </header>
             <main className="container-fluid h-auto"  >
                  <div className="row"  >
                        <div className="col-sm-12   col-md-2  py-3 bg-info-subtle">
                            <p className="text-center my-2 fs-6"  ><a href={`/dashboard/${email}`} className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Home</a></p>
                            <p className="text-center my-2 fs-6"  ><a href="/pjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Projects</a></p>
                            <p className="text-center my-2 fs-6"  ><a href="/tjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Team</a></p>
                            <p className="text-center my-2 fs-6"  ><a href="/report" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Reports</a></p>
                        </div>
                        <div className="col-sm-12 col-md-10 text-info" style={{minHeight:"500px"}} >
                                {!loading && project.length>0 && <div> <h3>{project[0].name}</h3> <h3>{project[0].description}</h3> </div>}
                                <hr />
                                <h2>Task List</h2>
                                {
                                    !tasks.loading  && taskList.length>0 && <div>
                                         {taskList.map(tk=><p>{tk.name} <br/> {filters=="status"?tk.status : tk.timeToComplete}  </p>)}
                                    </div>
                                }

                                <div className="d-flex flex-wrap py-4">
                                      <h4>Filters:</h4>
                                      <button className="mx-4  btn btn-primary" onClick={()=>setFilters("status")}  >Status</button>
                                      <button className="mx-4 btn btn-primary" onClick={()=>setFilters("timeToComplete")} >Time to Complete</button>
                                </div>
                                
                        </div>
                  </div>
             </main>
             <footer className="bg-primary-subtle text-primary px-4 py-4 my-auto text-center">
                    &copy;Taskhub.All Rights Reserved.
             </footer>
        </div>
    )
}


export default ProjectDetails