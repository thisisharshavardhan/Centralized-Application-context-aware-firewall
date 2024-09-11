import subprocess
import json
import platform
import psutil
import socket
import wmi
import os
import elevate




def get_installed_apps():
    def run_powershell_command(cmd):
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            try:
                return json.loads(result.stdout)
            except json.JSONDecodeError:
                return []
        return []

    traditional_cmd_64 = 'powershell "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, InstallLocation | ConvertTo-Json"'
    traditional_apps_64 = run_powershell_command(traditional_cmd_64)

    traditional_cmd_32 = 'powershell "Get-ItemProperty HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, InstallLocation | ConvertTo-Json"'
    traditional_apps_32 = run_powershell_command(traditional_cmd_32)

    store_cmd = 'powershell "Get-AppxPackage | ConvertTo-Json"'
    store_apps = run_powershell_command(store_cmd)

    all_apps = traditional_apps_64 + traditional_apps_32 + store_apps


    return all_apps

def get_system_info():
    def get_ip_address():
        for interface, addrs in psutil.net_if_addrs().items():
            for addr in addrs:
                if addr.family == socket.AF_INET and not addr.address.startswith("127."):
                    return addr.address
        return "127.0.0.1"
    def get_cpu_name():
        c = wmi.WMI()
        for cpu in c.Win32_Processor():
            return cpu.Name
    system_info = {
        "device_name": socket.gethostname(),
        "Configuration": {
            "CPU": get_cpu_name(),
            "RAM": round(psutil.virtual_memory().total / (1024.0 ** 3)),  # RAM in GB
        },
        "ip": get_ip_address(),
        "os": platform.system(),
        "os_version": platform.version(),
        "hostname": socket.gethostname()
    }
    return system_info


    
def set_firewall_rule(rulename,direction,action,protocol='any',localport='any',remoteport='any',localip='any',remoteip='any'):
    try:
        if not rulename:
            raise Exception("Rule name is required")
        if direction not in ["in", "out", "inout"]:
            raise Exception("Invalid direction. Must be 'in' or 'out' or 'inout'")
        if action not in ["allow", "block"]:
            raise Exception("Invalid action. Must be 'allow' or 'block'")
        
        if direction not in ["in", "out"]:
            result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rulename, 'dir=' + 'in', 'action=' + action], capture_output=True, text=True)
            result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rulename, 'dir=' + 'out', 'action=' + action], capture_output=True, text=True)
        else:
            result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rulename, 'dir=' + direction, 'action=' + action, 'protocol=' + protocol, 'localport=' + localport, 'remoteport=' + remoteport, 'localip=' + localip, 'remoteip=' + remoteip], capture_output=True, text=True)
        
        if result.returncode != 0:
            raise Exception(f"Command failed with return code {result.returncode}")
        
        return True
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return False
    
def set_firewall_rule_for_app(rulename,app_path,direction,action,protocol,localport='any',remoteport='any',localip='any',remoteip='any'):
    print(rulename,app_path,direction,action,protocol,localport,remoteport,localip,remoteip)
    try:
        if (not rulename):
            raise Exception("Rule name is required")
        if (not app_path):
            raise Exception("Application path is required")
        if (direction not in ["in", "out", "inout"]):
            raise Exception("Invalid direction. Must be 'in' or 'out' or 'inout'")
        if (action not in ["allow", "block"]):
            raise Exception("Invalid action. Must be 'allow' or 'block'")
        
        # $executables = Get-ChildItem -Path $path -Filter *.exe
        executables = [f for f in os.listdir(app_path) if f.endswith('.exe')]
        for executable in executables:
            if direction not in ["in", "out"]:
                print(app_path+"\\"+executable)
                result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rulename, 'dir=' + 'in', 'action=' + action, 'program=' + app_path + "\\" + executable], capture_output=True, text=True)
                result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rulename, 'dir=' + 'out', 'action=' + action, 'program=' + app_path + "\\" + executable], capture_output=True, text=True)
            else:
                result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rulename, 'dir=' + direction, 'action=' + action, 'protocol=' + protocol, 'localport=' + localport, 'remoteport=' + remoteport, 'localip=' + localip, 'remoteip=' + remoteip, 'program=' + app_path + "\\" + executable], capture_output=True, text=True)     
            if result.returncode != 0:
                raise Exception(f"Command failed with return code {result.returncode}")
        
        return True
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return False
    
def get_firewall_rules():
    try:
        result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'show', 'rule', 'name=all'], capture_output=True, text=True)
        
        if result.returncode != 0:
            raise Exception(f"Command failed with return code {result.returncode}")
        
        output = result.stdout
        rules = parse_firewall_rules(output)
        
        return json.dumps(rules, indent=4)
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def parse_firewall_rules(output):
    rules = []
    rule = {}
    for line in output.splitlines():
        if line.startswith("Rule Name:"):
            if rule:
                rules.append(rule)
                rule = {}
            rule['name'] = line.split(":", 1)[1].strip()
        elif line.startswith("Enabled:"):
            rule['enabled'] = line.split(":", 1)[1].strip()
        elif line.startswith("Direction:"):
            rule['direction'] = line.split(":", 1)[1].strip()
        elif line.startswith("Profiles:"):
            rule['profiles'] = line.split(":", 1)[1].strip()
        elif line.startswith("Grouping:"):
            rule['grouping'] = line.split(":", 1)[1].strip()
        elif line.startswith("LocalIP:"):
            rule['local_ip'] = line.split(":", 1)[1].strip()
        elif line.startswith("RemoteIP:"):
            rule['remote_ip'] = line.split(":", 1)[1].strip()
        elif line.startswith("Protocol:"):
            rule['protocol'] = line.split(":", 1)[1].strip()
        elif line.startswith("LocalPort:"):
            rule['local_port'] = line.split(":", 1)[1].strip()
        elif line.startswith("RemotePort:"):
            rule['remote_port'] = line.split(":", 1)[1].strip()
        elif line.startswith("Action:"):
            rule['action'] = line.split(":", 1)[1].strip()
        # Add more fields as needed
    if rule:
        rules.append(rule)
    return rules

# def set_firewall_rule(rule_name, direction, action, protocol, local_port, remote_port, local_ip, remote_ip):
#     try:
#         if not rule_name:
#             raise Exception("Rule name is required")
#         if not direction:
#             raise Exception("Direction is required")
#         if not action:
#             raise Exception("Action is required")
#         if not protocol:
#             protocol = "Any"  
#         if not local_port:
#             raise Exception("Local port is required")
#         if not remote_port:
#             raise Exception("Remote port is required")
#         if not local_ip:
#             raise Exception("Local IP is required")
#         if not remote_ip:
#             raise Exception("Remote IP is required")
#         if action not in ["allow", "block"]:
#             raise Exception("Invalid action. Must be 'allow' or 'block'")
#         if direction not in ["in", "out"]:
#             raise Exception("Invalid direction. Must be 'in' or 'out'")
        
#         result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rule_name, 'dir=' + direction, 'action=' + action, 'protocol=' + protocol, 'localport=' + local_port, 'remoteport=' + remote_port, 'localip=' + local_ip, 'remoteip=' + remote_ip], capture_output=True, text=True)
        
#         if result.returncode != 0:
#             raise Exception(f"Command failed with return code {result.returncode}")
        
#         return True
    
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return False

# def set_firewall_rule_port(rule_name, direction, action, protocol, local_port, remote_port):
#     try:
#         if not rule_name:
#             raise Exception("Rule name is required")
#         if not direction:
#             raise Exception("Direction is required")
#         if not action:
#             raise Exception("Action is required")
#         if not protocol:
#             protocol = "Any"  
#         if not local_port:
#             raise Exception("Local port is required")
#         if not remote_port:
#             raise Exception("Remote port is required")
#         if action not in ["allow", "block"]:
#             raise Exception("Invalid action. Must be 'allow' or 'block'")
#         if direction not in ["in", "out"]:
#             raise Exception("Invalid direction. Must be 'in' or 'out'")
        
#         result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rule_name, 'dir=' + direction, 'action=' + action, 'protocol=' + protocol, 'localport=' + local_port, 'remoteport=' + remote_port], capture_output=True, text=True)
        
#         if result.returncode != 0:
#             raise Exception(f"Command failed with return code {result.returncode}")
        
#         return True
    
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return False

# def set_firewall_rule_ip(rule_name, direction, action, protocol, local_ip, remote_ip):
#     try:
#         if not rule_name:
#             raise Exception("Rule name is required")
#         if not direction:
#             raise Exception("Direction is required")
#         if not action:
#             raise Exception("Action is required")
#         if not protocol:
#             protocol = "Any"  
#         if not local_ip:
#             raise Exception("Local IP is required")
#         if not remote_ip:
#             raise Exception("Remote IP is required")
#         if action not in ["allow", "block"]:
#             raise Exception("Invalid action. Must be 'allow' or 'block'")
#         if direction not in ["in", "out"]:
#             raise Exception("Invalid direction. Must be 'in' or 'out'")
        
#         result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rule_name, 'dir=' + direction, 'action=' + action, 'protocol=' + protocol, 'localip=' + local_ip, 'remoteip=' + remote_ip], capture_output=True, text=True)
        
#         if result.returncode != 0:
#             raise Exception(f"Command failed with return code {result.returncode}")
        
#         return True
    
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return False

# def set_firewall_rule_port_app(rule_name, direction, action, protocol, local_port, remote_port, app_path):
#     try:
#         if not rule_name:
#             raise Exception("Rule name is required")
#         if not direction:
#             raise Exception("Direction is required")
#         if not action:
#             raise Exception("Action is required")
#         if not protocol:
#             protocol = "Any"  
#         if not local_port:
#             raise Exception("Local port is required")
#         if not remote_port:
#             raise Exception("Remote port is required")
#         if not app_path:
#             raise Exception("Application path is required")
#         if action not in ["allow", "block"]:
#             raise Exception("Invalid action. Must be 'allow' or 'block'")
#         if direction not in ["in", "out"]:
#             raise Exception("Invalid direction. Must be 'in' or 'out'")
        
#         result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rule_name, 'dir=' + direction, 'action=' + action, 'protocol=' + protocol, 'localport=' + local_port, 'remoteport=' + remote_port, 'program=' + app_path], capture_output=True, text=True)
        
#         if result.returncode != 0:
#             raise Exception(f"Command failed with return code {result.returncode}")
        
#         return True
    
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return False

# def set_firewall_rule_ip_app(rule_name, direction, action, protocol, local_ip, remote_ip, app_path):
#     try:
#         if not rule_name:
#             raise Exception("Rule name is required")
#         if not direction:
#             raise Exception("Direction is required")
#         if not action:
#             raise Exception("Action is required")
#         if not protocol:
#             protocol = "Any"  
#         if not local_ip:
#             raise Exception("Local IP is required")
#         if not remote_ip:
#             raise Exception("Remote IP is required")
#         if not app_path:
#             raise Exception("Application path is required")
#         if action not in ["allow", "block"]:
#             raise Exception("Invalid action. Must be 'allow' or 'block'")
#         if direction not in ["in", "out"]:
#             raise Exception("Invalid direction. Must be 'in' or 'out'")
        
#         result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rule_name, 'dir=' + direction, 'action=' + action, 'protocol=' + protocol, 'localip=' + local_ip, 'remoteip=' + remote_ip, 'program=' + app_path], capture_output=True, text=True)
        
#         if result.returncode != 0:
#             raise Exception(f"Command failed with return code {result.returncode}")
        
#         return True
    
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return False
    
# def set_firewall_rule_app(rule_name, app_path, direction, action, protocol, local_port, remote_port, local_ip, remote_ip):
#     try:
#         if not rule_name:
#             raise Exception("Rule name is required")
#         if not app_path:
#             raise Exception("Application path is required")
#         if not direction:
#             raise Exception("Direction is required")
#         if not action:
#             raise Exception("Action is required")
#         if not protocol:
#             protocol = "Any"  
#         if not local_port:
#             raise Exception("Local port is required")
#         if not remote_port:
#             raise Exception("Remote port is required")
#         if not local_ip:
#             raise Exception("Local IP is required")
#         if not remote_ip:
#             raise Exception("Remote IP is required")
#         if action not in ["allow", "block"]:
#             raise Exception("Invalid action. Must be 'allow' or 'block'")
#         if direction not in ["in", "out"]:
#             raise Exception("Invalid direction. Must be 'in' or 'out'")
        
#         result = subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=' + rule_name, 'dir=' + direction, 'action=' + action, 'protocol=' + protocol, 'localport=' + local_port, 'remoteport=' + remote_port, 'localip=' + local_ip, 'remoteip=' + remote_ip, 'program=' + app_path], capture_output=True, text=True)
        
#         if result.returncode != 0:
#             raise Exception(f"Command failed with return code {result.returncode}")
        
#         return True