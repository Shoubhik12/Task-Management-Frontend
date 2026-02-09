import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {  useNavigate } from 'react-router'
import { toast } from 'react-toastify'



function App() {

  const navigate = useNavigate()

  const [userForm,setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange=(event)=>{
    const {name,value} = event.target
    setUser((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (event) => {
     event.preventDefault()

     try {
        const response = await fetch("https://task-management-ashy-one.vercel.app/auth/signup",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(userForm)
        })

        if(!response.ok){
           throw "User not created. "
        }
        toast("User created successfully.")
        navigate("/signin")
     } catch (error) {
        console.log(error)
     }
  }
  

  return (
    <div className='bg-primary-subtle min-vh-100 px-4'  >
           <header> <h1 className='text-primary text-center'>TaskHub</h1></header>
            <main className='container' >
                <div className='d-flex justify-content-center align-items-center'>
                 <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                <div className='card px-4 py-4 my-4'>
               <form onSubmit={handleSubmit} >
                 <label htmlFor="name">Full Name</label>
                 <input type="text" name='name' value={userForm.name} onChange={handleChange} className='form-control' placeholder='Enter your name' />
                 <label htmlFor="email">Email</label>
                 <input type="email" name='email' value={userForm.email}   onChange={handleChange} className='form-control' placeholder='Enter your email' />
                 <label htmlFor="password">Password</label>
                 <input type="text" name='password' value={userForm.password} onChange={handleChange} className='form-control' placeholder='Enter your password' />
                 <div className='d-grid pt-4 gap-2 col-6 mx-auto'>
                     <button type='submit' className='btn btn-primary'>Create Account</button>
                 </div>
               </form>
               <hr />
                 <p className='text-center fw-medium'>Already have an account?<a className='px-2 link-primary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover' href="/signin">Log in</a></p>
              </div>
               </div>
                </div>
            </main>
    </div>
  )
}

export default App
