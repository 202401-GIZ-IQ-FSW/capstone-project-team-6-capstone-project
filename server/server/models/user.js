const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true, // Removes whitespace from both ends of a string
	},
    username: {
		type: String,
		required: true,
        unique: true, // Ensures username uniqueness
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, // Ensures email uniqueness
		trim: true,
		lowercase: true, // Converts email to lowercase
		validate: [validator.isEmail, 'Please provide a valid email address']
	},
	password: {
		type: String,
		required: true,
	},
    registered_at: {
        type: Date,
        default: Date.now, // Sets the default value to the current date and time
    },
});

// Custom password validator
const passwordValidator = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return passwordRegex.test(password);
};

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    // Hash the password if it's modified or new
    if (!this.isModified('password')) return next();

    // Ensure the password meets the complexity requirements
    if (!passwordValidator(this.password)) {
        return next(new Error('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'));
    }

    // Hash the password
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Export the model
module.exports = mongoose.model("User", userSchema);
