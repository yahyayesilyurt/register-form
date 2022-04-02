const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    isim: {
        type: String,
        required: true,
        trim: true
    },
    kullanıcı_adı: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    şifre: {
        type: String,
        required: true,
        trim: true
    }

},{collection:"kullanicilar", timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;