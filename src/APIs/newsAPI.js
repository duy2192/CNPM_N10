import {
    SERVER_NAME,
    SERVER_PORT,
    // APIResponse
} from './apiParameters'
const API_INSERTNEWS = `${SERVER_NAME}:${SERVER_PORT}/news/insertnews1`;
const API_UPLOADIMAGE = `${SERVER_NAME}:${SERVER_PORT}/news/uploadimg`;
const API_GETNEWSBYID = `${SERVER_NAME}:${SERVER_PORT}/news/getNewsbyId`;
const API_DELETENEWSBYID = `${SERVER_NAME}:${SERVER_PORT}/news/deleteNews`;
const API_GETDETAILBYID = `${SERVER_NAME}:${SERVER_PORT}/news/getDetailNews`;
const API_UPDATENEWS = `${SERVER_NAME}:${SERVER_PORT}/news/updateNews`;

// const API_GETDETAILNEWS = `${SERVER_NAME}:${SERVER_PORT}/news/getDetailNews`;

export const userInsertNews = async (title, content, tokenKey) => {
    try {
        let response = await fetch(API_INSERTNEWS, {
            method: 'POST',
            body: `title=${title}&content=${content}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-access-token": tokenKey
            },
        })
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        return {
            result: error,
            message: error
        }
    }
}

export const uploadimg = async (data) => {
    try {
        let response = await fetch(API_UPLOADIMAGE, {
            method: 'PUT',
            body: data
        })
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        return {
            resule: error,
            message: error
        }
    }
}


export const getNewsbyID = async (id) => {
    try {
        let response = await fetch(API_GETNEWSBYID + `?id=${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",

            },
        })
        let responseJson = await response.json()
        if (responseJson.result === 'ok') {
            return responseJson.data
        }
        else {
            return {}
        }
    } catch (error) {
        return error
    }
}
export const deleteNewsbyId = async (id, tokenKey) => {
    try {
        let response = await fetch(API_DELETENEWSBYID, {
            method: 'DELETE',
            body: `id=${id}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-access-token": tokenKey
            },
        })
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        return {
            resule: error,
            message: error
        }
    }
}

export const getdetailnews = async (id) => {
    try {
        let response = await fetch(API_GETDETAILBYID+`?id=${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        })
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        return {}
    }
}
export const updateNews = async (id,title,content,tokenKey) => {
    try {
        let response = await fetch(API_UPDATENEWS, {
            method: 'PUT',
            body: `id=${id}&title=${title}&content=${content}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-access-token": tokenKey
            },
        })
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        return {
            resule: error,
            message: error
        }
    }
}

API_UPDATENEWS