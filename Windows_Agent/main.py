import Firewall_utils
import fastapi
from fastapi.middleware.cors import CORSMiddleware
import requests
import elevate

app = fastapi.FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
<<<<<<< HEAD
=======
# elevate.elevate()

>>>>>>> d331f58dcb5ae65f3804f05bb65535fd38e2cfdb

def send_system_info():
    system_info = Firewall_utils.get_system_info()
    response = requests.post('http://localhost:5000/api/agent/send-systeminfo', system_info)
    if response.status_code == 200:
        print("System info sent successfully")
    else:
        print(f"Failed to send system info: {response.status_code}")

@app.get("/agent/get-programs-list")
async def hello():
    print('get-programs-list')
    return Firewall_utils.get_installed_apps()

@app.get("/agent/get-firewall-rules")
async def hello():
    print('get-firewall-rules')
    return Firewall_utils.get_firewall_rules()

@app.post("/agent/set-firewall-rule")
async def setfirewallrule(request: fastapi.Request):
    data = await request.json()
    rulename = data.get('rulename')
    direction = data.get('direction')
    action = data.get('action')
    protocol = data.get('protocol')
    localport = data.get('localport')
    remoteport = data.get('remoteport')
    localip = data.get('localip')
    remoteip = data.get('remoteip')
    return Firewall_utils.set_firewall_rule(rulename,direction,action,protocol,localport,remoteport,localip,remoteip)

@app.post("/agent/set-firewall-rule-for-app")
async def setfirewallruleforapp(request: fastapi.Request):
    data = await request.json()
    rulename = data.get('rulename')
    app_path = data.get('app_path')
    direction = data.get('direction')
    action = data.get('action')
    protocol = data.get('protocol')
    localport = data.get('localport')
    remoteport = data.get('remoteport')
    localip = data.get('localip')
    remoteip = data.get('remoteip')
    return Firewall_utils.set_firewall_rule_for_app(rulename,app_path,direction,action,protocol,localport,remoteport,localip,remoteip)



send_system_info()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run( app, host="0.0.0.0", port=8000 )
