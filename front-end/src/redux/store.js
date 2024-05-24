import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";


const persistConfig = {
    key: 'root',
    storage,
    whitelist:['auth']
};
const rootReducer = combineReducers({

    auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
});
const persistor = persistStore(store)


export { store, persistor };