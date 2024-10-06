const express = require('express')
var fs = require('fs')
var data = fs.readFileSync('db.json')
logs = JSON.parse(data)

// @desc     get all logs
// @route    GET /api/v1/logs
const getLogs = (req, res, next) => {
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
        return res
            .status(200)
            .json(logs.slice(0,limit))
    }
    res.status(200).json(logs.logs)
}

// @desc     Create log
// @route    POST /api/v1/logs
const createLog = (req, res, next) =>{
    console.log('called')
    const {courseId, uvuId ,text, } = req.body
    console.log(uvuId)
    const newLog = {
        courseId: courseId,
        uvuId: uvuId,
        date: new Date().toISOString(),
        text: text
    }
    
    logs.logs.push(newLog)
    fs.writeFile('db.json', JSON.stringify(logs), (err) => {
        if(err) throw err
        console.log('Successfully added')
    })
    res.status(201).json(logs)
}

module.exports = {getLogs, createLog}