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

const sendSystemInfo = async (socket, info) => {
    try {

        const system_info = info;
        if (!system_info) {
            console.log("No data received");
            return socket.emit('error', { message: "No data received" });
        }

        const already_exists = await Device.findOne({ device_name: system_info.device_name });
        if (already_exists) {
            return socket.emit('error', { message: "Device already exists" });
        }
        const deviceData = await Device.create({
            device_name: system_info.device_name,
            Configuration: {
                CPU: system_info.Configuration.CPU,
                RAM: system_info.Configuration.RAM,
            },
            ip: socket.handshake.address,
            os: system_info.os,
            os_version: system_info.os_version,
            hostname: system_info.hostname
        });

        return socket.emit('systemInfoResponse', deviceData);
    } catch (error) {
        return socket.emit('error', { message: error.message });
    }
};



export {
    sendProgramList,
    sendSystemInfo,
    
}