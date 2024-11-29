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


void resolveDomainToIP(const std::string& domain) {
    struct hostent* host = gethostbyname(domain.c_str());
    if (host) {
        std::cout << "IP Address for " << domain << ": "
                  << inet_ntoa(*(struct in_addr*)host->h_addr) << std::endl;
    } else {
        std::cerr << "Failed to resolve domain.\n";
    }
}


