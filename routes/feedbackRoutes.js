let express = require('express');
let feedbackRouter= express.Router();

function router(connect){
    let feedbackController = require('../controller/feedbackController')(connect)

    feedbackRouter.route('/')
        .post(feedbackController.post)
        .get(feedbackController.get)

    return feedbackRouter
}

module.exports = router;