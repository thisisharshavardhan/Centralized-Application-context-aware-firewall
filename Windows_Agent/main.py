import Firewall_utils
import fastapi

app = fastapi.FastAPI()

# Description: Develop an application firewall for end-points that can identity and restrict access of application to external network/hosts. The application firewall should provide further granular control of restricting domains, IP addresses and protocols for each application. The firewall should be manageable through a centralized web console where policies for each end-point and application can be centrally deployed. Firewall agent should also be able to monitor network usage behaviour of each application and generate alerts on central dashboard for any traffic anomaly using AI/ML. Challenge: Applying separate firewall policies for each application running on the end-point and managing them through a central web console. Usage: End-point security, network security Users: Cyber security teams Available Solutions (if Yes, reasons for not using them): Individual components are available Desired Outcome: The solution should provide following components: 1. Solution should identify the domains and protocols that any application is trying to access. Further, it should enable allowing of any such network traffic which is not already allowed via centralized console. 2. Context-aware application firewall agent that shall manage firewall policies for each application running on end-point. The agent shall also collect network usage logs of each application and send it to central server. 3. Central web management console that shall be able to manage all end-points and applications 4. Solution should work for Windows end-points. Bonus points for Linux 5. Solution should also detect abnormal network behaviour of applications

@app.get("/agent/get-programs-list")
async def hello():
    print('get-programs-list')
    return Firewall_utils.get_installed_apps()
