import * as types from '../types'
import initialState from '../initialState'

export default function settingsReducer(state = initialState.settings, action) {
    switch (action.type) {
        case types.SET_THEME: {
            return {
                ...state,
                theme: action.payload,
            }
        }
        case types.SHOW_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.HIDE_LOADING: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.SHOW_ALERT: {
            return {
                ...state,
                alert: {
                    alert: true,
                    message: action?.message,
                    title: action?.title,
                    notification: action?.notification,
                    timeout: action?.timeout,
                },
            }
        }
        case types.HIDE_ALERT: {
            return {
                ...state,
                alert: {
                    alert: false,
                    message: null,
                    title: null,
                    notification: null,
                },
            }
        }
        case 'SET_THEME': {
            return {
                ...state,
                theme: action.theme,
            }
        }

        default:
            return state
    }
}
