import * as types from '../types'

const settingsActions = {
    showLoading: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.SHOW_LOADING }))
        }
    },
    setTheme: (theme) => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.SET_THEME, payload: theme }))
        }
    },
    hideLoading: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.HIDE_LOADING }))
        }
    },
    showAlert: (message, title, notification, timeout) => {
        if (timeout) {
            setTimeout(() => {
                settingsActions.hideAlert()
            }, timeout * 1000)
        }

        return (dispatch) => {
            Promise.resolve(
                dispatch({
                    type: types.SHOW_ALERT,
                    message,
                    title,
                    notification,
                    timeout,
                })
            )
        }
    },
    hideAlert: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.HIDE_ALERT }))
        }
    },
}

export default settingsActions
