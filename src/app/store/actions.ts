import store from '../store'
/*
 * action types
 */
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SAVE_STATE = 'SAVE_STATE'
export const SAVE_PERSIST = 'SAVE_PERSIST'

export const USER = "@TRACK-CASH-USER"

/*
 * action creators
 */
const dispatcher = (action: string, props?: any) => store.dispatch({
    type: action,
    ...props
})

const user = {
    authenticate: (user: any, keepLoggedIn?: boolean) => dispatcher(
        AUTHENTICATE,
        { user, keepLoggedIn }
    ),

    logout: () => dispatcher(LOGOUT),

    get: () => {
        const data = store.getState()

        let user: any = data.persisted.user.token
            ? data.persisted.user
            : data.user

        return user
    },

    refresh: () => {
        const data = store.getState()

        let user: any = data.persisted.user.token
            ? data.persisted.user
            : data.user

        if (!user.token) {
            user = sessionStorage.getItem(USER)
            if (!user) return null
            user = JSON.parse(user)
            redux.saveState('user', user)
        }
    }
}

const saveState = (key: string, value: any) => dispatcher(
    SAVE_STATE,
    { key, value }
)

const emitEvent = (key: string) => saveState(
    key,
    new Date().getTime()
)

const savePersist = (key: string, value: any) => dispatcher(
    SAVE_PERSIST,
    { key, value }
)

const getState = (key: string) => store.getState()[key]

const redux = {
    saveState,
    getState,
    savePersist,
    user,
    emitEvent
}
export default redux