import { useEffect, useState } from 'react'
import './Device.css'
import { useParams, } from 'react-router-dom'
import axios from 'axios'
function Device() {
    const { id } = useParams()
    const [device, setDevice] = useState({})
    // const [firewallRules, setFirewallRules] = useState([])
    const [state, setState] = useState('inbound')
    const [Programs, setPrograms] = useState([])
    const [localIpCheckbox, setLocalIpCheckbox] = useState(true)
    const [remoteIpCheckbox, setRemoteIpCheckbox] = useState(true)
    const [localPortCheckbox, setLocalPortCheckbox] = useState(true)
    const [remotePortCheckbox, setRemotePortCheckbox] = useState(true)
    const [rulename, setRuleName] = useState('')
    const [programPath, setProgramPath] = useState('')
    const [direction, setDirection] = useState('')
    const [localIp, setLocalIp] = useState('any')
    const [remoteIp, setRemoteIp] = useState('any')
    const [protocol, setProtocol] = useState('')
    const [localPort, setLocalPort] = useState('any')
    const [remotePort, setRemotePort] = useState('any')
    const [action, setAction] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/api/web-console/get-device-info/${id}`)
            .then(res => {
                setDevice(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            
        axios.get(`http://localhost:5000/api/web-console/get-programs-list/${id}`)
            .then(res => {
                setPrograms(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:5000/api/web-console/get-firewall-rules/${id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    },[id]);

    const sendData = (event)=>{
        event.preventDefault()
        const data_form = {
            rulename: rulename,
            app_path: programPath,
            direction: direction,
            action: action,
            protocol: protocol,
            localport: localPort,
            remoteport: remotePort,
            localip: localIp,
            remoteip: remoteIp
        }
        
            axios.post(`http://localhost:5000/api/web-console/set-firewall-rules/${id}`, data_form)
            .then(res => {
                console.log(res)
                if (res.data == true) {
                    alert('Rule added successfully')
                    console.log('Rule added successfully');
                }
            })
    }

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
                            </>
                        ) : null
                    }
                    {state === 'outbound' ? (
                        <>
                            <span className='lato-regular Firewall-rules-sub-title'>Outbound Rules</span>
                        </>
                    ) : null}
                    {
                        state === 'deleterule' ? (
                            <div>
                                delete rule
                            </div>
                        ) : null}
                    {
                        state === 'addrule' ? (
                            <div className='rules-table-forms-div'>
                                <span className='lato-regular Firewall-rules-sub-title'>New Rule</span>
                                <form onSubmit={sendData}>
                                    <label className='lato-light'>Rule Name</label>
                                    <input type='text' name='rule_name' placeholder='Ex: Android Studio'
                                        onChange={(e) => {
                                            setRuleName(e.target.value)
                                        }}
                                        required
                                    />
                                    <label className='lato-light'>Program</label>
                                    <select name='program'
                                        onChange={(e) => {
                                            setProgramPath(e.target.value)
                                        }}
                                        required
                                    >
                                        <option value='' >Select program</option>
                                        <option value='any' >ALL</option>
                                        {
                                            Programs.filter(program => program.DisplayName && program.InstallLocation).map((program, index) => (
                                                <option value={program.InstallLocation} key={index}>{program.DisplayName}</option>
                                            ))
                                        }
                                        {
                                            Programs.filter(program => program.Name && program.InstallLocation).map((program, index) => (
                                                <option value={program.InstallLocation} key={index}>{program.Name}</option>
                                            ))
                                        }
                                    </select>
                                    <label className='lato-light'>Direction</label>
                                    <select name='direction' 
                                        onChange={
                                            (e) => {
                                                setDirection(e.target.value)
                                            }
                                        }
                                        required
                                    >
                                        <option value=''>Select Direction</option>
                                        <option value='in'>Inbound</option>
                                        <option value='out'>Outbound</option>
                                        <option value="inout">Both</option>
                                    </select>
                                    <label className='lato-light'>Action</label>
                                    <select name='action'
                                        onChange={(e) => {
                                            setAction(e.target.value)
                                        }}
                                        required
                                    >
                                        <option value='allow'>Allow</option>
                                        <option value='block'>Block</option>
                                    </select>
                                    <label className='lato-light'>Protocol</label>
                                    <select name="protocol" id="protocol"
                                        onChange={(e) => {
                                            setProtocol(e.target.value)
                                        }}
                                        required
                                    >
                                        <option value=''>Select Protocol</option>
                                        <option value="IPv6">IPv6</option>
                                        <option value="TCP">TCP</option>
                                        <option value="UDP">UDP</option>
                                        <option value="HOPOPT">HOPOPT</option>
                                        <option value="ICMPv4">ICMPv4</option>
                                        <option value="IGMP">IGMP</option>
                                        <option value="IPv6Route">IPv6Route</option>
                                        <option value="IPv6Frag">IPv6Frag</option>
                                        <option value="GRE">GRE</option>
                                        <option value="ICMPv6">ICMPv6</option>
                                        <option value="IPv6-Opts">IPv6-Opts</option>
                                        <option value="VRRP">VRRP</option>
                                        <option value="PGM">PGM</option>
                                        <option value="L2TP">L2TP</option>
                                    </select>
                                    <label className='lato-light'>Local IP</label>
                                    <div>
                                        <input type='checkbox' name='any_local_ip' value={true}  defaultChecked
                                            onChange={() => {
                                                setLocalIpCheckbox(!localIpCheckbox)
                                            }}
                                            
                                        />
                                        <label className='lato-light'>Any local ip</label>
                                    </div>
                                    {
                                        !localIpCheckbox ?(
                                        <input type='text' name='localip' placeholder='Ex: 192.168.1.1'
                                        onChange={(e) => {
                                            setLocalIp(e.target.value)
                                        }}
                                        required
                                        />
                                    ) : null
                                    }

                                    <label className='lato-light'>Remote IP</label>
                                    <div>
                                        <input type='checkbox' name='any_remote_ip'  defaultChecked
                                            onChange={() => {
                                                setRemoteIpCheckbox(!remoteIpCheckbox)
                                            }}
                                        />
                                        <label className='lato-light'>Any remote ip</label>
                                    </div>
                                    {
                                        !remoteIpCheckbox ?(
                                        <input type='text' name='remoteip' placeholder='Ex: 8.8.8.8'
                                        onChange={(e) => {
                                            setRemoteIp(e.target.value)
                                        }}
                                        required
                                        />
                                    ) : null
                                    }
                                    <label className='lato-light'>LocalPort</label>
                                    <div>
                                        <input type='checkbox' name='all_local_port'  defaultChecked
                                            onChange={() => {
                                                setLocalPortCheckbox(!localPortCheckbox)
                                            }}
                                        />
                                        <label className='lato-light'>All local ports</label>
                                    </div>
                                    {
                                        !localPortCheckbox ?(
                                            <input type='text' name='localport' placeholder='Ex: 80, 443, 5000-5005'
                                            onChange={(e) => {
                                                setLocalPort(e.target.value)
                                            }}
                                            required
                                            />
                                        ) : null
                                    }
                                    <label className='lato-light'>RemotePort</label>
                                    <div>
                                        <input type='checkbox' name='all_remote_port'  defaultChecked
                                            onChange={() => {
                                                setRemotePortCheckbox(!remotePortCheckbox)
                                            }}
                                        />
                                        <label className='lato-light'>All remote ports</label>
                                    </div>
                                    {
                                        !remotePortCheckbox ?(
                                    <input type='text' name='remoteport' placeholder='Ex: 80, 443, 5000-5005'
                                        onChange={(e) => {
                                            setRemotePort(e.target.value)
                                        }}
                                        required
                                    />
                                    ) : null
                                    }
                                    <button type='submit'>Add Rule</button>
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
