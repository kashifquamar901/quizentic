import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['teacher','student'],
        default : 'student'
    },
    refreshToken : {
        type : String
    }
},{timestamps : true})

userSchema.pre("save",function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hashSync(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compareSync(password, this.password)
}
userSchema.methods.generateAccessToken = async function(){
    return  jwt.sign(
        {
            _id : this._id,
            name : this.name,
            email : this.email,
            role : this.role,

        },
        process.env.ACCESSTOKEN_SECRATE,
        {
            expiresIn : process.env.ACCESSTOKEN_EXPIRE
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESHTOKEN_SECRATE,
        {
            expiresIn : process.env.REFRESHTOKEN_EXPIRE
        }
    )
}

export const User = mongoose.model("User",userSchema)