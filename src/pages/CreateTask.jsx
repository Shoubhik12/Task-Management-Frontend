import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import useFetch from "../useFetch"
import { useState } from "react"
import { toast } from "react-toastify"


const CreateTask =()=>{

    const navigate = useNavigate()

    const [sprojects,setProjects] = useState([])
    const [steams,setTeam] = useState([])
    const [stasks,setTasks] = useState([])
    const [owners,setOwners] = useState([])


    const [tjForm,setTJ] = useState({
        name:"",
        project:"",
        team:"",
        owners:[],
        tags:[],
        timeToComplete:0,
        status:""
    })

    const teams = useFetch("https://task-management-ashy-one.vercel.app/teams")
    const tasks = useFetch("https://task-management-ashy-one.vercel.app/tasks")
    const projects = useFetch("https://task-management-ashy-one.vercel.app/projects")  

    const statuses = ['To Do', 'In Progress', 'Completed', 'Blocked']

    useEffect(()=>{
        if(!projects.loading){
        setProjects(projects.data)
        }

        if(!teams.loading){
            setTeam(teams.data)
        }

        

    },[projects.data,teams.data])

    useEffect(()=>{
        if(!tasks.loading && tasks.data ){
            //console.log(tasks.data)
            setTasks(tasks.data)
            console.log(stasks)
            const allOwners = tasks.data.flatMap(task => task.owners)

         
        const uniqueOwners = Array.from(
           new Map(allOwners.map(owner => [owner._id, owner])).values()
        )

    
          setOwners(uniqueOwners)
          console.log(owners)
        }
    },[tasks.data])

    const handleSubmit=(e)=>{
        const {name,value} = e.target
        setTJ((prev)=>({
            ...prev,
            [name]:value
        }))
    }

   const handleOwners = (e) => {
    const values = Array.from(e.target.selectedOptions, opt => opt.value)
    setTJ(prev => ({ ...prev, owners: values }))
   }

  const handleTags = (e) => {
    const values = e.target.value.split(",").map(t => t.trim())
    setTJ(prev => ({ ...prev, tags: values }))
  }

    const handleForm = async (event) => {
        event.preventDefault()
         const payload = {
           name: tjForm.name.trim(),
           project: tjForm.project,
           team: tjForm.team,
           owners: tjForm.owners,          
           tags: tjForm.tags,              
           timeToComplete: Number(tjForm.timeToComplete),
           status: tjForm.status || "To Do"
         }

  console.log("Submitting payload:", payload)
        try {
            const response = await fetch("https://task-management-ashy-one.vercel.app/tasks",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(payload)
            })

            toast("New task created.")

            if(!response.ok){
                throw "Task not created."
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="d-flex flex-column flex-wrap">
             <header className="bg-primary-subtle text-primary px-4 py-4 text-center" >
                   <h1 className="display-4">Create Task</h1>
             </header>
             <main className="container-fluid h-auto" >
                  <div className="row" style={{minHeight:"500px"}} >
                        <div className="col-sm-12   col-md-2  py-3 bg-info-subtle">
                            <p className="text-center py-2 fs-5"  ><a href="/" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Home</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/pjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Projects</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/tjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Team</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/report" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Reports</a></p>
                        </div>
                        <div className="col-sm-12 col-md-10 py-2  text-info" style={{minHeight:"500px"}} >
                               <h3>Create Task</h3>
                               {
                                  !projects.loading  && !tasks.loading && !teams.loading && <div className="px-4">
                                       <form id="tjform" onSubmit={handleForm} >
                                             <label htmlFor="name">Name:</label>
                                             <input type="text" name="name" value={tjForm.name} onChange={handleSubmit} className="form-control" />
                                             <label htmlFor="project">Project:</label>
                                              <select name="project" value={tjForm.project} className="form-select"  onChange={handleSubmit} >
                                                  {
                                                     sprojects.map(pj=><option value={pj._id} >{pj.name}</option>)
                                                  }
                                             </select>
                                            <label htmlFor="team">Team:</label>
                                              <select name="team" value={tjForm.team} className="form-select" onChange={handleSubmit}>
                                                  {
                                                     steams.map(tm=><option value={tm._id} >{tm.name}</option>)
                                                  }
                                             </select>
                                             <label htmlFor="owners">Owner:</label>
                                             <select name="owners" value={tjForm.owners}  className="form-select"  onChange={handleOwners}  >
                                                  {
                                                     owners.map(ow=><option value={ow._id} >{ow.email}</option>)
                                                  }
                                             </select>
                                             <label htmlFor="tags">Tags:</label>
                                             <input type="text" name="tags" value={tjForm.tags}  className="form-control" onChange={handleTags} />
                                             <label htmlFor="timeToComplete">Time to Complete:</label>
                                             <input type="number" name="timeToComplete" value={tjForm.timeToComplete} onChange={handleSubmit} className="form-control" />
                                             <label htmlFor="status">Task:</label>
                                             <select name="status" value={tjForm.status} className="form-select"   onChange={handleSubmit} >
                                                  {
                                                     statuses.map(st=><option value={st} >{st}</option>)
                                                  }
                                             </select>
                                             <button type="submit" className="btn btn-primary my-4" >Submit</button>
                                       </form>
                                  </div>
                               }
                               
                        </div>
                  </div>
             </main>
             <footer className="bg-primary-subtle text-primary mb-auto px-4 py-4 text-center">
                    &copy;Taskhub.All Rights Reserved.
             </footer>
        </div>
    )
}


export default CreateTask