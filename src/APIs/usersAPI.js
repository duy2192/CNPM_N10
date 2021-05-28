import {
    SERVER_NAME,
    SERVER_PORT,
    // APIResponse
} from './apiParameters'
const API_LOGIN = `${SERVER_NAME}:${SERVER_PORT}/users/login`;
const API_GETUSER = `${SERVER_NAME}:${SERVER_PORT}/users/getuser`;
const API_REGISTERUSER = `${SERVER_NAME}:${SERVER_PORT}/users/registeruser`;
const API_BLOCKUSER = `${SERVER_NAME}:${SERVER_PORT}/users/blockuser`;
const API_REQRESETPASSWD = `${SERVER_NAME}:${SERVER_PORT}/users/reqresetpasswd`;
const API_RESETPASSWD = `${SERVER_NAME}:${SERVER_PORT}/users/resetpasswd`;
const API_CHANGEPASSWD = `${SERVER_NAME}:${SERVER_PORT}/users/changepasswd`;
const API_UNBLOCKUSER = `${SERVER_NAME}:${SERVER_PORT}/users/unblockuser`;

export const registerUser = async (name, email) => {
    try {
        let response = await fetch(API_REGISTERUSER, {
            method: 'POST',
            body: `email=${email}&name=${name}`,
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

export const userLogin = async (email, password) => {
    try {
        let response = await fetch(API_LOGIN, {
            method: 'POST',
            body: `email=${email}&password=${password}`,
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
        return {}
    }
}

export const getallUser = async () => {
    try {
        let response = await fetch(API_GETUSER)
        let responseJson = await response.json()
        if (responseJson.result === 'ok') {
            return responseJson.data
        }
        else {
            return {}
        }
    } catch (error) {
        return {}
    }
}

export const blockUser = async (email,token) => {
    try {
        let response = await fetch(API_BLOCKUSER, {
            method: 'PUT',
            body: `email=${email}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-access-token":token
            },
        })
        let responseJson = await response.json()
        return responseJson

    } catch (error) {
        return {result: error,
                message:error}
    }
}

export const unblockUser = async (email,token) => {
    try {
        let response = await fetch(API_UNBLOCKUSER, {
            method: 'PUT',
            body: `email=${email}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-access-token":token
            },
        })
        let responseJson = await response.json()
        return responseJson

    } catch (error) {
        return {result: error,
                message:error
        }
    }
}

export const reqresetpasswd = async (email) => {
    try {
        let response = await fetch(API_REQRESETPASSWD, {
            method: 'POST',
            body: `email=${email}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        })
        let responseJson = await response.json()
        return responseJson

    } catch (error) {
        return {result: error}
    }
}

export const resetpasswd = async (email,pass,oldpass) => {
    try {
        let response = await fetch(API_RESETPASSWD, {
            method: 'PUT',
            body: `email=${email}&password=${pass}&oldpass=${oldpass}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        })
        let responseJson = await response.json()
        return responseJson

    } catch (error) {
        return {result: error}
    }
}

export const changepasswd = async (pass,newpass,tokenKey) => {
    try {
        let response = await fetch(API_CHANGEPASSWD, {
            method: 'PUT',
            body: `password=${pass}&newpassword=${newpass}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-access-token":tokenKey

            },
        })
        let responseJson = await response.json()
        return responseJson

    } catch (error) {
        return {result: error,
        message: error}
    }
}