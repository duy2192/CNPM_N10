/* eslint-disable no-mixed-spaces-and-tabs */
const express = require('express')
const router = express.Router()
const path = require('path')
const { PORT, SERVER } = require('../scripts/config')

const {
    insertnewss,
    queryNews,
    getNewsbyCate,
    // queryNewsByDateRange,
    getDetailNews,
    updateNews,
    deleteNews,
    verifyFileExtensions,
    getNewsbyId,
    blockNews,
    unblockNews,
    getNewsbyUserCate
} = require('../models/models/Posts')
router.use((req, res, next) => {
    console.log('Time: ', Date.now()) //Time log
    next()
})



router.post('/insertNews1', async (req, res) => {
    let { title, content,img, cate } = req.body
    let tokenKey = req.headers['x-access-token']
    try {
        let data = await insertnewss(title, content,img,cate, tokenKey)
        res.json({
            result: 'ok',
            message: 'Thêm mới bài viết thành công',
            data
        })
    } catch (error) {
        console.log(error)
        res.json({
            result: 'failed',
            message: `Không thể thêm mới bài viết.Lỗi : ${error}`
        })
    }
})
router.post('/uploadimg', async (req, res) => {
    try {
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
                let filenameup = fileName + '.' + fileExtension
                if (key === keys[keys.length - 1]) {
                    res.json({
                        result: "ok",
                        message: `Upload files successfully`,
                        data: `${SERVER}:${PORT}/img/${filenameup}`
                    })
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

router.post('/uploadckimg', async (req, res) => {
    try {
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
                let filenameup = fileName + '.' + fileExtension

                if (key === keys[keys.length - 1]) {
                    res.json({
                        result: "ok",
                        message: `Upload files successfully`,
                        url: `${SERVER}:${PORT}/img/` + filenameup
                    })
                }
            }
            )
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
        let { id, text, page } = req.query
        let news1 = await getNewsbyId(id, text, page)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách bài viết',
            total: news1.total,
            data: news1.news
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách bài viết.Lỗi : ${error}`
        })
    }
})


router.get('/getNewsbyCate', async (req, res) => {
    try {
        let { id, text, page } = req.query
        let news1 = await getNewsbyCate(id, text, page)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách bài viết',
            total: news1.total,
            data: news1.news
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách bài viết.Lỗi : ${error}`
        })
    }
})


router.get('/getNewsbyUserCate', async (req, res) => {
    try {
        let { id,idu, text, page } = req.query
        let news1 = await getNewsbyUserCate(id,idu, text, page)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách bài viết',
            total: news1.total,
            data: news1.news
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách bài viết.Lỗi : ${error}`
        })
    }
})

router.get('/queryNews', async (req, res) => {
    let { text, page } = req.query
    try {
        let news1 = await queryNews(text, page)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách bài viết',
            total: news1.total,
            data: news1.news,
            data1: news1.news1
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách bài viết.Lỗi : ${error}`
        })
    }
})



// router.get('/queryNewsByDateRange', async (req, res) => {
//     let { from, to } = req.query
//     try {
//         let data = await queryNewsByDateRange(from, to)
//         res.json({
//             result: 'ok',
//             message: 'Query thành công danh sách bài viết',
//             data
//         })
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             message: `Không thể lấy được danh sách bài viết.Lỗi : ${error}`
//         })
//     }
// })
router.get('/getDetailNews', async (req, res) => {
    let { id } = req.query
    try {
        let data = await getDetailNews(id)
        res.json({
            result: 'ok',
            message: 'Query thành công chi tiết bài viết',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Ko lấy được thông tin chi tiết bài viết. Error: ${error}`
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
            message: 'Update thành công bài viết',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Ko update được bài viết. Error: ${error}`
        })
    }
})

router.put('/blocknews', async (req, res) => {
    let { id } = req.body
    let tokenKey = req.headers['x-access-token']
    try {
        let data = await blockNews(id, tokenKey)
        res.json({
            result: 'ok',
            message: 'Chặn thành công bài viết!',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không chặn được bài viết. Error: ${error}`
        })
    }
})

router.put('/unblocknews', async (req, res) => {
    let { id } = req.body
    let tokenKey = req.headers['x-access-token']
    try {
        let data = await unblockNews(id, tokenKey)
        res.json({
            result: 'ok',
            message: 'Mở khóa thành công bài viết!',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không mở khóa được bài viết. Error: ${error}`
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
            message: 'Xoá thành công 1 bài viết',
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Ko xoá được bài viết. Error: ${error}`
        })
    }
})



module.exports = router