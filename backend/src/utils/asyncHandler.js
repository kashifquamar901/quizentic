const asyncHandler = (fn) => async (res, req, next) => {
try {
    await fn(res, req, next)
} catch (error) {
    const statusCode = error.statusCode
    console.log(error);
    res
    .status(statusCode)
    .json({
        error,
        message : error.message
    })
    
}
}

export {asyncHandler}