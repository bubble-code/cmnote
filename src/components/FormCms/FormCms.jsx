import React from 'react';
import { useDispatch } from 'react-redux';
import { useSliceSelector, useSliceActions } from '../../Redux/sliceProvider';
import { getCms } from '../../Redux/Actions/ActionCMS';
// import { updateAll } from '../../Redux/Reducers/CmREducers';


import { Button } from 'antd';


export const FormCms = () => {
    const dispatchRedux = useDispatch();
    const { loadin, error, data } = useSliceSelector();
    const { updateAll } = useSliceActions();
    const handleUpdate = async () => {
        // const response = await DataService.getCms();
        // dispatchRedux(updateAll(response));
        await getCms(dispatchRedux, updateAll);
        // await dispatchRedux();
    };
    return (
        <div>
            <div>FormCms</div>
            {data && data.map((item, index) => (
                <div key={index}>{item.label}</div>
            ))}
            <Button onClick={() => handleUpdate()} type='primary' >Update</Button>
        </div>

    )
}

export default FormCms