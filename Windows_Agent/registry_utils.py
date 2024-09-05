import subprocess
import json

def get_installed_apps():
    traditional_cmd = 'powershell "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, InstallLocation | ConvertTo-Json"'
    traditional_result = subprocess.run(traditional_cmd, shell=True, capture_output=True, text=True)
    
    traditional_apps = json.loads(traditional_result.stdout) if traditional_result.returncode == 0 else []

    store_cmd = 'powershell "Get-AppxPackage | Select-Object Name, InstallLocation | ConvertTo-Json"'
    store_result = subprocess.run(store_cmd, shell=True, capture_output=True, text=True)
    
    store_apps = json.loads(store_result.stdout) if store_result.returncode == 0 else []

    all_apps = traditional_apps + store_apps
    return all_apps
