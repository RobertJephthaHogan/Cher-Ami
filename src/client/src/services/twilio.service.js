import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const twilioService = {
    connectTwilioAccount,
}


async function connectTwilioAccount(login_data) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/twilio/connect_account`, login_data)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

