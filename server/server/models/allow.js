const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allowSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        allowAll: {
            type: String,
            enum: ['Yes', 'No'],
            default: 'Yes'
        }
    },
    { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Allow", allowSchema);
