import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
function Firewall() {
    const [Programs, setPrograms] = useState([])
    useEffect(() => {
         axios.get('http://localhost:5000/api/web-console/get-programs-list')
        .then((response) => {
            setPrograms(response.data)
            console.log(Programs)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
  return (
    <>
        <h4>Centralized application-context aware firewall</h4>
        <h5><span>List of Programs in Device: </span></h5>
           {
                Programs.map((program, index) => {
                    if(!program.DisplayName) {
                        return null
                    }
                    else{
                        return <p key={index}> <span>{index}  </span>  {program.DisplayName}</p>
                    }
                })
           }
    </>
  )
}

export default Firewall