import { Router } from "express";
import multer from "multer";
import {sendProgramList} from './../../controllers/Agent.controller.js'

const agentRouter = Router();

const upload = multer();

agentRouter.route('/send-programs-list').post(upload.none(),sendProgramList)

agentRouter.route('/get-changes').get()

export default agentRouter