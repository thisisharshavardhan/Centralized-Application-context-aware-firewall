import mongoose from "mongoose";

const firewallRuleSchema = new mongoose.Schema({
    RuleName: {
        type: String,
        required: true,
        unique: true,
    },
    Enabled: {
        type: Boolean,
        required: true,
    },
    Direction: {
        type: String,
        required: true,
    },
    Profiles: {
        type: String,
        required: true,
    },
    Grouping: {
        type: String,
        required: true,
    },
    LocalIP: {
        type: String,
        required: true,
    },
    RemoteIP: {
        type: String,
        required: true,
    },
    Protocol: {
        type: String,
        required: true,
    },
    LocalPort: {
        type: String,
        required: true,
    },
    RemotePort: {
        type: String,
        required: true,
    },
    EdgeTraversal: {
        type: Boolean,
        required: true,
    },
    Action: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    CreatedBy: {
        type: String,
        required: true,
    },


}, { timestamps: true });

const FirewallRule = mongoose.model("FirewallRule", firewallRuleSchema);

export { FirewallRule };

// Enabled:                              No
// Direction:                            In
// Profiles:                             Private,Public
// Grouping:                             Windows Management Instrumentation (WMI)
// LocalIP:                              Any
// RemoteIP:                             LocalSubnet
// Protocol:                             TCP
// LocalPort:                            Any
// RemotePort:                           Any
// Edge traversal:                       No
// Action:   