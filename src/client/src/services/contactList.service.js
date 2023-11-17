import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const contactListService = {
    getContactLists,
    getUserContactLists,
    createContactList,
    getAContactList,
    updateContactList, 
    deleteContactList
}


async function getContactLists() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/contact_list/get_all`)
            .then((response) => {
                const resp = response.data
                return resolve(resp)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getUserContactLists(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/contact_list/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createContactList(contactListData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/contact_list/new`, contactListData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAContactList(contactListID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/contact_list/${contactListID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateContactList(contactListID, newContactList) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/contact_list/${contactListID}`, newContactList)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteContactList(contactListID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/contact_list/${contactListID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

