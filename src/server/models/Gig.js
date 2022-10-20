import { SchemaTypes } from "mongoose"
import mongoose from mongoose

const {Schema} = mongoose

const GigsSchema = new Schema({
    user:{
        type: SchemaTypes.ObjectId,
        ref: "users"
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    service_provider:[{
        _id:{
            type:SchemaTypes.ObjectId,
            ref: "services"
        }
    }],
    duration:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "open"
    },
    created_at: {
        type: Date,
        default: new Date(),
      },
      updated_at: {
        type: Date,
        default: new Date(),
      },
})

export default mongoose.model("gigs", GigsSchema)