const express = require('express')
const router = express.Router()
const {getLogs} = require('../controller/logsController')

//get all logs
router.get('/', getLogs)


module.exports = router