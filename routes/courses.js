const express = require('express')
const router = express.Router()
const {getCourses} = require('../controller/courseController')

//get all logs
router.get('/', getCourses)


module.exports = router