import { openNotification } from '../../helpers/notifications'
import { emailCampaignService } from '../../services/emailCampaign.service'
import * as types from '../types'



const emailCampaignActions = {
    setEmailCampaigns: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                emailCampaignService
                    .getUserEmailCampaigns(user_id)
                    .then((response) => {
                        if (response) {
                            dispatch({
                                type: types.SET_EMAIL_CAMPAIGNS,
                                payload: response?.data,
                            })
                            resolve(response)
                        } else {
                            reject()
                        }
                    })
                    .catch((error) => reject(error))
            })
        }
    },

    add: (payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                emailCampaignService
                .createEmailCampaign(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Email Campaign ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_EMAIL_CAMPAIGN, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Email Campaign:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Email Campaign ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (emailCampaignID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return emailCampaignService
                    .deleteEmailCampaign(emailCampaignID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Email Campaign ${emailCampaignID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_EMAIL_CAMPAIGN, emailCampaignID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Email Campaign:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Email Campaign ${emailCampaignID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (emailCampaignID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return emailCampaignService
                    .updateEmailCampaign(emailCampaignID, payload)
                    .then((resp) => {
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Email Campaign ${emailCampaignID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_EMAIL_CAMPAIGN, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Email Campaign:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Email Campaign ${emailCampaignID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default emailCampaignActions
