import axios from 'axios'
import {Device} from '../models/device.model.js'
const get_programs_list = async (req, res) => {
    try {
        const programs = await axios.get(`http://localhost:8000/agent/get-programs-list`)
        res.status(200).json(programs.data)
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        console.log(error)
    }
}

const get_devices_list = async (req, res) => {
    const devices = await Device.find()
    res.status(200).json(devices)
}
export  { get_programs_list, get_devices_list }