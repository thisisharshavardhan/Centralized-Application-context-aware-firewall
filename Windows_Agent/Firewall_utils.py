import subprocess
import json

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

    # Traditional applications (32-bit)
    traditional_cmd_32 = 'powershell "Get-ItemProperty HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, InstallLocation | ConvertTo-Json"'
    traditional_apps_32 = run_powershell_command(traditional_cmd_32)

    # Store applications
    store_cmd = 'powershell "Get-AppxPackage | Select-Object Name, InstallLocation | ConvertTo-Json"'
    store_apps = run_powershell_command(store_cmd)

    all_apps = traditional_apps_64 + traditional_apps_32 + store_apps
    return all_apps

