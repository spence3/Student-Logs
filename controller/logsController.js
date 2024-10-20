const Log = require('../models/logs.model.js')

// @desc     get all logs
// @route    GET /api/v1/logs
const getLogs = async (req, res) => {
    try {
        const logs = await Log.find({})
        res.status(200).json(logs)
    } catch (error) {
        res.status(500).json({error: error.message})   
    }
}

// @desc     Create log
// @route    POST /api/v1/logs
const createLog = async (req,res) => {
    try {
        const log = await Log.create(req.body)
        res.status(200).json(log)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {getLogs, createLog}