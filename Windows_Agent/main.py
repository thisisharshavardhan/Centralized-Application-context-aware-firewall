import Firewall_utils
import socketio
import os
import elevate
from dotenv import load_dotenv
load_dotenv()
print("Please wait Connecting to Server...")
elevate.elevate()

System_info = Firewall_utils.get_system_info()


sio = socketio.Client()

@sio.event
def connect():
    print("Connected to Server")
    sio.emit('System_info', System_info)

@sio.event
def disconnect():
    print("Disconnected from Server")

@sio.event
def error(data):
    print("Received error:", data)

@sio.event
def success(data):
    print(data)

@sio.event
def get_programs_list():
    sio.emit('programs_list', Firewall_utils.get_installed_apps())

@sio.event
def set_firewall_rule(data):
    rulename = data.get('rulename')
    direction = data.get('direction')
    action = data.get('action')
    protocol = data.get('protocol')
    localport = data.get('localport')
    remoteport = data.get('remoteport')
    localip = data.get('localip')
    remoteip = data.get('remoteip')
    app_path = data.get('app_path')
    print("data")
    if app_path == "any":
        Firewall_utils.set_firewall_rule(rulename,direction,action,protocol,localport,remoteport,localip,remoteip)
        sio.emit('firewall_rule_set', 'Firewall Rule Set Successfully')
    else:
        Firewall_utils.set_firewall_rule_for_app(rulename,app_path,direction,action,protocol,localport,remoteport,localip,remoteip)
        sio.emit('firewall_rule_set', 'Firewall Rule Set Successfully')
try:
    sio.connect(os.getenv('SERVER_URL'))
    sio.wait() 
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
