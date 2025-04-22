const validatePostId = (req, res, next) => {
    const postId = req.params.postId;
    if (!postId) {
        return res.status(400).json({
            message: "Server could not read post because there are missing data from client"
        });
    }
    next();
}

export default validatePostId;