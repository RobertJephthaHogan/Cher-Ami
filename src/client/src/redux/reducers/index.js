import { combineReducers } from 'redux'
import userReducer from './user'
import settingsReducer from './settings'
import initialState from '../initialState'
import * as types from '../types'
import contactReducer from './contact'
import contactListReducer from './contactList'
import emailCampaignReducer from './emailCampaign'
//import widgetReducer from './widget'


const appReducers = combineReducers({
  user:  userReducer,
  settings: settingsReducer,
  contacts: contactReducer,
  contactLists: contactListReducer,
  emailCampaigns: emailCampaignReducer,
  //widgets: widgetReducer
})


const rootReducer = (state, action) => {
  switch (action.type) {
      case types.LOGOUT_SUCCESS:
          return appReducers(
              {
                  ...initialState,
              },
              action
          )
      default:
          return appReducers(state, action)
  }
}

export default rootReducer