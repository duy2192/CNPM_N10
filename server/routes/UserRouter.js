const express=require('express')
const router=express.Router()
const { 
    User,
    resetPassword,
	insertUser, 
    activeUser, 
    loginUser, 
    verifyJWT,
    blockUser
}=require('../models/models/User')
const { sendEmailresetPassword } = require('../scripts/sendmail')


router.use((req,res,next)=>{
    console.log('Time: ',Date.now())
    next()
})

router.post('/registerUser', async (req, res) =>{
	let {name, email, password} = req.body 
    try {
        await insertUser(name, email, password)
	  	res.json({
	  		result: 'ok',
	  		message: 'Đăng ký user thành công, bạn cần mở mail để kích hoạt'
	  	})		
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể đăng ký thêm user. Lỗi : ${error}`
        })
	}
})

router.get('/activeuser', async (req, res) =>{	
	let {email, secretKey} = req.query	
    
	try {
		await activeUser(email, secretKey)
		res.send(`<h1 style="color:MediumSeaGreen;">Kích hoạt User thành công</h1>`)
	} catch(error) {
		res.send(`<h1 style="color:Red;">Không kích hoạt được User, lỗi: ${error}</h1>`)
	}
})

router.get('/resetpassword', async (req, res) =>{	
	try {
        let {email=''}=req.query	
        let foundUser = await User.findOne({email}).exec()
        if(!foundUser) {
            throw "User không tồn tại"
        }
        await sendEmailresetPassword(email,foundUser.password)
		res.json({
            result: 'ok',
            message: `Đã gửi mail lấy lại mật khẩu! Vui lòng kiểm tra email ${email}`
        })
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Lấy lại mật khẩu thất bại. Error ${error}`
        })	} 
})
router.post('/login', async (req, res) =>{	
	let {email, password} = req.body
    try {
		let tokenKey = await loginUser(email, password)
		res.json({
			result: 'ok',
			message: 'Đăng nhập user thành công',
			tokenKey
	  	})
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể đăng nhập user. Lỗi : ${error}`
        })
	}
})
router.get('/jwtTest', async (req, res) => {		
	let tokenKey = req.headers['x-access-token']
    try {
        await verifyJWT(tokenKey)
		res.json({
			result: 'ok',
			message: 'Verify Json Web Token thành công',	  		
	  	})	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Lỗi kiểm tra token : ${error}`
        })
	}
})
router.post('/blockuser', async (req, res) => {		
	let tokenKey = req.headers['x-access-token']
	let {userIds} = req.body
	userIds = userIds.split(',')//Biến tring thành array
	try {		
		await blockUser(userIds, tokenKey)		
		res.json({
			result: 'ok',
			message: 'Block user thành công',	  		
	  	})	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Lỗi Block user.Error: ${error}`
        })
	}

})
module.exports=router
