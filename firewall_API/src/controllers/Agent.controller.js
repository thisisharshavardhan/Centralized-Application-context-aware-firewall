import  {Device}  from "../models/device.model.js";

const sendProgramList = async (req, res) => {
    
    const all_apps = req.body
    all_apps.forEach(app => {
        if(!app.InstallLocation){
            
        }
        else{
            console.log(app)
        }
    });
    
    res.send("req received")
    
}

const sendSystemInfo = async (req, res) => {
    const system_info = req.body
    if(!system_info){
        res.status(400).send({message:"Invalid Data"})
    }
    const already_exists = await Device.findOne({device_name: system_info.device_name})
    if(already_exists){
        res.status(400).send({message:"Device already exists"})
    }
    const data = await Device.create({
        device_name: system_info.device_name,
        Configuration: {
            CPU: system_info.Configuration.CPU,
            RAM: system_info.Configuration.RAM,
        },
        ip: req.ip,
        os: system_info.os,
        os_version: system_info.os_version,
        hostname: system_info.hostname
    })
    res.send(data)
}

export {
    sendProgramList,
    sendSystemInfo
}