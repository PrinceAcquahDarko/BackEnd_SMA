let express = require('express');
let studentsRouter = express.Router();
let position = require('../controller/middleware')

function router(connect){
    let studentsController = require('../controller/studentsController')(connect)
    studentsRouter.route('/')
        .get(studentsController.get)
        .post(studentsController.post)
        .delete(studentsController.deleteStudent)
       
    studentsRouter.route('/update')
        .post(studentsController.updateStudent);
    studentsRouter.route('/marks')
        .post(position.authorize, studentsController.postMarks)

    studentsRouter.route('/fees')
        .post(position.authorize, studentsController.postfees)

    

    return studentsRouter
}

module.exports = router;