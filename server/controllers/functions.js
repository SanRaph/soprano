const User = require('../models/User');
const Post = require('../models/Post');
const ErrorResponse = require('../utils/errorResponse');
const ErrorRespose = require('../utils/errorResponse');


exports.userDataFunction = async (req, res, next) => {
    
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json({ success: true, data: savedUser, message: 'User Saved!', });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, });
    }
};


exports.userPostFunction = async (req, res, next) => {
    try {
        const post = new Post(req.body);
        const createdPost = await post.save();

        res.status(201).json({ success: true, data: createdPost, message: 'Post Saved!', });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message, });
    }
};


exports.getPostsFunction = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, });
    }
};



exports.getPostFunction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById({ _id: id });
    if( !post ) return next({message: 'no such post'});

    return res.status(200).json( post );
    } catch (error) {
        next(error);
    }

};

exports.deletePostFunction = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Post.deleteOne({ _id: id });

        res.status(404).json({ message: 'Deleted!', })
    } catch (error) {
        next(error);
        
    }

};


exports.updatePostFunction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ _id: id });
        if( !post ) return next({message: 'no such post'});
        const updated = await Post.updateOne({ _id: id });

        res.status(201).json(updated);

    } catch (error) {
        next(error);
    }
};


exports.signInUserFunction = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next( new ErrorRespose( 'Please provide email and password', 400 ) );
    }
    try {
        const user = await User.findOne({ email }).select('+password');

        if( !user ) {
            return next( new ErrorRespose( 'Invalid credentials', 401 ) );
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return next( new ErrorRespose( 'Invalid credentials', 401 ) );
        }

        sendToken(user, 201, res);

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedToken();

    res.status(statusCode).json({ success: true, token });
};

