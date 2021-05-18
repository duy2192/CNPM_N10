const nodemailer = require('nodemailer')
const port=3000
const sendEmailregister = async (receiverEmail, secretKey) => {	    
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "yud002192", 
                pass: "elqszupjdnvplgpn"
            }
        })
        let mailOptions = {
            from: '"Admin" <yud002192@gmail.com>', //Email người gửi
            to: receiverEmail, 
            subject: 'Activate email',         
            html: `<h1>Please click here to activate your account:</h1>
                   http://localhost:${port}/users/activeUser?secretKey=${secretKey}&email=${receiverEmail}` 
        }
        let info = await transporter.sendMail(mailOptions)
        console.log('Message sent: %s', info.messageId);
    } catch(error) {
        throw error
    }
}
const sendEmailresetPassword = async (email,secretKey) => {	    
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "yud002192", 
                pass: "elqszupjdnvplgpn"
            }
        })
        let mailOptions = {
            from: '"Admin" <yud002192@gmail.com>', //Email người gửi
            to: email, 
            subject: 'Reset password',         
            html: `<h1>Please click here to activate your account:</h1>
                   http://localhost:${port}/users/activateUser?email=${email}&secretKey=${secretKey}` 
        }
        let info = await transporter.sendMail(mailOptions)
        console.log('Message sent: %s', info.messageId);
    } catch(error) {
        throw error
    }
}
module.exports = {
    sendEmailregister,
    sendEmailresetPassword
}