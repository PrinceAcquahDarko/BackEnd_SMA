let express = require('express');
let registerRouter = express.Router();


function Router(connect){
    let registerController = require('../controller/registerController')(connect)
    registerRouter.use(registerController.validate)
    registerRouter.route('/')
        .post(registerController.post)
        .get(registerController.authorization, registerController.get)
        .put(registerController.authorization, registerController.update)
    registerRouter.route('/staff')
        .get(registerController.getAllData)
        .delete(registerController.deleteStaff);
    return registerRouter
}

module.exports = Router