import { Router } from "express";
import { get_programs_list,get_devices_list } from "../../controllers/webconsole.controller.js";
import multer from "multer";

const upload = multer();

const webConsoleRouter = Router()

webConsoleRouter.route('/get-devices-list').get(get_devices_list)
webConsoleRouter.route('/get-programs-list').get(upload.none(),get_programs_list)

export default webConsoleRouter