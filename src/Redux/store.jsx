
import { configureStore } from '@reduxjs/toolkit';
import { SliceCMs, SliceBillingByCm } from './Slices/CmSlice.jsx';



const store = configureStore({
    reducer: {
        CManager: SliceCMs.reducer,
        BillingByCm: SliceBillingByCm.reducer
    }
});

export default store;