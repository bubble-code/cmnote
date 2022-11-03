import { createSlice } from "@reduxjs/toolkit";

export const statusFilterBilling = {
    all: "all",
    active: "active",
    completed: "completed",
}

const initialStateFilterBilling = {
    status: statusFilterBilling.all,
    client: [],
};

const filterSliceBilling = createSlice({
    name: "filterBilling",
    initialState: initialStateFilterBilling,
    reducers: {
        setStatusFilterBilling(state, action) {
            state.status = action.payload;
        },
        setClientFilterBilling: {
            reducer(state, action) {
                let { client } = action.payload;

            }
        },
    },
});