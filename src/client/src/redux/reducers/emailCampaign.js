import initialState from '../initialState'
import * as types from '../types'


export const emailCampaignReducer = (state = initialState.emailCampaigns, action) => {
    switch (action.type) {

        case types.SET_EMAIL_CAMPAIGNS: {
            return {...action.payload?.data}
        }

        case types.ADD_EMAIL_CAMPAIGN: {
            let initial = {...state}
            let newEmailCampaigns = [...initial?.queryResult, action.payload?.data]
            initial.queryResult = newEmailCampaigns
            return initial
        }

        case types.DELETE_EMAIL_CAMPAIGN: {
            let initial = {...state}
            let filtered = state?.queryResult?.filter(
                (c) => String(c?.id) !== String(action.emailCampaignID)
            )
            initial.queryResult = filtered
            return initial
        }
            
        case types.UPDATE_EMAIL_CAMPAIGN: {

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

            const data =  state?.queryResult?.map((emailCampaign) => {
                if (emailCampaign?.id === action?.payload?.data?._id) {
                    return action.payload.data
                }
                return emailCampaign
            })

            initial.queryResult = data

            return initial
        }

        default:
            return state
    }
}
  
export default emailCampaignReducer
  