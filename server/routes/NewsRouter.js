/* eslint-disable no-mixed-spaces-and-tabs */
const express = require('express')
const router = express.Router()
const path = require('path')

const {
    insertnewss,
    queryNews,
    queryNewsByDateRange,
    getDetailNews,
    updateNews,
    deleteNews,
    getNews,
    verifyFileExtensions,
    updateImg,
    getNewsbyId
} = require('../models/models/News')
router.use((req, res, next) => {
    console.log('Time: ', Date.now()) //Time log
    next()
})



router.post('/insertNews1', async (req, res) => {
    let { title, content } = req.body
    let tokenKey = req.headers['x-access-token']
    try {
        let data = await insertnewss(title, content, tokenKey)
        res.json({
            result: 'ok',
            message: 'Thêm mới News thành công',
            data
        })
    } catch (error) {
        console.log(error)
        res.json({
            result: 'failed',
            message: `Không thể thêm mới News.Lỗi : ${error}`
        })
    }
})
router.put('/uploadimg', async (req, res) => {
    try {
        let {id} = req.body
        if (req.files) {
            const keys = Object.keys(req.files)
            if (keys.length === 0) {
                res.json({
                    result: "failed",
                    message: "Cannot find files to upload"
                })
                return
            }
            //Chỉ cho phép upload một số "extensions" nào đó ?      
            const verifyExtensions = await verifyFileExtensions(req.files)
            if (verifyExtensions === false) {
                throw `You can only upload png, jpg, gif, jpeg files, or fileSize > 0.5MB !`
            }
            keys.forEach(async (key) => {
                var fileName = `${Math.random().toString(36)}`
                const fileObject = await req.files[key]
                var fileExtension = fileObject.name.split('.').pop()
                const destination = `${path.join(__dirname, '../uploads/img')}/${fileName}.${fileExtension}`
                let error = await fileObject.mv(destination) //mv = move 
                if (error) {
                    throw error
                }
                let filenameup= fileName+'.'+fileExtension
                let uptodb=await updateImg(id, filenameup)
                if (uptodb == true) {
                    if (key === keys[keys.length - 1]) {
                        res.json({
                            result: "ok",
                            message: `Upload files successfully`,
                            data: fileName
                        })
                    }
                }else{
                    return
                }
            })
        }
        else {
            return
        }
    } catch (error) {
        res.json({
            result: "failed",
            message: `Cannot upload files. Error: ${error}`
        })
    }
})

router.get('/getNewsbyId', async (req, res) => {
    try {
        let {id}=req.query
        let news1 = await getNewsbyId(id)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách News',
            data: news1
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách News.Lỗi : ${error}`
        })
    }
})

router.get('/getallNews', async (req, res) => {
    try {
        let news1 = await getNews()
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách News',
            data: news1
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách News.Lỗi : ${error}`
        })
    }
})

router.get('/queryNews', async (req, res) => {
    let { text } = req.query
    try {
        let news1 = await queryNews(text)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách News',
            data: news1
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách News.Lỗi : ${error}`
        })
    }
})

router.get('/queryNewsByDateRange', async (req, res) => {
    let { from, to } = req.query
    try {
        let data = await queryNewsByDateRange(from, to)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách News',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách News.Lỗi : ${error}`
        })
    }
})
router.get('/getDetailNews', async (req, res) => {
    let { id } = req.query
    try {
        let data = await getDetailNews(id)
        res.json({
            result: 'ok',
            message: 'Query thành công chi tiết News',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Ko lấy được thông tin chi tiết News. Error: ${error}`
        })
    }
})

router.put('/updateNews', async (req, res) => {
    let { id } = req.body
    let updatedBlogPost = req.body
    let tokenKey = req.headers['x-access-token']
    try {
        let data = await updateNews(id, updatedBlogPost, tokenKey)
        res.json({
            result: 'ok',
            message: 'Update thành công 1 News',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Ko update được News. Error: ${error}`
        })
    }
})
router.delete('/deleteNews', async (req, res) => {
    let { id } = req.body
    let tokenKey = req.headers['x-access-token']
    try {
        await deleteNews(id, tokenKey)
        res.json({
            result: 'ok',
            message: 'Xoá thành công 1 News',
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Ko xoá được News. Error: ${error}`
        })
    }
})



module.exports = router