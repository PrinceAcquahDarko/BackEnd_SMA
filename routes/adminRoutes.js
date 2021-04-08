let express = require('express');
let adminRouter = express.Router();
let position = require('../controller/middleware')

function router(connect){
    let adminController = require('../controller/adminController')(connect)
    adminRouter.route('/')
        .post(position.authorize, adminController.post)
        .get(adminController.get)

    return adminRouter
}

module.exports = router;