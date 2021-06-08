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
const API_GETQUERYNEWS = `${SERVER_NAME}:${SERVER_PORT}/news/queryNews`;
const API_BLOCKNEWS = `${SERVER_NAME}:${SERVER_PORT}/news/blocknews`;
const API_UNBLOCKNEWS = `${SERVER_NAME}:${SERVER_PORT}/news/unblocknews`;
const API_UPLOADCKIMAGE = `${SERVER_NAME}:${SERVER_PORT}/news/uploadckimg`;
const API_GETNEWSBYCATE = `${SERVER_NAME}:${SERVER_PORT}/news/getNewsbyCate`;
const API_GETNEWSUSERBYCATE = `${SERVER_NAME}:${SERVER_PORT}/news/getNewsbyUserCate`;


export const userInsertNews = async (title, content,img,cate, tokenKey) => {
    try {
        let response = await fetch(API_INSERTNEWS, {
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
                img,
                cate
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

export const uploadimg = async (data) => {
    try {
        let response = await fetch(API_UPLOADIMAGE, {
            method: 'POST',
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

export const getNewsbyID = async (id,text,page) => {
    try {
        let response = await fetch(API_GETNEWSBYID + `?id=${id}&text=${text}&page=${page}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        })
        let responseJson = await response.json()
            return responseJson
        
    } catch (error) {
        return error
    }
}


export const getNewsbyCate = async (id,text,page) => {
    try {
        let response = await fetch(API_GETNEWSBYCATE + `?id=${id}&text=${text}&page=${page}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",

            },
        })
        let responseJson = await response.json()
        if (responseJson.result === 'ok') {
            return responseJson
        }
        else {
            return {}
        }
    } catch (error) {
        return error
    }
}


export const getNewsbyUserCate = async (id,idu,text,page) => {
    try {
        let response = await fetch(API_GETNEWSUSERBYCATE + `?id=${id}&idu=${idu}&text=${text}&page=${page}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",

            },
        })
        let responseJson = await response.json()
        if (responseJson.result === 'ok') {
            return responseJson
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
        return {
            result:error,
            message:error
        }
    }
}

export const updateNews = async (id,title,content,img,tokenKey) => {
    try {
        let response = await fetch(API_UPDATENEWS, {
            method: 'PUT',
            body: JSON.stringify({
                id,
                title,
                content,
                img
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
            resule: error,
            message: error
        }
    }
}

export const getQueryNews = async (text,page) => {
    try {
        let response = await fetch(API_GETQUERYNEWS+`?text=${text}&page=${page}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        })
        let responseJson = await response.json()
        if (responseJson.result === 'ok') {
            return responseJson
        }
    } catch (error) {
        return {
            result:error,
            message:error
        }
    }
}

export const blockNews = async (id,tokenKey) => {
    try {
        let response = await fetch(API_BLOCKNEWS, {
            method: 'PUT',
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

export const unblockNews = async (id,tokenKey) => {
    try {
        let response = await fetch(API_UNBLOCKNEWS, {
            method: 'PUT',
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

export default class UploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                this._initRequest();
                this._initListeners( resolve, reject, file );
                this._sendRequest( file );
            } ) );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open( 'post', API_UPLOADCKIMAGE, true );
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject, file ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;

            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            resolve( {
                default: response.url
            } );
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest( file ) {
        // Prepare the form data.
        const data = new FormData();

        data.append( 'fileimg', file );

        // Send the request.
        this.xhr.send( data );
    }
}