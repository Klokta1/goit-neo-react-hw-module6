import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

const contactsPersistConfig = {
    key: "contacts",
    storage,
    whitelist: ["items"]
};

const rootReducer = combineReducers({
    contacts: persistReducer(contactsPersistConfig, contactsReducer),
    filters: filtersReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ["persist/PERSIST"],
            },
        }),
});

export const persistor = persistStore(store);