
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { SliceCMs, SliceBillingByCm } from './Slices/CmSlice.jsx';


const rootReducer = combineReducers({
    CManager: SliceCMs.reducer,
    BillingByCm: SliceBillingByCm.reducer
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;