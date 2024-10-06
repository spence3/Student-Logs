const express = require('express')
const router = express.Router()
const {getLogs, createLog} = require('../controller/logsController')

//get all logs
router.get('/', getLogs)

// //create log
router.post('/', createLog)


module.exports = router