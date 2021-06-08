const { mongoose } = require('../models')
const { Schema } = mongoose
const { verifyJWT } = require('./User')
const {SERVER,PORT}=require('../../scripts/config')
const {Category} = require('./category ')
const NewsSchema = new Schema({
    title: { type: String, default: '', unique: true },
    content: { type: String, default: '' },
    image: { type: String, default: `${SERVER}:${PORT}/img/bg-24.jpg` },
    date: { type: Date, default: Date.now.toUTCString },
    active: { type: Number, default: 1 },
    category:{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
})

const Newss = mongoose.model('Posts', NewsSchema)

const insertnewss = async (title, content,img,cate, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let signedInUser = await verifyJWT(tokenKey)
        let category= await Category.findById(cate)
        let new1 = await Newss.create({
            title: title,
            content: content,
            image:img,
            date: Date.now(),
            category:cate,
            author: signedInUser
        })
        await new1.save()
        await category.posts.push(new1._id)
        await category.save()

        await signedInUser.news.push(new1._id)
        await signedInUser.save()
        return new1
    } catch (error) {
        if (error.code === 11000) {
            throw "Trùng tiêu đề với bài viết khác!"
        }
        else
            throw error    }
}

const getNewsbyId = async (id, text, page = 0) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let countnews = await Newss.find({
            author: id, $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        })
        let total = countnews.length
        let news = await Newss.find({
            author: id, $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        }, {}, {
            sort: {
                date: -1
            }
        }).skip(page * 6).limit(6).populate('author').populate({path:'category'})
        return {
            total:total / 6,
            news: news
        }
    } catch (error) {
        throw error
    }
}

const getNewsbyCate = async (id, text, page = 0) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let countnews = await Newss.find({
            category: id, $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        })
        let total = countnews.length
        let news = await Newss.find({
            category: id, $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        }, {}, {
            sort: {
                date: -1
            }
        }).skip(page * 6).limit(6).populate('author').populate({path:'category'}).exec()
        return {
            total:total / 6,
            news: news
        }
    } catch (error) {
        throw error
    }
}

const getNewsbyUserCate = async (id,idu, text, page = 0) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let countnews = await Newss.find({
            author:idu,
            category: id, 
            $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        })
        let total = countnews.length
        let news = await Newss.find({
            author:idu,
            category: id, $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        }, {}, {
            sort: {
                date: -1
            }
        }).skip(page * 6).limit(6).populate('author').populate({path:'category'}).exec()
        return {
            total:total / 6,
            news: news
        }
    } catch (error) {
        throw error
    }
}

const queryNews = async (text, page = 0) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let countnews = await Newss.find({
            active: 1,
            $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        }).populate({
            path: 'author',
            match: { active: 1 }
        }).populate({path:'category'}).exec()
        let total = countnews.length
        let news = await Newss.find({
            active: 1,
            $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        }, {}, {
            sort: {
                date: -1
            }
        }).skip(page * 6).limit(6).populate({
            path: 'author',
            match: {active: {$gte : 1}}
        }     
        ).populate({path:'category'}).exec()
        let news1 = await Newss.find({
            active: {$gte:0},
            $or: [
                {
                    title: new RegExp(text, "i")
                    //i => ko phân biệt hoa/thường
                },
                {
                    content: new RegExp(text, "i")
                }
            ],
        }, {}, {
            sort: {
                date: -1
            }
        }).skip(page * 6).limit(6).populate({
            path: 'author',
            match: {active: {$gte : 1}}
        }     
        ).populate({path:'category'}).exec()
    return {
        total:total / 6,
        news,
        news1
    }
} catch (error) {
    throw error
}
}

// const queryNewsByDateRange = async (from, to) => {
//     //format: dd-mm-yyyy    
//     let fromDate = new Date(parseInt(from.split('-')[2]),
//         parseInt(from.split('-')[1]) - 1,
//         parseInt(from.split('-')[0]))
//     let toDate = new Date(parseInt(to.split('-')[2]),
//         parseInt(to.split('-')[1]) - 1,
//         parseInt(to.split('-')[0]))
//     // eslint-disable-next-line no-useless-catch
//     try {
//         let news = await Newss.find({
//             date: { $gte: fromDate, $lte: toDate },
//             //$gte="greater than or equal", $lte="less than or equal"           
//         })
//         return news
//     } catch (error) {
//         throw error
//     }
// }

//Lấy nội dung chi tiết 

const getDetailNews = async (newsid) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let news = await Newss.findById(newsid)
        if (!news) {
            throw `Không tìm thấy News với Id=${newsid}`
        }
        return news
    } catch (error) {
        throw error
    }
}

const updateNews = async (newsid, updatedNews, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let signedInUser = await verifyJWT(tokenKey)
        let news = await Newss.findById(newsid)
        if (!news) {
            throw `Không tìm thấy news với Id=${newsid}`
        }
        if (signedInUser.id !== news.author.toString()) {
            throw "Ko update được vì bạn ko phải là tác giả bài viết"
        }
        news.title = !updatedNews.title ?
            news.title : updatedNews.title
        news.content = !updatedNews.content ?
            news.content : updatedNews.content
            news.image = !updatedNews.img ?
            news.image : updatedNews.img
        news.date = Date.now()
        await news.save()
        return news
    } catch (error) {
        if (error.code === 11000) {
            throw "Trùng tiêu đề với bài viết khác!"
        }
        else
            throw error    }
}

const blockNews = async (newsid, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let signedInUser = await verifyJWT(tokenKey)
        if (signedInUser.active != '2') {
            throw "Bạn không có quyền chặn bài viết này!"
        }
        let news = await Newss.findById(newsid)
        if (!news) {
            throw `Không tìm thấy news với Id=${newsid}`
        }
        news.active = 0
        await news.save()
        return news
    } catch (error) {
        throw error
    }
}

const unblockNews = async (newsid, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let signedInUser = await verifyJWT(tokenKey)
        if (signedInUser.active != '2') {
            throw "Bạn không có quyền chặn bài viết này!"
        }
        let news = await Newss.findById(newsid)
        if (!news) {
            throw `Không tìm thấy news với Id=${newsid}`
        }
        news.active = 1
        await news.save()
        return news
    } catch (error) {
        throw error
    }
}

const deleteNews = async (newsId, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let signedInUser = await verifyJWT(tokenKey)
        
        let news = await Newss.findById(newsId)
        let cate = await Category.findById(news.category)
        if (!news) {
            throw `Không tìm thấy news với Id=${newsId}`
        }
        if (signedInUser.id !== news.author.toString()) {
            throw "Không xoá được vì bạn ko phải là tác giả bài viết"
        }
        await Newss.deleteOne({ _id: newsId })
        signedInUser.news = await signedInUser.news
            .filter(eachNews => {
                return news._id.toString() !== eachNews._id.toString()
            })

            cate.posts= await cate.posts
            .filter(eachpost => {
                return news._id.toString() !== eachpost._id.toString()
            })
            await cate.save()
        await signedInUser.save()
    } catch (error) {
        throw error
    }
}
const verifyFileExtensions = async (files) => {
    const keys = await Object.keys(files)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const fileObject = files[key]
        const fileExtension = fileObject.name.split('.').pop()
        let fileExceed = fileObject.truncated === true
        if (["png", "jpg", "jpeg"].indexOf(fileExtension.toLowerCase()) < 0
            || fileExceed) {
            return false
        }
    }
    return true
}
module.exports = {
    Newss,
    insertnewss,
    queryNews,
    // queryNewsByDateRange,
    getDetailNews,
    updateNews,
    deleteNews,
    verifyFileExtensions,
    getNewsbyId,
    blockNews,
    unblockNews,
    getNewsbyCate,
    getNewsbyUserCate
}