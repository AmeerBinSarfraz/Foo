const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');


const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
        timestamps: true

    });

// Applying the uniqueValidator plugin to userSchema.
UsersSchema.plugin(uniqueValidator);

//hashing a password before saving it to the database
UsersSchema.pre('save', function (next) {
    const users = this;
    if (users.password) {
        bcrypt.hash(users.password, 10, function (err, hash) {
            if (err) {
                return next(err);
            }
            users.password = hash;
            next();
        });
    }
});

// Create method to compare password input to password saved in database
UsersSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

module.exports = mongoose.model("User", UsersSchema);