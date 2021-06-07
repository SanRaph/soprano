const mongoose = require('mongoose');

 const { Schema } = mongoose;

 const PostSchema = new Schema({ 
     title: {type: String, require: [true, 'Please provide a title']},
     description: {type: String, require: [true, 'Please provide a description']},
     image: {type: String, require: [true, 'Please provide an image']}
  }, 
  {timestamps: true});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;