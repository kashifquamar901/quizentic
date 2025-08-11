import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

const varifyJWT = (role) => asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken

    if (!token) {
        throw new ApiError(401,"Token not provided")
    }

    const decodedToken = await jwt.verify(token,process.env.ACCESSTOKEN_SECRATE)

    if (!decodedToken) {
        throw new ApiError(401,"Worng token")
    }
    if (decodedToken.role !== role) {
        throw new ApiError(403, "Access denied")
    }

    const user = await User.findById(decodedToken._id)

    if (!user) {
        throw new ApiError(401,"Token is expired")
    }

    req.user = user

    next()
})

export {varifyJWT}