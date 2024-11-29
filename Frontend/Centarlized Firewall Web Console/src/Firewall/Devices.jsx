import { useEffect,useState } from "react"
import axios from 'axios'
import './Devices.css'
import { NavLink } from "react-router-dom"
function Devices() {
  const [devices, setDevices] = useState([
    {
        hostname: 'ubuntu',
        ip: '192.168.1.1',
        os: 'linux',
        status: 'active',
    }
])
//   useEffect(() => {
//       axios.get('http://localhost:5000/api/web-console/get-devices-list')
//       .then(res => {
//           setDevices(res.data)
//       }
//       )
//       .catch(err => {
//           alert("Unable to Fetch data from server !! ",err)
//       })
//   }, [])
  return (
    <>
        <div className="outer-div">
        <h3 className="connecteddevicesHeading lato-regular">Connected Devices</h3>
        <div className="main-device">
            <table className="devices-list-table">
                <thead>
                    <tr className="devices-list-table-heading">
                        <th>Hostname</th>
                        <th>IP</th>
                        <th>OS</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                      <tr className="tr-data lato-light" key={device._id} >
                            <td><NavLink to={`/devices/${device._id}`} className={'device-name-link'}>{device.hostname}</NavLink></td>
                            <td>{device.ip}</td>
                            <td>{device.os}</td>
                            <td>{device.status}</td>
                            <td>
                                <button className="lato-bold">
                                    Remove
                                </button>
                            </td>
                            
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    </>
  )
}

export default Devices