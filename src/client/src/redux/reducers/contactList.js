import initialState from '../initialState'
import * as types from '../types'


export const contactListReducer = (state = initialState.contactLists, action) => {
    switch (action.type) {

        case types.SET_CONTACT_LISTS: {
            return {...action.payload?.data}
        }

        case types.ADD_CONTACT_LIST: {
            let initial = {...state}
            let newContactLists = [...initial?.queryResult, action.payload?.data]
            initial.queryResult = newContactLists
            return initial
        }

        case types.DELETE_CONTACT_LIST: {
            let initial = {...state}
            let filtered = state?.queryResult?.filter(
                (c) => String(c?.id) !== String(action.contactListID)
            )
            initial.queryResult = filtered
            return initial
        }
            
        case types.UPDATE_CONTACT_LIST: {

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

            const data =  state?.queryResult?.map((contactList) => {
                if (contactList?.id === action?.payload?.data?._id) {
                    return action.payload.data
                }
                return contactList
            })

            initial.queryResult = data

            return initial
        }

        default:
            return state
    }
}
  
export default contactListReducer
  