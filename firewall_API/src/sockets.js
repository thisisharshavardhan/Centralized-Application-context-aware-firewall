import { createServer } from 'http'
import { Server } from 'socket.io'
import { app } from './app.js'
import {} from 'dotenv/config'
import { sendSystemInfo } from './controllers/Agent.controller.js'

const server = createServer(app)
const io = new Server(server,{
    cors:{
        origin:process.env.CORS_ORIGIN,
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{

    socket.on('System_info',(data)=>{
        sendSystemInfo(socket,data)
    })

    socket.on('disconnect',()=>{
        console.log('Socket disconnected')
    })


})


export { server }