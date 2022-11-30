
import { configureStore } from '@reduxjs/toolkit';
import { SliceCMs, SliceBillingByCm } from './Slices/CmSlice.jsx';
import { firebaseApiMain } from './Api/firbase-api-main.jsx';



const store = configureStore({
    reducer: {
        CManager: SliceCMs.reducer,
        BillingByCm: SliceBillingByCm.reducer,
        [firebaseApiMain.reducerPath]: firebaseApiMain.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(firebaseApiMain.middleware)
});

export default store;