import * as actionTypes from './actions'

const initUser = {
    token: null
}

const initialState = {
    user: initUser,
    lastRoute: '',
    persisted: {
        user: initUser,
    },
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {

        /////// AUTH ////////
        case actionTypes.AUTHENTICATE:
            if (action.keepLoggedIn) {
                return {
                    ...state,
                    persisted: {
                        ...state.persisted,
                        user: action.user
                    }
                }

            } else {
                sessionStorage.setItem(
                    actionTypes.USER,
                    JSON.stringify(action.user)
                )

                return {
                    ...state,
                    persisted: {
                        ...state.persisted,
                        user: initUser
                    },
                    user: action.user
                }
            }

        case actionTypes.LOGOUT:
            sessionStorage.removeItem(actionTypes.USER)
            localStorage.clear()
            return {
                ...state,
                persisted: {
                    ...state.persisted,
                    user: initUser
                },
                user: initUser
            }

        ////// END AUTH //////

        case actionTypes.SAVE_STATE:
            return {
                ...state,
                [action.key]: action.value
            }

        case actionTypes.SAVE_PERSIST:
            return {
                ...state,
                persisted: {
                    ...state.persisted,
                    [action.key]: action.value
                }
            }

        default:
            return state
    }
}

export default reducer