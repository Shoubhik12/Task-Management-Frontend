import { useEffect, useState } from "react"
import useFetch from "../useFetch"
import { useParams } from "react-router"


const Dashboard =()=>{

    const user = useParams()

    const {data,loading,err} = useFetch("https://task-management-ashy-one.vercel.app/tasks")

    const [tasks,setTasks] = useState([])
    const [proj,setProj] = useState([])
    const [status,setStatus] = useState(false)

    localStorage.setItem("email",user.email)

    useEffect(()=>{
        if(data){
            console.log(data)
            console.log(user.email)

            // tasks = data.filter(dt => dt.owners.filter(em => em.email === user.email))

            let userTasks = data.filter(dt=>dt.owners.some(owner=>owner.email==user.email)).map(task=>task)

            if(status){
                userTasks = userTasks.filter(tk=>tk.status=="Completed")
            }
            else{
                userTasks = userTasks.filter(tk=>tk.status!="Completed")
            }
             
            const userProj = data.filter(dt=>dt.owners.some(owner=>owner.email==user.email)).map(task=>task.project.name)

            setTasks(userTasks)

             if(tasks.length>0){
               console.log("Tasks state updated",tasks)
            }

            setProj(userProj)
            
            if(proj.length>0){
                console.log(proj)
            }
            
        }
    },[data,status])



    return(
        <div className=" d-flex flex-column">
             <header className="bg-primary-subtle text-primary px-4 py-4 text-center" >
                   <h1 className="display-4">TaskHub Dashboard</h1>
             </header>
             <main className="container-fluid   h-auto " >
                  <div className="row  "  >
                        <div className="col-12  col-md-2  py-3 bg-info-subtle ">
                            <p className="text-center my-2 fs-6"  ><a href="" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Home</a></p>
                            <p className="text-center my-2 fs-6"  ><a href="/pjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Projects</a></p>
                            <p className="text-center my-2 fs-6"  ><a href="/tjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Team</a></p>
                            <p className="text-center my-2 fs-6"  ><a href="/report" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Reports</a></p>
                        </div>
                        <div className="col-12 col-md-10 text-info" style={{minHeight:"500px"}} >
                               <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center"  >
                                     <h1 className="px-3 py-2" >Projects</h1>
                                     <a  className="btn btn-primary  mx-4 my-3 "  href="/createpj" >Add Projects</a>
                               </div>
                               <div >
                                    {
                                        !loading && proj.length>0 &&<div className="d-flex flex-wrap gap-2">
                                            {
                                                proj.map(pj=><div className="card px-2 mx-2 py-2"><p   ><a href={`/pdetails/${pj}`} className="link-info  link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">{pj}</a></p></div>)
                                            }
                                        </div>
                                    }
                               </div>
                               <hr />
                               <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center"  >
                                     <h1 className="px-3 py-2" >Tasks</h1>
                                     <a  href={`/createtj`} className="btn btn-primary  mx-4 my-3 ">Add Tasks</a>
                               </div>
                               <div>
                                  {
                                     !loading && tasks.length>0 && <div className="d-flex">
                                         {
                                            tasks.map(task=><div className="card px-2 py-2 mx-2 text-primary">
                                                   <p   ><a href={`/tdetails/${task.name}`} className="link-info  link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">{task.name}</a></p>

                                                   {
                                                     task.owners.map(tk=><p>{tk.email}</p>)
                                                   }
                                               </div>)
                                         }
                                     </div>
                                  }
                               </div>
                               <hr />
                               <h3>Filters:</h3>
                               <div className="d-flex gap-2 py-4" >
                                    <button className="btn btn-primary" onClick={()=>setStatus(false)}  >Not Completed</button>
                                    <button className="btn btn-primary" onClick={()=>setStatus(true)} >Completed</button>
                               </div>
                               <a href="/" className="btn btn-danger float-end my-2"  >Log out</a>
                        </div>
                  </div>
             </main>
             <footer className="bg-primary-subtle text-primary  px-4 py-4  text-center" >
                    &copy;Taskhub.All Rights Reserved.
             </footer>
        </div>
    )
}


export default Dashboard