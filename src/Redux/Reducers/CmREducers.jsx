
import { createAsyncThunk } from '@reduxjs/toolkit';
import DataService from '../../services/service';
import { updateList } from '../Actions/ActionCMS';

const loadCms = async (state, action) => {
    return {
        ...state,
        data: action.payload
    };
};

const updateAll = (state, action) => {
    return {
        ...state,
        data: action.payload
    }
};

export { updateAll, loadCms };
