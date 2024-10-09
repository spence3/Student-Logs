const express = require('express')
var fs = require('fs')
var courses = require('../db.json')
courses = courses.courses

// @desc     get all courses
// @route    GET /api/v1/courses
const getCourses = (req, res, next) => {
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
        return res
            .status(200)
            .json(logs.slice(0,limit))
    }
    res.status(200).json(courses)

}

module.exports = {getCourses}