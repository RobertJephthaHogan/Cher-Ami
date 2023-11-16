import { openNotification } from '../../helpers/notifications'
import { contactService } from '../../services/contact.service'
import * as types from '../types'



const contactActions = {
    setContactss: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                contactService
                    .getUserContacts(user_id)
                    .then((response) => {
                        if (response) {
                            dispatch({
                                type: types.SET_CONTACTS,
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
                contactService
                .createContact(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Contact ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_CONTACT, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Contact:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Contact ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (contactID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return contactService
                    .deleteContact(contactID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Contact ${contactID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_CONTACT, contactID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Contact:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Contact ${contactID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (contactID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return contactService
                    .updateContact(contactID, payload)
                    .then((resp) => {
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Contact ${contactID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_CONTACT, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Contact:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Contact ${contactID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default contactActions
