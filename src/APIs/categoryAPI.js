import {
    SERVER_NAME,
    SERVER_PORT,
    // APIResponse
} from './apiParameters'

const API_INSERTCATEGORY = `${SERVER_NAME}:${SERVER_PORT}/category/insertCategory`;
const API_UPDATECATEGORY = `${SERVER_NAME}:${SERVER_PORT}/category/updateCategory`;
const API_BLOCKCATEGORY = `${SERVER_NAME}:${SERVER_PORT}/category/blockCategory`;
const API_GETCATEGORY = `${SERVER_NAME}:${SERVER_PORT}/category/getCategory`;
const API_GETBYIDCATEGORY = `${SERVER_NAME}:${SERVER_PORT}/category/getbyidCategory`;




export const InsertCategory = async (name, des, tokenKey) => {
    try {
        let response = await fetch(API_INSERTCATEGORY, {
            method: 'POST',
            body: JSON.stringify({
                name,
                des,
            }),
            headers: {
                "Content-type": "application/json",
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


export const UpdateCategory = async (id, name, des, tokenKey) => {
    try {
        let response = await fetch(API_UPDATECATEGORY, {
            method: 'PUT',
            body: JSON.stringify({
                id,
                name,
                des,
            }),
            headers: {
                "Content-type": "application/json",
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

export const BlockCategory = async (id,tokenKey) => {
    try {
        let response = await fetch(API_BLOCKCATEGORY, {
            method: 'PUT',
            body: JSON.stringify({
                id
            }),
            headers: {
                "Content-type": "application/json",
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

export const getCategory = async () => {
    try {
        let response = await fetch(API_GETCATEGORY, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
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
export const getbyidCategory = async (id) => {
    try {
        let response = await fetch(API_GETBYIDCATEGORY+`?id=${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
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