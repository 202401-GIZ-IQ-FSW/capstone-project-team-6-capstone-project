const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');
const moment = require('moment');

// Phone number validator
const phoneNumberValidator = (phone) => {
    const phoneRegex = /^(\+?\(?(\d{1,4})\)?[- ]?)?(\(?\d{3,4}\)?[- ]?)?(\d{3}[- ]?)?(\d{4})$/;
    return phoneRegex.test(phone);
};

// Calculate age from date of birth
const calculateAge = (dateOfBirth) => {
    return moment().diff(moment(dateOfBirth, 'MM/DD/YYYY'), 'years');
};

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true, // Removes whitespace from both ends of a string
        },
        username: {
            type: String,
            required: true,
            unique: true, // Ensures username uniqueness
            trim: true,
            maxlength: 30,
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
        phone: {
            type: String,
            validate: [phoneNumberValidator, 'Please provide a valid phone number'],
            trim: true,
        },
        gender:{
            type: String,
            enum: ['Male', 'Female', 'Prefer not to disclose'],
            default: 'Prefer not to disclose'
        },
        country: {
            type: String,
            maxlength: 80,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            validate: {
                validator: (date) => moment(date, 'MM/DD/YYYY', true).isValid(),
                message: 'Date of birth must be in the format MM/DD/YYYY'
            },
            get: (date) => moment(date).format('MM/DD/YYYY'),
            set: (date) => moment(date, 'MM/DD/YYYY').toDate()
        },
        age: {
            type: Number,
        },
        role: {
            type: String,
            enum: ['superAdmin', 'admin', 'supportAgent', 'customer'],
            default: 'customer'
        },
        status: {
            type: String,
            enum: ['Active', 'Pending', 'Blocked'],
            default: 'Pending'
        },
    },
    { timestamps: true }
);

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

// Pre-findByIdAndUpdate middleware to hash the password before updating
userSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (update.password) {
        // Ensure the password meets the complexity requirements
        if (!passwordValidator(update.password)) {
            return next(new Error('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'));
        }

        // Hash the password
        try {
            const hashedPassword = await bcrypt.hash(update.password, 10);
            update.password = hashedPassword;
            this.setUpdate(update); // Make sure to set the update object with the hashed password
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Pre-save middleware to calculate age before saving
userSchema.pre('save', function(next) {
    if (this.isModified('dateOfBirth')) {
        this.age = calculateAge(this.dateOfBirth);
    }
    next();
});

// Pre-findByIdAndUpdate middleware to calculate age before updating
userSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.dateOfBirth) {
        update.age = calculateAge(update.dateOfBirth);
        this.setUpdate(update); // Make sure to set the update object with the new age
    }
    next();
});

// Export the model
module.exports = mongoose.model("User", userSchema);
