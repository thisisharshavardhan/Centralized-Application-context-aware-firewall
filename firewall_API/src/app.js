import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import AgentRoutes from './routes/agent/Agent.routes.js'
const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(express.json({limit:'160kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())


app.use('/api/agent',AgentRoutes)
export {app}