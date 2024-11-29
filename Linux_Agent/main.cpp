#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <filesystem>
#include <bits/algorithmfwd.h>
#include <netdb.h>
#include <arpa/inet.h>

// void setFirewallRule(int uid, int port) {
//     std::string command = "iptables -A OUTPUT -p tcp --dport " + std::to_string(port) +
//                           " -m owner --uid-owner " + std::to_string(uid) + " -j ACCEPT";
//     int result = std::system(command.c_str());
//     if (result == 0) {
//         std::cout << "Rule added successfully.\n";
//     } else {
//         std::cerr << "Failed to add rule.\n";
//     }
// }
void getSystemInfo() {
    // OS Info
    std::cout << "Operating System Information:" << std::endl;
    system("uname -a");

    // CPU Info
    std::ifstream cpuInfo("/proc/cpuinfo");
    std::string line;
    std::cout << "\nCPU Information:" << std::endl;
    while (std::getline(cpuInfo, line)) {
        if (line.find("model name") != std::string::npos || line.find("cpu cores") != std::string::npos) {
            std::cout << line << std::endl;
        }
    }
    cpuInfo.close();

    // Memory Info
    std::ifstream memInfo("/proc/meminfo");
    std::cout << "\nMemory Information:" << std::endl;
    for (int i = 0; i < 5 && std::getline(memInfo, line); ++i) {
        std::cout << line << std::endl;
    }
    memInfo.close();
}

void resolveDomainToIP(const std::string& domain) {
    struct hostent* host = gethostbyname(domain.c_str());
    if (host) {
        std::cout << "IP Address for " << domain << ": "
                  << inet_ntoa(*(struct in_addr*)host->h_addr) << std::endl;
    } else {
        std::cerr << "Failed to resolve domain.\n";
    }
}




