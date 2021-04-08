let express = require('express');
let loginRouter = express.Router();


function Router(connect){
    let loginController = require('../controller/loginController')(connect)
    loginRouter.route('/')
        .post(loginController.post)

    return loginRouter
}

module.exports = Router