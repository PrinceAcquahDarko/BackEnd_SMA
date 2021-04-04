let express = require('express');
let feedbackRouter= express.Router();
let feedbackController = require('../controller/feedbackController')

function router(){
    feedbackRouter.route('/')
        .post(feedbackController.post)
        .get(feedbackController.get)

    return feedbackRouter
}

module.exports = router();