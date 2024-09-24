import Firewall_utils
import socketio
import os
from dotenv import load_dotenv
load_dotenv()
print("Please wait Connecting to Server...")


System_info = Firewall_utils.get_system_info()


try:
    sio = socketio.SimpleClient()
    sio.connect(os.getenv('SERVER_URL'))

    sio.emit('System_info',  System_info  )


    
    print("Connected to Server")
except Exception as e:
    print('Failed to connect to server')
    print(e)



# @app.get("/agent/get-programs-list")
# async def hello():
#     print('get-programs-list')
#     return Firewall_utils.get_installed_apps()

# @app.get("/agent/get-firewall-rules")
# async def hello():
#     print('get-firewall-rules')
#     return Firewall_utils.get_firewall_rules()

# @app.post("/agent/set-firewall-rule")
# async def setfirewallrule(request: fastapi.Request):
#     data = await request.json()
#     rulename = data.get('rulename')
#     direction = data.get('direction')
#     action = data.get('action')
#     protocol = data.get('protocol')
#     localport = data.get('localport')
#     remoteport = data.get('remoteport')
#     localip = data.get('localip')
#     remoteip = data.get('remoteip')
#     return Firewall_utils.set_firewall_rule(rulename,direction,action,protocol,localport,remoteport,localip,remoteip)

# @app.post("/agent/set-firewall-rule-for-app")
# async def setfirewallruleforapp(request: fastapi.Request):
#     data = await request.json()
#     rulename = data.get('rulename')
#     app_path = data.get('app_path')
#     direction = data.get('direction')
#     action = data.get('action')
#     protocol = data.get('protocol')
#     localport = data.get('localport')
#     remoteport = data.get('remoteport')
#     localip = data.get('localip')
#     remoteip = data.get('remoteip')
#     return Firewall_utils.set_firewall_rule_for_app(rulename,app_path,direction,action,protocol,localport,remoteport,localip,remoteip)
