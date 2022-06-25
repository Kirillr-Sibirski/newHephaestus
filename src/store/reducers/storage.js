import {createSlice} from '@reduxjs/toolkit';

export const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        loaded: false,
        storage: [],
    },
    reducers: {
        setStorage: (state, storage) => {
            state.loaded = true;
            state.storage = storage.payload;
        },
    },
});

export const {setStorage} = storageSlice.actions;

export const selectLoaded = (state) => state.storage.loaded;
export const selectStorage = (state) => state.storage.storage;

export default storageSlice.reducer;
