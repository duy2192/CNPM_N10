/* eslint-disable no-mixed-spaces-and-tabs */
const express=require('express')
const router=express.Router()
const { 
	reqresetPassword,
    resetPassword,
	insertUser, 
    activeUser, 
    loginUser, 
    verifyJWT,
    blockUser,
	getUser,
	changePassword,
	unblockUser
}=require('../models/models/User')

router.use((req,res,next)=>{
    console.log('Time: ',Date.now())
    next()
})

router.get('/getuser', async (req, res) =>{	    
	try {
		let data =await getUser()
		res.json({
			result: 'ok',
			message: 'API danh sách User',
			data
		})
	} catch(error) {
		res.json({
			result: 'failed',
			message: `Lỗi API danh sách User. Error: ${error}`
		})
	}
})

router.post('/registerUser', async (req, res) =>{
	let {name, email} = req.body 
    try {
        await insertUser(name, email)
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
		res.send(`<div style='text-align: center'><h1 style="color:MediumSeaGreen;">Kích hoạt User thành công</h1><br>
		<a href='http://localhost:8080/#/admin' style='color:blue''>Click_Here!</a>
</div>
		`)
	} catch(error) {
		res.send(`<h1 style="color:Red;">Không kích hoạt được User, lỗi: ${error}</h1>`)
	}
})

router.post('/login', async (req, res) =>{	
	let {email, password} = req.body
    try {
		let data = await loginUser(email, password)
		res.json({
			result: 'ok',
			message: 'Đăng nhập user thành công',
			data
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

router.put('/blockuser', async (req, res) => {		
	let tokenKey = req.headers['x-access-token']
	let {email} = req.body
	try {		
		const data = await blockUser(email, tokenKey)		
		res.json({
			result: 'ok',
			message: 'Block user thành công',
			data	  		
	  	})	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Lỗi Block user.Error: ${error}`
        })
	}

})

router.put('/unblockuser', async (req, res) => {		
	let tokenKey = req.headers['x-access-token']
	let {email} = req.body
	try {		
		const data = await unblockUser(email, tokenKey)		
		res.json({
			result: 'ok',
			message: 'UnBlock user thành công',
			data	  		
	  	})	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Lỗi UnBlock user.Error: ${error}`
        })
	}

})

router.post('/reqresetpasswd',async(req,res)=>{
	let {email}=req.body
	try {
		await reqresetPassword(email)
		res.json({
			result: 'ok',
			message: 'Gửi yêu cầu thành công',
	  	})	
	} catch (error) {
		res.json({
            result: 'failed',
            message: `Gửi yêu cầu thất bại! ${error}`
        })	}
})

router.put('/resetpasswd',async(req,res)=>{
	let {email,password,oldpass}=req.body
	try {
		let data= await resetPassword(email,password,oldpass)
		res.json({
			result: 'ok',
			message: 'Đổi mật khẩu thành công!',
			data
	  	})	
	} catch (error) {
		res.json({
            result: 'failed',
            message: `Đổi mật khẩu thất bại! ${error}`
        })	}
})

router.put('/changepasswd',async(req,res)=>{
	let {password,newpassword}=req.body
	let tokenKey = req.headers['x-access-token']
	try {
		let data= await changePassword(password,newpassword,tokenKey)
		res.json({
			result: 'ok',
			message: 'Đổi mật khẩu thành công!',
			data
	  	})	
	} catch (error) {
		res.json({
            result: 'failed',
            message: `Đổi mật khẩu thất bại! ${error}`
        })	}
})
module.exports=router
