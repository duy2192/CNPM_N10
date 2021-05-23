const nodemailer = require('nodemailer')
const port=3000
const sendEmailregister = async (receiverEmail, secretKey,password) => {	    
    // eslint-disable-next-line no-useless-catch
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
            html: `<div style='text-align: center'>
            <prev>Bạn đã đăng ký tài khoản với:<br>
            Email: ${receiverEmail}<br>
            Password: ${password}
            </prev>
            <br>
            <h1 style='color: green'>Click vào link để kích hoạt tài khoản:</h1>
            <span> http://localhost:${port}/users/activeUser?secretKey=${secretKey}&email=${receiverEmail}</span></div>` 
        }
        let info = await transporter.sendMail(mailOptions)
        console.log('Message sent: %s', info.messageId);
    } catch(error) {
        throw error
    }
}
const sendEmailresetPassword = async (email,secretKey) => {	    
    // eslint-disable-next-line no-useless-catch
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
            html: `<div style="text-align: center"><h1 style="color: blue">Click vào link để đặt lại mật khẩu!</h1><br>
                   http://localhost:8080/#/resetpasswd?email=${email}&secretKey=${secretKey} <div>`
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