import { Router } from "express";
import multer from "multer";

const agentRouter = Router();

agentRouter.router('/connect').post()
agentRouter.route('/send-programs-list').post()
agentRouter.route('/get-changes').get()

export default {agentRouter}