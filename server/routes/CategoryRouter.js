const express = require('express')
const router = express.Router()

const {
    insertCategory,
    updateCategory,
    BlockCategory,
    getCategory,
    getbyidCategory
} = require('../models/models/category ')

router.use((req, res, next) => {
    console.log('Time: ', Date.now()) //Time log
    next()
})



router.post('/insertCategory', async (req, res) => {
    let { name, des } = req.body
    let tokenKey = req.headers['x-access-token']
    try {
        let data = await insertCategory(name, des, tokenKey)
        res.json({
            result: 'ok',
            message: 'Thêm mới danh mục thành công',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể thêm mới danh mục.Lỗi : ${error}`
        })
    }
})


router.put('/updateCategory', async (req, res) => {
    let { id, } = req.body
    let updated = req.body

    let tokenKey = req.headers['x-access-token']
    try {
        let data = await updateCategory(id,updated, tokenKey)
        res.json({
            result: 'ok',
            message: 'Sửa danh mục thành công',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể sửa danh mục.Lỗi : ${error}`
        })
    }
})

router.put('/blockCategory', async (req, res) => {
    let { id, } = req.body

    let tokenKey = req.headers['x-access-token']
    try {
        let data = await BlockCategory(id, tokenKey)
        res.json({
            result: 'ok',
            message: 'Sửa danh mục thành công',
            data
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể sửa danh mục.Lỗi : ${error}`
        })
    }
})

router.get('/getCategory', async (req, res) => {
    try {
        let data = await getCategory()
        res.json({
            result: 'ok',
            message: 'Get danh mục thành công',
            data
        })
    } catch (error) {
        console.log(error)
        res.json({
            result: 'failed',
            message: `Không thể Get danh mục.Lỗi : ${error}`
        })
    }
})

router.get('/getbyidCategory', async (req, res) => {
    let {id}=req.query
    try {
        let data = await getbyidCategory(id)
        res.json({
            result: 'ok',
            message: 'Get danh mục thành công',
            data
        })
    } catch (error) {
        console.log(error)
        res.json({
            result: 'failed',
            message: `Không thể Get danh mục.Lỗi : ${error}`
        })
    }
})
module.exports=router
