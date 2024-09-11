import { Router } from "express";
import { get_programs_list,get_devices_list,get_device_info,get_firewall_rules } from "../../controllers/webconsole.controller.js";
import multer from "multer";

const upload = multer();

const webConsoleRouter = Router()

webConsoleRouter.route('/get-devices-list').get(get_devices_list)
webConsoleRouter.route('/get-device-info/:_id').get(upload.none(),get_device_info)
webConsoleRouter.route('/get-programs-list').get(upload.none(),get_programs_list)
webConsoleRouter.route('/get-firewall-rules').get(upload.none(),get_firewall_rules)

// webConsoleRouter.route('/set-firewall-rules').post(upload.none(),set_firewall_rules)

export default webConsoleRouter