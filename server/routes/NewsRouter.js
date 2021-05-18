const express = require('express')
const router = express.Router()
const { 	
    insertNews,
    queryNews,
    queryNewsByDateRange,
    getDetailNews,
    updateNews,
    deleteNews
} = require('../models/models/News')
router.use((req, res, next) => {
    console.log('Time: ', Date.now()) //Time log
    next()
})
router.post('/insertNews', async (req, res) =>{
    let {title, content} = req.body
    //Client phải gửi tokenKey
    let tokenKey = req.headers['x-access-token']
    try {
        let news1 = await insertNews(title, content, tokenKey)
        res.json({
            result: 'ok',
            message: 'Thêm mới BlogPost thành công',
            data: news1
        })
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể thêm mới BlogPost.Lỗi : ${error}`
        })
	}
})

router.get('/queryNews', async (req, res) =>{	
	let {text} = req.query
    try {    	
        let blogPosts = await queryNews(text)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách BlogPost',
            data: blogPosts
        })
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách blogPosts.Lỗi : ${error}`
        })
	}
})

router.get('/queryNewsByDateRange', async (req, res) =>{	
	let {from, to} = req.query	
    try {    	
        let blogPosts = await queryNewsByDateRange(from, to)
	  	res.json({
	  		result: 'ok',
	  		message: 'Query thành công danh sách BlogPost',
	  		data: blogPosts
	  	})	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách blogPosts.Lỗi : ${error}`
        })
	}
})
router.get('/getDetailNews', async (req, res) =>{		
	let {id} = req.query	
    try {    	    
        let blogPost = await getDetailNews(id)
	  	res.json({
	  		result: 'ok',
	  		message: 'Query thành công chi tiết BlogPost',
	  		data: blogPost
	  	})		
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Ko lấy được thông tin chi tiết BlogPost. Error: ${error}`
        })
	}
})

router.put('/updateNews', async (req, res) =>{			
    let {id} = req.body
    let updatedBlogPost = req.body
    let tokenKey = req.headers['x-access-token']
    try {    	
    	let blogPost = await updateNews(id, updatedBlogPost,tokenKey)
        res.json({
            result: 'ok',
            message: 'Update thành công 1 BlogPost',
            data: blogPost
        })	
    } catch(error) {
		res.json({
            result: 'failed',
            message: `Ko update được BlogPost. Error: ${error}`
        })
	}
})
router.delete('/deleteNews', async (req, res) =>{		
	let {id} = req.body	
	let tokenKey = req.headers['x-access-token']	
    try {    	
        await deleteNews(id, tokenKey)
        res.json({
            result: 'ok',
            message: 'Xoá thành công 1 BlogPost',	  		
        })	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Ko xoá được BlogPost. Error: ${error}`
        })
	}
})
module.exports = router