import axios from 'axios'
import {Device} from '../models/device.model.js'
const get_programs_list = async (req, res) => {
    try {
        const programs = await axios.get(`http://localhost:8000/agent/get-programs-list`)
        return res.status(200).json(programs.data)
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        console.log(error)
    }
}

const get_devices_list = async (req, res) => {
    const devices = await Device.find()
    return res.status(200).json(devices)
}

const get_device_info = async (req, res) => {
    try {
        const { _id } = req.params
        if(!_id){
            return res.status(400).send({message:"ID needed to get device info"})
        }
        const device = await Device.findById(_id)
        if(!device){
            return res.status(404).send({message:"Device not found"})
        }
        return res.status(200).json(device.toJSON())
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        console.log(error)
    }
}

const get_firewall_rules = async (req, res) => {
    try {
        const rules = await axios.get(`http://localhost:8000/agent/get-firewall-rules`)
        return res.status(200).json(rules.data)
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
        console.log(error)
    }
}

export  { get_programs_list, get_devices_list, get_device_info, get_firewall_rules }