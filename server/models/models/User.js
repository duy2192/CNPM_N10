const { mongoose } = require('../models')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
const { sendEmailregister, sendEmailresetPassword } = require('../../scripts/sendmail')
const jwt = require('jsonwebtoken')//Mã hoá 1 jsonObject thành token(string)
const secretString = "secret string by da"//tự cho 1 string tuỳ ý

const UserSchema = new Schema({
    username: { type: String, lowercase: true },
    email: { type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true },
    password: { type: String, required: true },
    active: { type: Number, default: 0 },
    news: [{ type: mongoose.Schema.Types.ObjectId, ref: 'news' }]

})

const User = mongoose.model('users', UserSchema)

const insertUser = async (name, email, password) => {
    try {
        //Mã hoá password trước khi lưu vào DB
        const encryptedPassword = await bcrypt.hash(password, 10)//saltRounds = 10
        const newUser = new User()
        newUser.username = name
        newUser.email = email
        newUser.password = encryptedPassword
        await newUser.save()
        await sendEmailregister(email, encryptedPassword)
    } catch (error) {
        //Tự tuỳ chỉnh lại Error
        if (error.code === 11000) {
            throw "Tên hoặc email đã tồn tại"
        }
        else
            throw error
    }
}

const resetPassword = async (email, password) => {
    try {
        let foundUser = await User.findOne({ email }).exec()
        if (!foundUser) {
            throw "User không tồn tại"
        }
        if (foundUser.active === 0) {
            throw "User đang bị khóa!"
        }
        foundUser.password = password
        await foundUser.save()
    } catch (error) {
        throw (error)
    }
}
const activeUser = async (email, secretKey) => {
    try {
        let foundUser = await User.findOne({ email, password: secretKey }).exec()
        if (!foundUser) {
            throw "Không tìm thấy User để kích hoạt"
        }
        if (foundUser.active === 0) {
            foundUser.active = 1
            await foundUser.save()
        } else {
            throw "User đã kích hoạt"
        }
    } catch (error) {
        throw error
    }
}
const loginUser = async (email, password) => {
    try {
        let foundUser = await User.findOne({ email: email.trim() }).exec()
        if (!foundUser) {
            throw "User không tồn tại"
        }
        if (foundUser.active === 0) {
            throw "User đang bị khóa!"
        }
        let encryptedPassword = foundUser.password
        let checkPassword = await bcrypt.compare(password, encryptedPassword)
        if (checkPassword === true) {
            let jsonObject = {
                id: foundUser._id
            }
            let tokenKey = await jwt.sign(jsonObject, secretString, {
                expiresIn: 86400 // Expire trong 24 giờ
            })
            let userObject = await foundUser.toObject()
            userObject.tokenKey = tokenKey
            return userObject
        }
        else {
            throw "Thông tin đăng nhập sai!"
        }
    } catch (error) {
        throw error
    }
}
const verifyJWT = async (tokenKey) => {
    try {
        let decodedJson = await jwt.verify(tokenKey, secretString)
        if (Date.now() / 1000 > decodedJson.exp) {
            throw "Token hết hạn, mời bạn login lại"
        }
        let foundUser = await User.findById(decodedJson.id)
        if (!foundUser) {
            throw "Ko tìm thấy user với token này"
        }
        return foundUser
    } catch (error) {
        throw error
    }
}
const blockUser = async (userIds, tokenKey) => {
    try {
        let signedInUser = await verifyJWT(tokenKey)
        userIds.forEach(async (userId) => {
            let user = await User.findById(userId)
            if (!user) { //Ko thấy user
                return
            }
            user.active = 0
            await user.save()
        }
        )
    } catch (error) {
        throw error
    }
}
module.exports = {
    User,
    insertUser,
    resetPassword,
    activeUser,
    loginUser,
    verifyJWT,
    blockUser
}