import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessTokenAndRefreshToken =async (userId) => {
    const user = await User.findById(userId)
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken

    await user.save()

    return {accessToken, refreshToken}
}
export const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body


    if (!name || !email || !password || !role) {
        throw new ApiError(400, "All fields are required")
    }

    const exitingUser = await User.findOne({ email })
    if (exitingUser) {
        throw new ApiError(400, "User already exits with this email")
    }
    
    const user =  new User({
        name,
        email,
        password,
        role
    })
    await user.save()
    
    return res
        .status(200)
        .json(
            new ApiResponse(201, user, "User register succesfully")
        )
})

export const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new ApiError("All fields are required for login")

    }

    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(404, "User with this email not exits")
    }
    
    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect) throw new ApiError(400,"Worng Password Access Denied")
    
    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-passwird -refreshToken")

    const option = {
        httpOnly : true,
        secure : true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(
        new ApiResponse(200,loggedInUser,"User logged in succesfull")
    )
})

export const logOut = asyncHandler(async(req, res) => {
    const {userId} = req.user

    
})