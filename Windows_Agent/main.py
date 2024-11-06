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
    sio.emit('programs_list', Firewall_utils.get_installed_apps())

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

@sio.event
def get_firewall_rules():
    sio.emit('firewall_rules', Firewall_utils.get_firewall_rules())

try:
    sio.connect(os.getenv('SERVER_URL'))
    sio.wait() 
except Exception as e:
    print('Failed to connect to server')
    print(e)
