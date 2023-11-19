import { openNotification } from '../../helpers/notifications'
import { contactListService } from '../../services/contactList.service'
import * as types from '../types'



const contactListActions = {
    setContactLists: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                contactListService
                    .getUserContactLists(user_id)
                    .then((response) => {
                        if (response) {
                            dispatch({
                                type: types.SET_CONTACT_LISTS,
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
                contactListService
                .createContactList(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Contact List ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_CONTACT_LIST, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Creating Contact List:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Contact List ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (contactListID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return contactListService
                    .deleteContactList(contactListID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Contact List ${contactID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_CONTACT_LIST, contactListID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Contact List:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Contact List ${contactListID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (contactListID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return contactListService
                    .updateContactList(contactListID, payload)
                    .then((resp) => {
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Contact List ${contactListID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_CONTACT_LIST, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Contact List:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Contact List ${contactListID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default contactListActions
