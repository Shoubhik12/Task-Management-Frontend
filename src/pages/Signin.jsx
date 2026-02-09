import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router'



function Signin() {


  const navigate = useNavigate()


  const [loginForm,setUser] = useState({
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
        const response = await fetch("https://task-management-ashy-one.vercel.app/auth/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(loginForm)
        })

        const data = await response.json()
        //console.log(data)

        localStorage.setItem("adminToken",data.token)

        navigate(`/dashboard/${loginForm.email}`)

        if(!response.ok){
           throw "Log in unsuccessful. "
        }
     } catch (error) {
        console.log(error)
     }
  }
  

  return (
    <div className='bg-primary-subtle min-vh-100 py-4'  style={{minHeight:"800px"}} >
           <header> 
                 <h1 className='text-primary text-center'>TaskHub</h1>
                 <h2 className='text-info text-center' >Sign in</h2>
           </header>
            <main className='container' >
              <div className='d-flex justify-content-center align-items-center'>
              <div className='col-12 col-sm-10 col-md-8 col-lg-5' >
                <div className='card px-4 py-4 my-4' >
               <form onSubmit={handleSubmit} >
                 <label htmlFor="email">Email</label>
                 <input type="email" value={loginForm.email} name='email'onChange={handleChange} className='form-control' placeholder='Enter your email' />
                 <label htmlFor="password">Password</label>
                 <input type="password" value={loginForm.password}  name='password' onChange={handleChange} className='form-control' placeholder='Enter your password' />
                 <div className='d-grid pt-4 gap-2 col-6 mx-auto'>
                     <button type='submit' className='btn btn-primary'>Sign in</button>
                 </div>
               </form>
               <hr />
                 <p className='text-center fw-medium'>Do not have an account?<a className='px-2 link-primary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover' href="/">Sign up</a></p>
              </div>
                 </div>
              </div>
            </main>
    </div>
  )
}

export default Signin
