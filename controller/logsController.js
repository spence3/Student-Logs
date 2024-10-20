const Log = require('../models/logs.model.js')
var fs = require('fs')
var data = fs.readFileSync('db.json')
logs = JSON.parse(data)


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

// const createLog = (req, res, next) =>{
//     console.log('called')
//     const {courseId, uvuId, date,text} = req.body
//     console.log(uvuId)
//     const newLog = {
//         courseId: courseId,
//         uvuId: uvuId,
//         date: date,
//         text: text
//     }
    
//     logs.logs.push(newLog)
//     fs.writeFile('db.json', JSON.stringify(logs), (err) => {
//         if(err) throw err
//         console.log('Successfully added')
//     })
//     res.status(201).json(logs)
// }


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