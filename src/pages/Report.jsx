import { useEffect } from "react"
import { useParams } from "react-router"
import useFetch from "../useFetch"
import { useState } from "react"
import { Chart , ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement } from "chart.js"
import { Doughnut ,Bar } from "react-chartjs-2"

Chart.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement)

const Report =()=>{

    const [pendingVal,setPending] = useState(0)
    const [completedVal,setComplete] = useState(0)
    const [teams,setTeams] = useState({})


    
    const pending = useFetch("https://task-management-ashy-one.vercel.app/report/pending")
    const completed = useFetch("https://task-management-ashy-one.vercel.app/report/closed-task")
    const {data,loading,err} = useFetch("https://task-management-ashy-one.vercel.app/tasks")

    useEffect(()=>{
        if(!pending.loading && pending.data  ){
            const value  = pending.data["total days of work pending for all tasks"]
            console.log(value)
            setPending(value)
        }

        if(!completed.loading && completed.data){
             const value = completed.data["total number of closed tasks"]
             console.log(value)
             setComplete(value)
        }
    },[pending.data,completed.data])


    useEffect(()=>{
        if(!loading && data){
            let teamMap = {}
            data.forEach((dt)=>{
                const team = dt.team.name
                teamMap[team] = dt.status=="Completed" ? 1 : 0
            })
            setTeams(teamMap)
        }

        console.log(teams)
    },[data])
   
    


    return(
        <div className="d-flex flex-column flex-wrap">
             <header className="bg-primary-subtle text-primary px-4 py-4 text-center" >
                   <h1 className="display-4">Report</h1>
             </header>
             <main className="container-fluid h-auto" >
                  <div className="row" style={{minHeight:"500px"}} >
                        <div className="col-sm-12   col-md-2  py-3 bg-info-subtle">
                            <p className="text-center py-2 fs-5"  ><a href="/" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Home</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/pjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Projects</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="/tjlist" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Team</a></p>
                            <p className="text-center py-2 fs-5"  ><a href="" className="link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover">Reports</a></p>
                        </div>
                        <div className="col-sm-12 col-md-10 py-2  text-info"  style={{minHeight:"400px"}} >
                               <h2 className="text-center">Work Pending/Closed</h2>
                               <div className="d-flex justify-content-center"  style={{maxHeight:"300px"}}>
                                {
                                    !pending.loading && !completed.loading && <Doughnut data={{
                                        labels:["No. of tasks pending","No. of tasks completed"],
                                        datasets:[{
                                            label:"Report",
                                            data: [pendingVal,completedVal],
                                            backgroundColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            ],
                                            hoverOffset: 4
                                        }]
                                    }} />
                                }
                               </div>
                               <hr />
                               <h2 className="text-center">Tasks closed by teams</h2>
                               <div className="d-flex justify-content-center"  style={{maxHeight:"300px"}}>
                                     {
                                !loading &&  <Bar data={{
                                 labels:Object.keys(teams),
                                 datasets:[{
                                 label:"Teams",
                                 data: Object.values(teams)
                                 }]
                                }} /> 
                               }
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


export default Report