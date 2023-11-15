import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const contactService = {
    getContacts,
    getUserContacts,
    createContact,
    getAContact,
    updateContact, 
    deleteContact
}


async function getContacts() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/contact/get_all`)
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

async function getUserContacts(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/contact/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createContact(contactData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/contact/new`, contactData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAContact(contactID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/contact/${contactID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateContact(contactID, newContact) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/contact/${contactID}`, newContact)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteContact(contactID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/contact/${contactID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

