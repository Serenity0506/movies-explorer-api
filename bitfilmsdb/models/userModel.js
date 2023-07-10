const { Schema } = require('mongoose');
const validator = require('validator');



const userSchema = new Schema({
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
          },
    },
    password: {
        required: true,
        type: String,
        select: false,
      },
});