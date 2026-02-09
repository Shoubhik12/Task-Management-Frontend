import { useEffect } from "react"
import { useParams } from "react-router"
import useFetch from "../UseFetch"
import { useState } from "react"


const TaskDetails =()=>{

    const task = useParams()
    const [stask,selectedTask] = useState([])
    const {data,loading,err} = useFetch("https://task-management-ashy-one.vercel.app/tasks")

   useEffect(()=>{
        if(data){
            const newTask = data.filter(dt=>dt.name==task.name)
            selectedTask(newTask)
            console.log(stask)
        }
   },[data])


   const handleStatus = async (st)=>{
        
        const updatedTask = {...st,status:"Completed"}
        console.log(updatedTask)
        try {
            const response = await fetch(`https://task-management-ashy-one.vercel.app/tasks/${st._id}`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(updatedTask)
            })

            if(!response.ok){
                throw "Failed to update the task."
            }
        } catch (error) {
            console.log(error)
        }
   }

   


    return(
        <div className="d-flex flex-column">
             <header className="bg-primary-subtle text-primary px-2 py-4 d-flex flex-column  text-center" >
                   <h1 className="display-4">{task.name}</h1>
             </header>
             <main className="container-fluid h-auto " >
                  <div className="row" style={{minHeight:"500px"}} >
                        <div className="col-sm-12   col-md-2  py-3 bg-info-subtle">
                            <p className="text-center py-2 fs-5"  ><a href="/" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Home</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/pjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Projects</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/tjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Team</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/report" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Reports</a></p>
                        </div>
                        <div className="col-sm-12 col-md-10 py-2  text-info">
                                <h2>Task Details</h2>
                                <hr />
                                {!loading && stask.length>0 && <div>
                                   {
                                      stask.map(st=><div>
                                          <p><strong>Project:</strong>  {st.project.name}</p>
                                          <p><strong>Team:</strong>  {st.team.name}</p>
                                          <p><strong>Owner:</strong>  {st.owners.map(owner=>owner.email+" ")}</p>
                                          <p><strong>Tags:</strong>  {st.tags.join(", ")}</p>
                                          <p><strong>Status:</strong>  {st.status}</p>
                                          <p><strong>Time to Complete:</strong>  {st.timeToComplete}</p>
                                          <button className="btn btn-primary " onClick={()=>handleStatus(st)} disabled={st.status=="Completed"} >Mark As Complete</button>
                                      </div>)
                                   }
                                </div>}
                        </div>
                  </div>
             </main>
             <footer className="bg-primary-subtle text-primary px-4 py-4 my-auto text-center">
                    &copy;Taskhub.All Rights Reserved.
             </footer>
        </div>
    )
}


export default TaskDetails