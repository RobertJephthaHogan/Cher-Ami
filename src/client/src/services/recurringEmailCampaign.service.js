import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const recurringEmailCampaignService = {
    getRecurringEmailCampaigns,
    getUserRecurringEmailCampaigns,
    createRecurringEmailCampaign,
    getARecurringEmailCampaign,
    updateRecurringEmailCampaign, 
    deleteRecurringEmailCampaign
}


async function getRecurringEmailCampaigns() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/recurring_email_campaign/get_all`)
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

async function getUserRecurringEmailCampaigns(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/recurring_email_campaign/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createRecurringEmailCampaign(emailCampaignData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/recurring_email_campaign/new`, emailCampaignData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getARecurringEmailCampaign(emailCampaignID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/recurring_email_campaign/${emailCampaignID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateRecurringEmailCampaign(emailCampaignID, newEmailCampaign) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/recurring_email_campaign/${emailCampaignID}`, newEmailCampaign)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteRecurringEmailCampaign(emailCampaignID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/recurring_email_campaign/${emailCampaignID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

