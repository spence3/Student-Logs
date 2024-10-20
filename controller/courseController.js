const Course = require('../models/courses.models.js')

// @desc     get all courses
// @route    GET /api/v1/courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = {getCourses}