const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const crypto = require("crypto")

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    pic: {
        type: String
    }
}, {
    timestamps: true,
     toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});





// bcrypt password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// match password / compare password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password); // returns a boolean
};

// create password reset token
userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000 // 10 minutes
    return resetToken
}




module.exports = mongoose.model('users', userSchema);