import { useEffect, useState } from 'react'
import './Device.css'
import { useParams, } from 'react-router-dom'
import axios from 'axios'
function Device() {
    const { id } = useParams()
    const [device, setDevice] = useState({})
    const [firewallRules, setFirewallRules] = useState([])
    const [state, setState] = useState('inbound')
    useEffect(() => {
        axios.get(`http://localhost:5000/api/web-console/get-device-info/${id}`)
            .then(res => {
                setDevice(res.data)
                console.log(firewallRules)
            })
            .catch(err => {
                console.log(err)
            })
        axios.get(`http://localhost:5000/api/web-console/get-firewall-rules`)
            .then(res => {
                setFirewallRules(JSON.parse(res.data))
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, []);
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
                <span className='lato-regular firewall-rules'>Firewall Rules</span>
                <div className='firewall-rules'>
                    <div className='firewall-rules-buttons'>
                        <button onClick={
                            () => {
                                setState('inbound')
                            }
                        }>Inbound</button>
                        <button onClick={
                            () => {
                                setState('outbound')
                            }
                        }>Outbound</button>
                    </div>
                    <button className='firewall-rules-add-button ' onClick={
                        () => {
                            setState('addrule')
                        }
                    }> + Rule  </button>
                </div>
                <div className='firewall-rules-sub-box'>
                    {
                        state === 'inbound' ? (
                            <>
                                <span className='lato-regular Firewall-rules-sub-title'>Inbound Rules</span>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Rule_Name</th>
                                            <th>Direction</th>
                                            <th>Profiles</th>
                                            <th>Grouping</th>
                                            <th>LocalIp</th>
                                            <th>RemoteIp</th>
                                            <th>Protocol</th>
                                            <th>LocalPort</th>
                                            <th>RemotePort</th>
                                            <th>Edge Traversal</th>
                                            <th>Action</th>
                                            <th>Enabled</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </>
                        ) : null
                    }
                    {state === 'outbound' ? (
                        <>
                            <span className='lato-regular Firewall-rules-sub-title'>Outbound Rules</span>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Rule_Name</th>
                                        <th>Direction</th>
                                        <th>Profiles</th>
                                        <th>Grouping</th>
                                        <th>LocalIp</th>
                                        <th>RemoteIp</th>
                                        <th>Protocol</th>
                                        <th>LocalPort</th>
                                        <th>RemotePort</th>
                                        <th>Edge Traversal</th>
                                        <th>Action</th>
                                        <th>Enabled</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </>
                    ) : null}
                    {
                        state === 'addrule' ? (
                            <div>
                                <span className='lato-regular Firewall-rules-sub-title'>New Rule</span>
                                <form>
                                    <label className='lato-light'>Rule Name</label>
                                    <input type='text' name='rule_name' placeholder='Ex: Android Studio' />
                                    <label className='lato-light'>Direction</label>
                                    <select name='direction'>
                                        <option value='inbound'>Inbound</option>
                                        <option value='outbound'>Outbound</option>
                                        <option value='both'>Both</option>
                                    </select>
                                    <label className='lato-light'>Profiles</label>
                                    {/* three checkbox with public domain private */}
                                    <div >
                                        <div>
                                            <input type='checkbox' name='profiles' value='public' defaultChecked />
                                            <label className='lato-light'>Public</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='profiles' value='private' defaultChecked />
                                            <label className='lato-light'>Private</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='profiles' value='domain' defaultChecked />
                                            <label className='lato-light'>Domain</label>
                                        </div>
                                    </div>
                                    <div>
                                        <input type='checkbox' name='any_local_ip' value={true} defaultChecked />
                                        <label className='lato-light'>Any local ip</label>
                                    </div>
                                    
                                    <label className='lato-light'>Local IP</label>
                                    <input type='text' name='localip' />

                                    <div>
                                        <input type='checkbox' name='any_remote_ip' defaultChecked />
                                        <label className='lato-light'>Any remote ip</label>
                                    </div>
                                    <label className='lato-light'>Remote IP</label>
                                    <input type='text' name='remoteip' />
                                    <div>
                                        <input type='checkbox' name='all_protocol' defaultChecked />
                                        <label className='lato-light'>All protocols</label>
                                    </div>
                                    <label className='lato-light'>Protocol</label>
                                    <input type='text' name='protocol' />
                                    <div>
                                        <input type='checkbox' name='all_local_port' defaultChecked />
                                        <label className='lato-light'>All local ports</label>
                                    </div>
                                    <label className='lato-light'>LocalPort</label>
                                    <input type='text' name='localport' />
                                    <div>
                                        <input type='checkbox' name='all_remote_port' defaultChecked />
                                        <label className='lato-light'>All remote ports</label>
                                    </div>
                                    <label className='lato-light'>RemotePort</label>
                                    <input type='text' name='remoteport' />
                                    <label className='lato-light'>Edge Traversal (allow inbound traffic from outside LAN)</label>
                                    <select name='edge_traversal'>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </select>
                                    <label className='lato-light'>Action</label>
                                    <select name='action'>
                                        <option value='allow'>Allow</option>
                                        <option value='block'>Block</option>
                                    </select>
                                    <button type='submit'>Submit</button>
                                </form>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Device