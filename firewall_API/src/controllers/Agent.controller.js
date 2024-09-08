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
    try {
        const system_info = req.body
        if(!system_info){
            return res.status(400).send({message:"Invalid Data"})
        }
        const already_exists = await Device.findOne({device_name: system_info.device_name})
        if(already_exists){
            return res.status(400).send({message:"Device already exists"})
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
        return res.send(data)
    } catch (error) {
        return res.status(500).send({message:error.message})
        
    }
}

export {
    sendProgramList,
    sendSystemInfo
}