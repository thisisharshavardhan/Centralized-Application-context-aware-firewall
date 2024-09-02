import { Router } from "express";

const webConsoleRouter = Router()

webConsoleRouter.route('get-clients-list').get()
webConsoleRouter.route('get-programs-list').get()

export default {webConsoleRouter}