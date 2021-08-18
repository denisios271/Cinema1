require('es6-promise').polyfill();
require('isomorphic-fetch');

import LocalStorage from './LocalStorage';

declare let Echo: any;

/**
 * Basic error interface
 */
export interface iError {
    /** Error string */
    error: string,

    /** Additional data sent from server */
    data?: any,

    /**
     * Response's status.
     * 
     * @interface iValidationError 422 - Validation errors.
     * @interface iError 429 - Requests limit.
     * @interface iServerError 500 - Server errors.
     */
    status: number,
}

/**
 * Server's error. By default it's just 'Server Error' without any things
 */
export interface iServerError extends iError {
    /** It can be not set if APP_DEBUG=false */
    data: {
        /** Will exist only if APP_DEBUG=true */
        exception?: string,

        /** Will exist only if APP_DEBUG=true */
        file?: string,

        /** Will exist only if APP_DEBUG=true */
        line?: number,

        /** Will exist only if APP_DEBUG=true */
        trace?: {
            class?: string,
            file: string,
            function?: string,
            line?: number,
            type?: string,
        }[],

        /** All another available data */
        [key: string]: any,
    }
}

/**
 * Validation errors (Laravel).
 */
export interface iValidationError extends iError {
    /** Laravel sets it if `status` = `422`. Each key is a param name, value - errors with this param */
    data: {
        [key: string]: string[],
    }
}


/**
 * @class to works with fetching data. Also you can save data in localStorage.
 * All methods are `static`, so you can use this library without creating objects.
 * 
 * Fetch methods:
 * @method get(route)
 * @method post(route,params)
 * @method put(route,params)
 * @method delete(route,params)
 * @method xhr(route,params,verb)
 */
export default class Api {
    /**
     * Headers which will be added to each request.
     */
    static headers(): HeadersInit {
        let headers: HeadersInit = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'dataType': 'json',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            'X-Socket-ID': Echo.socketId(),
        };
        const token = LocalStorage.load('access_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    /**
     * Creates request to server via `GET` method.
     * 
     * @param {string} route Route path without any prefixes (like `/api/`). Prefix will be added in this.xhr(...) automatically.
     * 
     * @returns {Promise} Returns similar to `this.xhr(...)`.
     */
    static get<T = {}>(route: string) {
        return this.xhr<T>(route, null, 'GET');
    }

    /**
     * Creates request to server via `PUT` method.
     * 
     * @param {string} route Route path without any prefixes (like `/api/`). Prefix will be added in this.xhr(...) automatically.
     * @param {any} params Any params that will be added in body to request.
     * 
     * @returns {Promise} Returns similar to `this.xhr(...)`.
     */
    static put<T = {}>(route: string, params: any = {}) {
        return this.xhr<T>(route, params, 'PUT');
    }

    /**
     * Creates request to server via `POST` method.
     * 
     * @param {string} route Route path without any prefixes (like `/api/`). Prefix will be added in this.xhr(...) automatically.
     * @param {any} params Any params that will be added in body to request.
     * 
     * @returns {Promise} Returns similar to `this.xhr(...)`.
     */
    static post<T = {}>(route: string, params: any = {}) {
        return this.xhr<T>(route, params, 'POST');
    }

    /**
     * Creates request to server via `DELETE` method.
     * 
     * @param {string} route Route path without any prefixes (like `/api/`). Prefix will be added in this.xhr(...) automatically.
     * @param {any} params Any params that will be added in body to request.
     * 
     * @returns {Promise} Returns similar to `this.xhr(...)`.
     */
    static delete<T = {}>(route: string, params: any = {}) {
        return this.xhr<T>(route, params, 'DELETE');
    }

    /**
     * Creating request.
     * Also will check response and convert into useful form for using.
     * 
     * @see https://learn.javascript.ru/fetch It's the fetch - standart api.
     * @see https://learn.javascript.ru/promise Promise details.
     * 
     * @param {string} route Route path without any prefixes (like `/api/`). Prefix will be added here automatically.
     * @param {any} params Any params that will be added in body to request.
     * @param {string} verb  Sending method: GET, POST, PUT, DELETE.
     * 
     * @returns {Promise} `then(responseJson)` for codes 200 - 299. `catch({ code:integer, message:mixed, })` where code is status response http code & message - server response.
     */
    static xhr<T>(route: string, params: any, verb: string): Promise<T> {
        const host: string = '/api/'; // prefix to the each request
        const url: string = host + route; // final uri (with prefix)

        const options: RequestInit = {
            method: verb,
            credentials: 'include',
            body: params ? JSON.stringify(params) : null,
            headers: Api.headers(),
        }

        return fetch(url, options).then((response: Response) => {
            // workaround for issue-6679 for react - native (mobile)
            setTimeout(() => null, 0);
            
            // let's convert data to the
            let json: Promise<any> = response.json();
            if (response.status >= 200 && response.status < 300) {
                return json;
            }
            return json.then((error: any): iError => {
                switch (response.status) {
                    case 422: // validation error
                        error = {
                            error: error.message,
                            data: error.errors,
                        };
                        break;
                    case 429: // requests limit
                        error = {
                            error: 'Слишком много запросов. Подождите несколько минуточек.',
                        };
                        break;
                    case 500: // server's error
                        // returns `message` except `error`
                        // so we need to replace it
                        error = {
                            error: error.message || error.error || 'Серверная ошибка',
                            data: error,
                        };
                        delete error.data.message;
                        break;
                    case 401: // need auth
                    error = {
                        error: "Необходима авторизация",
                        data: error,
                    };
                    break;
                    case 403: // have no rights
                        error = {
                            error: 'У вас не хватает прав.',
                            data: error,
                        };
                        break;
                    default:
                        error = {
                            error: error.message || error.error || 'Неизвестная ошибка',
                        };
                }
                throw {
                    status: response.status,
                    ...error,
                };
            });
        }).catch((err: iError) => {
            throw err;
        });
    }
}
