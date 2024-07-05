import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL


const getToken = () => localStorage.getItem('token')

export const REGISTER_USER = async(data) => {
    const response = await fetch(`${BASE_URL}/user/createUser`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    return await response.json()
}

export const LOGIN_USER = async(data) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    return await response.json()
}

export const AUTOLOGIN = async() => {
    const response = await fetch(`${BASE_URL}/user/autologin`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${getToken()}`
        }
    })
    return await response.json()
}

export const GET_USERS = async() => {
    const response = await fetch(`${BASE_URL}/admin/get`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${getToken()}`
        }
    })
    return await response.json()
}

export const DELETE_USER = async(id) => {
    const response = await fetch(`${BASE_URL}/admin/delete/${id}`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${getToken()}`
        }
    })
    return await response.json()
}

export const REGISTER_USER_BY_ADMIN = async(data) => {
    const response = await fetch(`${BASE_URL}/admin/createUser`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${getToken()}`
        },
        body : JSON.stringify(data)
    })
    return await response.json()
}

export const EDIT_USER_BY_ADMIN = async(data) => {
    const response = await fetch(`${BASE_URL}/admin/update`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${getToken()}`
        },
        body : JSON.stringify(data)
    })
    return await response.json()
}