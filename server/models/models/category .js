const { mongoose } = require('../models')
const { Schema } = mongoose
const { verifyJWT } = require('./User')

const CategorySchema  = new Schema({
    name: { type: String, default: '', unique: true },
    description: { type: String, default: '' },
    date: { type: Date, default: Date.now.toUTCString },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
    active: { type: Number, default: 1 },
})
const Category = mongoose.model('Categories', CategorySchema)

const insertCategory = async (name, description, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        await verifyJWT(tokenKey)
        let cate = await Category.create({
            name,
            description,
            date: Date.now(),
            category:1,
            active:1,

        })
        await cate.save()

        return cate
    } catch (error) {
        if (error.code === 11000) {
            throw "Trùng tiêu tên với danh mục khác!"
        }
        else
            throw error    }
}

const updateCategory = async (id,updateCategory, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        await verifyJWT(tokenKey)
        let cate = await Category.findById(id)

        if (!cate) {
            throw `Không tìm thấy Danh mục với Id=${id}`
        }
        cate.name = !updateCategory.name ?
        cate.name : updateCategory.name
        cate.description = !updateCategory.des ?
        cate.description : updateCategory.des
        cate.date = Date.now()

        await cate.save()

        return cate
    } catch (error) {
        if (error.code === 11000) {
            throw "Trùng tiêu tên với danh mục khác!"
        }
        else
            throw error    }
}

const BlockCategory = async (id, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
         await verifyJWT(tokenKey)
         let cate = await Category.findById(id)
         if (!cate) {
            throw `Không tìm thấy Danh mục với Id=${id}`
        }
        cate.active=0
        await cate.save()

        return cate
    } catch (error) {
        if (error.code === 11000) {
            throw "Trùng tiêu tên với danh mục khác!"
        }
        else
            throw error    }
}

const getCategory = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
         let cate = await Category.find({
             active:1
         })
        return cate
    } catch (error) {
            throw error    
        }
}

const getbyidCategory = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
         let cate = await Category.findById(id)
        return cate
    } catch (error) {
            throw error    
        }
}
module.exports={
    Category,
    insertCategory,
    updateCategory,
    BlockCategory,
    getCategory,
    getbyidCategory
}