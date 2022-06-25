import {configureStore} from '@reduxjs/toolkit';
import storageReducer from './reducers/storage';

export default configureStore({
    reducer: {
        storage: storageReducer,
    },
});
