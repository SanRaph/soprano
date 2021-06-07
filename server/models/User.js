 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');

 const { Schema } = mongoose;

 const UserSchema = new Schema({ 
     name: { type: String, require: [ true, 'Please provide a name' ] },
     email: { type: String, require: [ true, 'Please provide an email' ], unique: true,sparse: true, match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'] },
     password: { type: String, require: [ true, 'Please provide a password'], minlength: 6, select: false} ,
     image: { type: String, require: [ true, 'Please provide an image' ] },
  }, 
  {timestamps: true});


UserSchema.pre('save', async function( next ) {
  if(!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();

});


const User = mongoose.model('User', UserSchema);

module.exports = User;