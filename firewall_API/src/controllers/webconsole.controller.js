import axios from 'axios'
const get_programs_list = async (req, res) => {
    try {
        const programs = await axios.get(`http://localhost:8000/agent/get-programs-list`)
        res.status(200).json(programs.data)
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        console.log(error)
    }
}
export  { get_programs_list }