const express = require('express')
var fs = require('fs')
var courses = require('../db.json')
courses = courses.courses
console.log(courses)

const getCourses = (req, res, next) => {
    console.log(courses)
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
        console.loog('in limit')
        return res
            .status(200)
            .json(logs.slice(0,limit))
    }
    res.status(200).json(courses)

}

module.exports = {getCourses}