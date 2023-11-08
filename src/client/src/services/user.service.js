import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const userService = {
    createNewUser,
    loginUser,
    getUser,
    updateUser,
}

async function createNewUser(new_user_data) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/user/new`, new_user_data)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.log('Error Creating New User.')
                reject(error)
            })
    })
}

async function loginUser(login_data) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/user/login`, login_data)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

async function getUser(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/user/getUser`, userID)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

async function updateUser(userID, updatedUserObj) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/user/${userID}`, updatedUserObj)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.log('error updating User with id:', userID, 'and new User:', updatedUserObj, '- error : ', error)
                reject(error)
            })
    })
}