const mongoose = require('mongoose')

const logSchema = mongoose.Schema(
    {
        courseId:{
            type: String,
            required: [true, 'Course id required']
        },
        uvuId:{
            type:String,
            required: [true, 'UVU id required']
        },
        date:{
            type:Date,
            required: false
        },
        text:{
            type:String,
            required: [true, 'Text is required']
        },
        id:{
            type:String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Log = mongoose.model("Log", logSchema)
module.exports = Log;
