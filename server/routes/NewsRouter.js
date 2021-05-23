/* eslint-disable no-mixed-spaces-and-tabs */
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
    let tokenKey = req.headers['x-access-token']
    try {
        let news1 = await insertNews(title, content, tokenKey)
        res.json({
            result: 'ok',
            message: 'Thêm mới News thành công',
            data: news1
        })
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể thêm mới News.Lỗi : ${error}`
        })
	}
})

router.get('/queryNews', async (req, res) =>{	
	let {text} = req.query
    try {    	
        let news1 = await queryNews(text)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách News',
            data: news1
        })
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách News.Lỗi : ${error}`
        })
	}
})

router.get('/queryNewsByDateRange', async (req, res) =>{	
	let {from, to} = req.query	
    try {    	
        let data = await queryNewsByDateRange(from, to)
	  	res.json({
	  		result: 'ok',
	  		message: 'Query thành công danh sách News',
	  		data
	  	})	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách News.Lỗi : ${error}`
        })
	}
})
router.get('/getDetailNews', async (req, res) =>{		
	let {id} = req.query	
    try {    	    
        let data = await getDetailNews(id)
	  	res.json({
	  		result: 'ok',
	  		message: 'Query thành công chi tiết News',
	  		data
	  	})		
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Ko lấy được thông tin chi tiết News. Error: ${error}`
        })
	}
})

router.put('/updateNews', async (req, res) =>{			
    let {id} = req.body
    let updatedBlogPost = req.body
    let tokenKey = req.headers['x-access-token']
    try {    	
    	let data = await updateNews(id, updatedBlogPost,tokenKey)
        res.json({
            result: 'ok',
            message: 'Update thành công 1 News',
            data
        })	
    } catch(error) {
		res.json({
            result: 'failed',
            message: `Ko update được News. Error: ${error}`
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
            message: 'Xoá thành công 1 News',	  		
        })	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Ko xoá được News. Error: ${error}`
        })
	}
})
module.exports = router