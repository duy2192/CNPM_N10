/* eslint-disable no-useless-escape */
const { mongoose } = require('../models')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
const { sendEmailregister, sendEmailresetPassword } = require('../../scripts/sendmail')
const jwt = require('jsonwebtoken')//Mã hoá 1 jsonObject thành token(string)
const secretString = "secret string by da"//tự cho 1 string tuỳ ý

const UserSchema = new Schema({
    username: { type: String },
    email: { type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true },
    password: { type: String, required: true },
    active: { type: Number, default: 0 },
    news: [{ type: mongoose.Schema.Types.ObjectId, ref: 'news' }]

})

const User = mongoose.model('users', UserSchema)

const insertUser = async (name, email) => {
    try {
        const randompasswd = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
        //Mã hoá password trước khi lưu vào DB
        const encryptedPassword = await bcrypt.hash(randompasswd, 10)//saltRounds = 10
        const newUser = new User()
        newUser.username = name
        newUser.email = email
        newUser.password = encryptedPassword
        await newUser.save()
        await sendEmailregister(email, encryptedPassword, randompasswd)
    } catch (error) {
        //Tự tuỳ chỉnh lại Error
        if (error.code === 11000) {
            throw "Tên hoặc email đã tồn tại"
        }
        else
            throw error
    }
}

const getUser = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        let Users = await User.find({
            $or: [
                {
                    active: 1
                },
                {
                    active: 2
                }
            ],
        }).exec()
        return Users
    } catch (error) {
        throw (error)
    }
}

const reqresetPassword = async (email) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let foundUser = await User.findOne({ email }).exec()
        if (!foundUser) {
            throw "Tài khoản không tồn tại"
        }
        if (foundUser.active === 0) {
            throw "Tài khoản chưa kích hoạt!"
        }
        if (foundUser.active === -1) {
            throw "Tài khoản đang bị khóa!"
        }
        await sendEmailresetPassword(email, foundUser.password)
    } catch (error) {
        throw (error)
    }
}

const resetPassword = async (email, pass,oldpass) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let foundUser = await User.findOne({ email }).exec()
        if (!foundUser) {
            throw "Tài khoản không tồn tại"
        }
        if (foundUser.active === -1) {
            throw "Tài khoản đang bị khóa!"
        }
        if (foundUser.active != 0) {
            if(oldpass===foundUser.password){
            const encryptedPassword = await bcrypt.hash(pass, 10)
            foundUser.password = encryptedPassword
            foundUser.save()
            return foundUser}else{
                throw 'Lỗi xác minh!'
            }
        }else{
            throw 'Tài khoản chưa được kích hoạt!'
        }
    } catch (error) {
        throw error
    }
}

const changePassword = async ( pass,newpass,tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let foundUser = await verifyJWT(tokenKey)
        if (!foundUser) {
            throw "Tài khoản không tồn tại"
        }
        if (foundUser.active === -1) {
            throw "Tài khoản đang bị khóa!"
        }
        let encryptedPassword = foundUser.password
        let checkPassword = await bcrypt.compare(pass, encryptedPassword)
        if (checkPassword==true) {
            const encryptedPassword = await bcrypt.hash(newpass, 10)
            foundUser.password = encryptedPassword
            foundUser.save()
        }else{
            throw 'Sai mật khẩu đăng nhập!'
        }
    } catch (error) {
        throw error
    }
}

const activeUser = async (email, secretKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let foundUser = await User.findOne({ email, password: secretKey }).exec()
        if (!foundUser) {
            throw "Không tìm thấy Tài Khoản để kích hoạt"
        }
        if (foundUser.active === 0) {
            foundUser.active = 1
            await foundUser.save()
        } else {
            throw "Tài khoản đã kích hoạt"
        }
    } catch (error) {
        throw error
    }
}
const loginUser = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let foundUser = await User.findOne({ email: email.trim() }).exec()
        if (!foundUser) {
            throw "Tài khoản không tồn tại"
        }
        if (foundUser.active === -1) {
            throw "Tài khoản đang bị khóa!"
        }
        if (foundUser.active === 0) {
            throw "Tài khoản chưa kích hoạt!"
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
    // eslint-disable-next-line no-useless-catch
    try {
        let decodedJson = await jwt.verify(tokenKey, secretString)
        if (Date.now() / 1000 > decodedJson.exp) {
            throw "Token hết hạn, mời bạn login lại"
        }
        let foundUser = await User.findById(decodedJson.id)
        if (!foundUser) {
            throw "Ko tìm thấy Tài khoản với token này"
        }
        return foundUser
    } catch (error) {
        throw error
    }
}
const blockUser = async (email, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let signedInUser = await verifyJWT(tokenKey)
        let user = await User.findOne({ email }).exec()
        if (signedInUser.active == 2 && user.active != 2) {
            user.active = -1
            await user.save()
            return user
        }
        else {
            throw 'Bạn không đủ quyền để thực hiện hành động này!'
        }
    } catch (error) {
        throw error
    }
}
module.exports = {
    User,
    insertUser,
    reqresetPassword,
    resetPassword,
    activeUser,
    loginUser,
    verifyJWT,
    blockUser,
    getUser,
    changePassword
}