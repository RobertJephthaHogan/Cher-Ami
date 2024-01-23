import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const emailCampaignService = {
    getEmailCampaigns,
    getUserEmailCampaigns,
    createEmailCampaign,
    getAEmailCampaign,
    updateEmailCampaign, 
    deleteEmailCampaign,
    getEmailCampaignHistory
}


async function getEmailCampaigns() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/email_campaign/get_all`)
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

async function getUserEmailCampaigns(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/email_campaign/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createEmailCampaign(emailCampaignData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/email_campaign/new`, emailCampaignData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAEmailCampaign(emailCampaignID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/email_campaign/${emailCampaignID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateEmailCampaign(emailCampaignID, newEmailCampaign) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/email_campaign/${emailCampaignID}`, newEmailCampaign)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteEmailCampaign(emailCampaignID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/email_campaign/${emailCampaignID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getEmailCampaignHistory(campaignID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/email_campaign/history/${campaignID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}