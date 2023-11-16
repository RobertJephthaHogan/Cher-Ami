import initialState from '../initialState'
import * as types from '../types'


export const contactReducer = (state = initialState.contacts, action) => {
    switch (action.type) {

        case types.SET_CONTACTS: {
            return {...action.payload?.data}
        }

        case types.ADD_CONTACT: {
            let initial = {...state}
            let newContacts = [...initial?.queryResult, action.payload?.data]
            initial.queryResult = newContacts
            return initial
        }

        case types.DELETE_CONTACT: {
            let initial = {...state}
            let filtered = state?.queryResult?.filter(
                (c) => String(c?.id) !== String(action.contactID)
            )
            initial.queryResult = filtered
            return initial
        }
            
        case types.UPDATE_CONTACT: {

            let initial = {...state}

            if (!action?.payload?.data?._id) {
                return state
            }

            const found = state?.queryResult?.find(
                (c) => c?.id === action?.payload?.data?._id
            )

            if (!found && action?.payload) {
                let workingObj = {...state}
                let workingQR = [...workingObj?.queryResult] 
                workingQR = [...workingQR, action?.payload?.data]
                workingObj.queryResult = workingQR
                return workingObj
            }

            const data =  state?.queryResult?.map((contact) => {
                if (contact?.id === action?.payload?.data?._id) {
                    return action.payload.data
                }
                return contact
            })

            initial.queryResult = data

            return initial
        }

        default:
            return state
    }
}
  
export default contactReducer
  