import * as types from '../types'

const userActions = {
    login: (user = {}) => {
        return (dispatch) => {
            dispatch({ type: types.LOGIN, payload: user })
            localStorage.setItem("user", JSON.stringify(user));
        }
    },
    logout: () => {
        return (dispatch) => {
            localStorage.removeItem('user')
            dispatch({ type: types.LOGOUT })
            //window.location.reload()
        }
    },
    updateUserData: (user = {}) => {
        return (dispatch) => {
            dispatch({ type: types.UPDATE_USER_DATA, payload: user })

            // Update the user data in localStorage as well
            let userData = JSON.parse(localStorage.getItem("user"))
            userData['data'] = user
            localStorage.setItem("user", JSON.stringify(userData));
        }
    },
    tokenRefreshOn: () => {
        return (dispatch) => {
            dispatch({ type: types.REFRESHON })
        }
    },
    tokenRefreshOff: () => {
        return (dispatch) => {
            dispatch({ type: types.REFRESHOFF })
        }
    },
    updateTokens: (payload) => {
        return (dispatch) => {
            dispatch({ type: types.REFRESHTOKEN, payload })
        }
    },
}

export default userActions
