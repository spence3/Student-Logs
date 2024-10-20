const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
    {
        id:{
            type: String,
            required: [true, 'Need to type in id']
        },
        display:{
            type:String,
            required: [true, 'Type in the dispaly of the class']
        }
    },
    {
        timestamps: true
    }
)

const Course = mongoose.model("Course", courseSchema)
module.exports = Course;