import { useEffect,useState } from 'react'
import './Device.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function Device() {
    const {id} = useParams()
    const [device, setDevice] = useState({})
    const [firewallRules, setFirewallRules] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/web-console/get-device-info/${id}`)
        .then(res => {
            setDevice(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        axios.get(`http://localhost:5000/api/web-console/get-firewall-rules`)
        .then(res => {
            setFirewallRules(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])
  return (
    <div>
        <div className='device-details'>
            <span className='lato-regular device-information'>Device Information</span>
            <div className='device-data'>
                <div className='device-info'>
                    <span className='lato-light'>Device Name: </span>
                    <span className='lato-light'>IP:</span>
                    <span className='lato-light'>OS:</span>
                    <span className='lato-light'>OS Version:</span>
                    <span className='lato-light'>Status:</span>
                    <span className='lato-light'>Hostname:</span>
                </div>
                <div className='device-info'>
                    <span className='lato-light'>{device.device_name}</span>
                    <span className='lato-light'>{device.ip}</span>
                    <span className='lato-light'>{device.os}</span>
                    <span className='lato-light'>{device.os_version}</span>
                    <span className='lato-light'>{device.status}</span>
                    <span className='lato-light'>{device.hostname}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Device