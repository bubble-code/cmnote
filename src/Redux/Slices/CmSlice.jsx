
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { updateAll, loadCms } from '../Reducers/CmREducers';


const initialStateCManager = {
    loading: false,
    error: null,
    data: null
};

const BillingByCmAapter = createEntityAdapter();

const initialStateBillingByCM = BillingByCmAapter.getInitialState({
    status: 'idle',
});

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
        reset: () => ({ ...initialStateBillingByCM }),
    },
    extraReducers:
    {
        'BillingByCm/fetchBillingByCm/fulfilled': (state, action) => {
            state.loading = false;
            state.error = null;
            state.entities = action.payload;
        },
        'BillingByCm/fetchBillingByCm/pending': (state, action) => {
            state.loading = true;
            state.error = null;
        },
        'BillingByCm/saveNote/fulfilled': (state, action) => {
            const { fecha, id, status } = action.payload.data;
            const index = state.entities.data[fecha].findIndex((item) => item.id === id);
            if (status === 'completed') {
                if (index === 0) {
                    delete state.entities.data[fecha];
                } else {
                    state.entities.data[fecha].splice(index, 1);
                }
            } else {
                state.entities.data[fecha][index] = action.payload.data;
                state.loading = false;
                state.error = null;
            }
        },
    }
});


export { SliceCMs, SliceBillingByCm };