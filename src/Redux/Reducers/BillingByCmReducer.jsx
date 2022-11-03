import { createAsyncThunk, } from "@reduxjs/toolkit";
import DataService from '../../services/service';


const loadBillingByCm = createAsyncThunk(
    'BillingByCm/fetchBillingByCm',
    async ({ cm }) => {
        const response = await DataService.getBillingOpenByCm({ cm: cm });
        return response;
    }
);

const updateBilling = createAsyncThunk(
    'BillingByCm/saveNote',
    async ({ data }) => {
        const { cm, id, status } = data;
        if(status === 'open'){
            await DataService.saveNote({ cm, id, data });
        }else{
            await DataService.closeBilling({ cm, id, data });
        }

        return { data };
    }
);


export { loadBillingByCm, updateBilling };