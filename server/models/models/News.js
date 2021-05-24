const {mongoose} = require('../models')
const {Schema} = mongoose
const {verifyJWT} = require('./User')
const NewsSchema = new Schema({
    title: {type: String, default: '', unique: true},
    content: {type: String, default: ''},
    image:{type:String},
    date: {type: Date, default: Date.now},
    active:{type: Number,default:1},
    author:{type: mongoose.Schema.Types.ObjectId, ref: "users"},

})

const News = mongoose.model('news', NewsSchema)

const insertNews = async (title, content, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let signedInUser = await verifyJWT(tokenKey)
        let news1 = await News.create({
            title, content,
            date: Date.now(),
            author: signedInUser
        })
        await news1.save()
        await signedInUser.news.push(news1)
        await signedInUser.save()
        return news1
    } catch(error) {        
        throw error
    }
}

const getNews = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        let news =  await News.find({active:1})
        return news
    } catch(error) {        
        throw error
    }
}

const queryNews = async (text) => {
    // eslint-disable-next-line no-useless-catch
    try {        
        let news = await News.find({
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
        return news
    } catch(error) {        
        throw error
    }
}
//Lấy các bài post trong khoảng ngày A => ngày B
//VD1: http://127.0.0.1:3000/blogposts/queryBlogPostsByDateRange?from=01-11-2018&to=05-11-2018
const queryNewsByDateRange = async (from, to) => {
    //format: dd-mm-yyyy    
    let fromDate = new Date(parseInt(from.split('-')[2]), 
                            parseInt(from.split('-')[1])-1, 
                            parseInt(from.split('-')[0]))
    let toDate = new Date(parseInt(to.split('-')[2]), 
                            parseInt(to.split('-')[1])-1, 
                            parseInt(to.split('-')[0]))            
    // eslint-disable-next-line no-useless-catch
    try {                
        let news = await News.find({
            date: {$gte: fromDate, $lte: toDate}, 
            //$gte="greater than or equal", $lte="less than or equal"           
        })        
        return news
    } catch(error) {        
        throw error
    }
}
//Lấy nội dung chi tiết 1 BlogPost => ko cần token 
const getDetailNews = async (newsid) => {
    // eslint-disable-next-line no-useless-catch
    try {        
        let news = await News.findById(newsid)
        if (!news) {
            throw `Không tìm thấy News với Id=${newsid}`
        }
        return news
    } catch(error) {        
        throw error
    }
}
//Cập nhật 1 blogpost => yêu cầu token
//Chỉ có tác giả mới cập nhật được BlogPost của mình
const updateNews = async (newsid,updatedNews,tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {        
        let signedInUser = await verifyJWT(tokenKey)
        let news = await News.findById(newsid)
        if (!news) {
            throw `Không tìm thấy blogpost với Id=${newsid}`
        }
        if (signedInUser.id !== news.author.toString()) {
            throw "Ko update được vì bạn ko phải là tác giả bài viết"
        }
        news.title = !updatedNews.title ?
                            news.title : updatedNews.title
        news.content = !updatedNews.content ? 
                            news.content : updatedNews.content
        news.date = Date.now()
        await news.save()        
        return news
    } catch(error) {        
        throw error
    }
}
//Xoá 1 bản ghi blogPost:
//1. Xoá bản ghi trong bảng BlogPosts
//2. Cập nhật trường tham chiếu "blogPosts" trong bảng Users
//=> mảng blogPosts bớt đi 1 phần tử
const deleteNews = async (newsId, tokenKey) => {
    // eslint-disable-next-line no-useless-catch
    try {        
        let signedInUser = await verifyJWT(tokenKey)
        let news = await News.findById(newsId)
        if (!news) {
            throw `Không tìm thấy blogpost với Id=${newsId}`
        }
        if (signedInUser.id !== news.author.toString()) {
            throw "Không xoá được vì bạn ko phải là tác giả bài viết"
        }
        await News.deleteOne({_id: newsId})
        signedInUser.news = await signedInUser.news
                                 .filter(eachBlogPost => {
            return newsId._id.toString() !== eachBlogPost._id.toString()
        })
        await signedInUser.save()
    } catch(error) {        
        throw error
    }
}

module.exports = {
    News,
    insertNews,
    queryNews,
    queryNewsByDateRange,
    getDetailNews,
    updateNews,
    deleteNews,
    getNews
}