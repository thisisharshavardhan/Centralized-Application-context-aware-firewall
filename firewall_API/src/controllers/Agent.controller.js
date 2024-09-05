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

export {sendProgramList}