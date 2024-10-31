import  {Device}  from "../models/device.model.js";

const sendProgramList = async (socket,data) => {   
    try {
         const all_apps = data
    const device = await Device.findOne({socket_id: socket.id})
    device.all_apps = data
    await device.save()
    return  socket.emit('success',"apps sent to server")
    } catch (error) {
        console.log(error);
    }   
}

const sendSystemInfo = async (socket, info) => {
    try {
        console.log(socket.id);
        
        const system_info = info;
        if (!system_info) {
            console.log("No data received");
            return socket.emit('error', { message: "No data received" });
        }

        const already_exists = await Device.findOne({ device_name: system_info.device_name });
        if (already_exists) {
            already_exists.socket_id = socket.id;
            await already_exists.save();
            return socket.emit('error', { message: "Welcome back !!" });
        }
        const deviceData = await Device.create({
            socket_id: socket.id,
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

        return socket.emit('success', deviceData);
    } catch (error) {
        return socket.emit('error', { message: error.message });
    }
};



export {
    sendProgramList,
    sendSystemInfo,
    
}
