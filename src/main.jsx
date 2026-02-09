import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signin from './pages/Signin.jsx'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import Dashboard from './pages/Dashboard.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'
import TaskDetails from './pages/TaskDetails.jsx'
import CreateProject from './pages/CreateProject.jsx'
import CreateTask from './pages/CreateTask.jsx'
import ProjectList from './pages/ProjectList.jsx'
import TeamList from './pages/TeamList.jsx'
import CreateTeam from './pages/CreateTeam.jsx'
import Report from './pages/Report.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path:"/signin",
    element:<Signin />
  },
  {
    path:"/dashboard/:email",
    element:<Dashboard />
  },
  {
    path:"/pdetails/:name",
    element:<ProjectDetails />
  },{
    path:"/tdetails/:name",
    element:<TaskDetails />
  },{
    path:"/createpj",
    element:<CreateProject/>
  },{
    path:"/createtj",
    element:<CreateTask/>
  },{
    path:"/pjlist",
    element:<ProjectList />
  },{
    path:"/tjlist",
    element:<TeamList />
  },{
    path:"/createtm",
    element:<CreateTeam />
  },{
    path:"/report",
    element:<Report/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}  />
    <ToastContainer />
  </StrictMode>,
)
