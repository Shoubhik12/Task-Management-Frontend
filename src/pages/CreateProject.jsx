import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import useFetch from "../useFetch"
import { useState } from "react"
import { toast } from "react-toastify"


const CreateProject =()=>{

    const navigate = useNavigate()

    const [pjForm,setPJ] = useState({
        name:"",
        description:""
    })

    const handleSubmit=(e)=>{
        const {name,value} = e.target
        setPJ((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    let email = localStorage.getItem("email")

    console.log(email)

    const handleForm = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("https://task-management-ashy-one.vercel.app/projects",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(pjForm)
            })
            toast("Project created successfully.")
            navigate("/pjlist")

            if(!response.ok){
                throw "Project not created."
            }

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="d-flex flex-column flex-wrap" >
             <header className="bg-primary-subtle text-primary px-4 py-4 text-center" >
                   <h1 className="display-4">Create Project</h1>
             </header>
             <main className="container-fluid h-auto">
                  <div className="row" style={{minHeight:"500px"}} >
                        <div className="col-sm-12   col-md-2  py-3 bg-info-subtle">
                            <p className="text-center py-2 fs-5"  ><a href={`/dashboard/${email}`} className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Home</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/pjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Projects</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/tjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Team</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/report" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Reports</a></p>
                        </div>
                        <div className="col-sm-12 col-md-10 py-2  text-info" style={{minHeight:"400px"}} >
                               <h3>Create Project</h3>
                               <div className="px-4">
                                <form id="pjForm" onSubmit={handleForm} >
                                      <label htmlFor="name">Name:</label>
                                      <input type="text" name="name" value={pjForm.name} onChange={handleSubmit}   className="form-control" />
                                      <label htmlFor="description"   >Description:</label>
                                      <textarea name="description"  value={pjForm.description}  onChange={handleSubmit}  className="form-control" ></textarea>
                                      <button type="submit" className="btn btn-primary my-4">Submit</button>
                               </form>
                               </div>
                        </div>
                  </div>
             </main>
             <footer className="bg-primary-subtle text-primary px-4 py-4 mb-auto text-center">
                    &copy;Taskhub.All Rights Reserved.
             </footer>
        </div>
    )
}


export default CreateProject