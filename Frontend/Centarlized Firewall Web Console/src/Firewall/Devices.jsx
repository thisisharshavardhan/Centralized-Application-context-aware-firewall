import { useEffect,useState } from "react"
import axios from 'axios'
import './Devices.css'
import { NavLink } from "react-router-dom"
function Devices() {
  const [devices, setDevices] = useState([])
  useEffect(() => {
      axios.get('http://localhost:5000/api/web-console/get-devices-list')
      .then(res => {
          setDevices(res.data)
      }
      )
      .catch(err => {
          console.log(err)
      })
  }, [])
  return (
    <>
        <div className="outer-div">
        <h3 className="connecteddevicesHeading lato-regular">Connected Devices</h3>
        <div className="main-device">
            <table className="devices-list-table">
                <thead>
                    <tr className="devices-list-table-heading">
                        <th>Device Name</th>
                        <th>IP</th>
                        <th>OS</th>
                        <th>OS Version</th>
                        <th>Status</th>
                        <th>Hostname</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                      <tr className="tr-data lato-light" key={device._id} >
                            {/* <td>{device.device_name}</td>
                            <td>{device.ip}</td>
                            <td>{device.os}</td>
                            <td>{device.os_version}</td>
                            <td>{device.status}</td>
                            <td>{device.hostname}</td> */}
                            <td><NavLink to={`/devices/${device._id}`} className={'device-name-link'}>{device.device_name}</NavLink></td>
                            <td>{device.ip}</td>
                            <td>{device.os}</td>
                            <td>{device.os_version}</td>
                            <td>{device.status}</td>
                            <td>{device.hostname}</td>
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