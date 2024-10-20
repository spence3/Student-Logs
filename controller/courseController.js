const Course = require('../models/courses.models.js')

var fs = require('fs')
var courses = require('../db.json')
courses = courses.courses

// @desc     get all courses
// @route    GET /api/v1/courses
// const getCourses = (req, res, next) => {
//     const limit = parseInt(req.query.limit)
//     if(!isNaN(limit) && limit > 0){
//         return res
//             .status(200)
//             .json(logs.slice(0,limit))
//     }
//     res.status(200).json(courses)
// }



// get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = {getCourses}