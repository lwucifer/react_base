import axios from 'axios';
import {URL, ACCESS_TOKEN, AUTHENTICATION_401} from './../constants/config';

export default class BaseRequest {
    async get(url, params = {}) {
        let TOKEN = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : null;
        return await new Promise((resolve, reject) => {
            axios({
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${TOKEN}`},
                method: "GET",
                url: url,
                params: params
            }).then(function (response) {
                if (response.status === 200 || response.status === 201) {
                    resolve(response.data);
                }
            }).catch(function (error) {
                if (error.response.status === 401 || error.response.status === 400) {  // Unauthorized
                    console.log('unauthorized, logging out ...');
                    resolve(AUTHENTICATION_401)
                } else {
                    reject(error.response);
                }
                return;
            });
        });
    }

    async post(url, params = {}) {
        let TOKEN = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : null;
        return await new Promise((resolve, reject) => {
            axios({
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${TOKEN}`},
                method: "POST",
                url: url,
                params: params
            }).then(function (response) {
                if (response.status === 200 || response.status === 201) {
                    resolve(response.data);
                }
            }).catch(function (error) {
                if (error.response.status === 401 || error.response.status === 400) {  // Unauthorized
                    console.log('unauthorized, logging out ...');
                    resolve(AUTHENTICATION_401)
                } else {
                    reject(error.response);
                }
                return;
            });
        });
    }

    async put(url, params = {}) {
        let TOKEN = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : null;
        return await new Promise((resolve, reject) => {
            axios({
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${TOKEN}`},
                method: "PUT",
                url: url,
                params: params
            }).then(function (response) {
                if (response.status === 200 || response.status === 201) {
                    resolve(response.data);
                }
            }).catch(function (error) {
                if (error.response.status === 401 || error.response.status === 400) {  // Unauthorized
                    console.log('unauthorized, logging out ...');
                    resolve(AUTHENTICATION_401)
                } else {
                    reject(error.response);
                }
                return;
            });
        });
    }

    async del(url, params = {}) {
        let TOKEN = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : null;
        return await new Promise((resolve, reject) => {
            axios({
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${TOKEN}`},
                method: "DELETE",
                url: url,
                params: params
            }).then(function (response) {
                if (response.status === 200 || response.status === 201) {
                    resolve(response.data);
                }
            }).catch(function (error) {
                if (error.response.status === 401 || error.response.status === 400) {  // Unauthorized
                    console.log('unauthorized, logging out ...');
                    resolve(AUTHENTICATION_401)
                } else {
                    reject(error.response);
                }
                return;
            });
        });
    }

    async postWithFile(url, params = {}) {
        let TOKEN = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : null;
        return await new Promise((resolve, reject) => {
            axios({
                headers: {'Content-Type': 'application/x-www-form-urlencoded', "Authorization": `Bearer ${TOKEN}`},
                method: "POST",
                url: URL + url,
                params: params
            }).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                if (error.response.status === 401 || error.response.status === 400) {  // Unauthorized
                    console.log('unauthorized, logging out ...');
                    resolve(AUTHENTICATION_401)
                } else {
                    reject(error.response);
                }
                return;
            });
        });
    }

    async _responseHandler(resolve, res) {
        return resolve(res.body.data);
    }

    async _errorHandler(reject, err) {
        window.app.$broadcast('EVENT_COMMON_ERROR', err);
        return reject(err);
    }

}
