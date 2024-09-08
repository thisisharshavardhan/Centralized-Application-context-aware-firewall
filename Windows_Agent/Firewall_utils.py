import subprocess
import json
import platform
import psutil
import socket
import wmi

def get_installed_apps():
    def run_powershell_command(cmd):
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            try:
                return json.loads(result.stdout)
            except json.JSONDecodeError:
                return []
        return []

    traditional_cmd_64 = 'powershell "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, InstallLocation, DisplayVersion, Publisher | ConvertTo-Json"'
    traditional_apps_64 = run_powershell_command(traditional_cmd_64)

    traditional_cmd_32 = 'powershell "Get-ItemProperty HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, InstallLocation, DisplayVersion, Publisher | ConvertTo-Json"'
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

