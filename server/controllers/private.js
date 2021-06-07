
exports.getPostsFunction = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, });
    }
};