const express = require('express')
const router = express.router
var fs = require('fs')
var courses = require('../db.json')
console.log('data', courses.courses)

const getCourses = (req, res, next) => {
    console.log('here')
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
        console.loog('in limit')
        return res
            .status(200)
            .json(posts.slice(0,limit))
    }
    res.status(200).json(courses)

}

module.exports = {getCourses}