import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
    rule_name: {
        type: String,
        required: true,
    }
});

export const Rule = mongoose.model('Rule', ruleSchema);