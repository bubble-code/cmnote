
import { createSlice } from '@reduxjs/toolkit';
import { updateAll, loadCms } from '../Reducers/CmREducers';
import { getBillingByCm, errorBillingByCm, loadingBillingByCm } from '../Reducers/BillingByCmReducer';

const initialStateCManager = {
    loading: false,
    error: null,
    data: null
};

const initialStateBillingByCM = {
    data: [],
    loading: false,
    error: null
};

const createCMSSlice = ({ name, initialState, reducers, extraReducers }) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            ...reducers
        },
        extraReducers: {
            ...extraReducers,
        }
    });
};

const SliceCMs = createCMSSlice({
    name: 'CManaget',
    initialState: initialStateCManager,
    reducers: {
        reset: () => ({ ...initialStateCManager }),
        updateAll,
        loadCms,
    },
    extraReducers: {}
});

const SliceBillingByCm = createCMSSlice({
    name: 'BillingByCm',
    initialState: initialStateBillingByCM,
    reducers: {
        getBillingByCm,
        errorBillingByCm,
        loadingBillingByCm,
    },
    extraReducers: {}
});


export { SliceCMs, SliceBillingByCm };