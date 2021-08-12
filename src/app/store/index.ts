import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers'

const persistConfig = {
    key: '@TRACK-CASH-DATA',
    storage,
    whitelist: [
        'persisted',
    ]
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { persistor }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
