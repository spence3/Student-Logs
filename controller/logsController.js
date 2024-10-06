const express = require('express')
var fs = require('fs')
var logs = require('../db.json')
logs = logs.logs

const getLogs = (req, res, next) => {
    console.log(logs)
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
        return res
            .status(200)
            .json(logs.slice(0,limit))
    }
    res.status(200).json(logs)

}

module.exports = {getLogs}