import { useEffect,useState } from 'react'
import './Device.css'
import { json, useParams } from 'react-router-dom'
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
            setFirewallRules(JSON.parse(res.data))
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
        <div className='firewall-rules-outerdiv'>
            <table>
                <tr>
                    <th>Name</th>
                    <th>enabled</th>
                    <th>direction</th>
                    <th>profiles</th>
                    <th>grouping</th>
                    <th>local_ip</th>
                    <th>remote_ip</th>
                    <th>protocol</th>
                    <th>local_port</th>
                    <th>remote_port</th>
                    <th>action</th>
                </tr>
                <tbody>
                    {firewallRules.map(rule => {
                        return (
                            <tr key={rule.name}>
                                <td>{rule.name}</td>
                                <td>{rule.enabled}</td>
                                <td>{rule.direction}</td>
                                <td>{rule.profiles}</td>
                                <td>{rule.grouping}</td>
                                <td>{rule.local_ip}</td>
                                <td>{rule.remote_ip}</td>
                                <td>{rule.protocol}</td>
                                <td>{rule.local_port}</td>
                                <td>{rule.remote_port}</td>
                                <td>{rule.action}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Device