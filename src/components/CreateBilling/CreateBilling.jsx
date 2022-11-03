
import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCms, getClients, getServices, getDetailsServices, createUpdateBilling } from '../../Redux/Actions/ActionCMS';
import { useSliceActions, useSliceSelector } from '../../Redux/sliceProvider';
import { countUnits, duration } from './timeAndUnits';

import { Row, Col, Form, Input, Button, Select, DatePicker, InputNumber, message, Checkbox, AutoComplete } from 'antd';
import moment from 'moment/moment';
import { async } from '@firebase/util';
const { Option } = Select;

const initialValuesForm = { 
    cn: '',
    cm: '',
    description: [],
    cnumb: '',
    domain: '',
    service: '',
    fecha: '',
    min: '',
    units: '',
    nStep: '',
    outComeS: '',
    pNumber: '',
    pos: '',
    sCode: '',
    sNote: '',
    status: 'open',
    timeEnd: '',
    timeStart: '',

}

export const CreateBilling = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { updateAll } = useSliceActions();
    const { data } = useSliceSelector();
    const [listClients, setListClients] = useState([]);
    const [services, setServices] = useState([]);
    const [detailsServices, setDetailsServices] = useState([]);

    const fetchData = useCallback(async () => {
        await getCms(dispatch, updateAll);
        const response = await getServices();
        setServices(response);
    }, [dispatch, updateAll]);

    const onChangeCm = async (value) => {
        setListClients([]);
        form.setFieldValue('cn', '');
        console.log(value);
        if (Boolean(value)) {
            form.setFieldValue('cm', value);
            const response = await getClients(value);
            setListClients(response);
        }
    }
    const onChangeCn = (value) => {
        if (Boolean(value)) {
            const { label, cnumb } = listClients.find(client => client.label === value);
            console.log(label, cnumb);
            form.setFieldValue('cn', label);
            form.setFieldValue('cnumb', cnumb);
        }
    };
    const onchangeService = async (value) => {
        form.setFieldValue('service', value);
        const response = []
        for (const service of value) {
            const details = await getDetailsServices(service);
            response.push(...details);
        }
        setDetailsServices(response);
    };


    const onchangeTime = (e) => {
        const { id, value } = e.target;
        form.setFieldValue(id, value);
        const durationTime = duration({ tEnd: form.getFieldValue('timeEnd'), tStart: form.getFieldValue('timeStart') });
        const countUnitsTime = countUnits(durationTime);
        form.setFieldValue('units', countUnitsTime);
        form.setFieldValue('min', durationTime);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onFinish = () => {
        const values = form.getFieldsValue(['cnumb', 'cm', 'cn', 'domain', 'service', 'fecha', 'min', 'units', 'nStep', 'outComeS', 'pNumber', 'pos', 'sCode', 'sNote', 'status', 'timeEnd', 'timeStart', 'description']);
        const fecha = moment(values.fecha, 'YYYY-MM-DD').format('DD-MM-YYYY');
        createUpdateBilling({ ...values, fecha });
    };

    return (
        <Col span={12} style={{ minHeight: '50vh', padding: '0px 20px 0px 20px' }} >
            <Form name='newBill' onFinish={onFinish} form={form} wrapperCol={{ span: 24 }} labelCol={{ span: 6 }} initialValues={initialValuesForm} >
                <Form.Item name='cm' label='Case Manager' rules={[{ required: true, message: 'Please select the CM!' }]} >
                    <Select placeholder='Case Manager' allowClear onChange={onChangeCm}>
                        {data && data.map((item, index) => (
                            <Option key={index} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='cn' label='Name Client' rules={[{ required: true, message: 'Please select the Client Name' }]}>
                    <Select placeholder='Client Name' allowClear showSearch onChange={onChangeCn}>
                        {listClients && listClients.map((item, index) => (
                            <Option key={index} id={item.cnumb} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='fecha' label='Select Date' rules={[{ required: true, message: 'Plase Chose the Date' }]} >
                    <Input type='date' onBlur={onchangeTime} id={'fecha'} />
                </Form.Item>
                <Form.Item label='Domain' name={'domain'} rules={[{ required: true, message: 'Plase Chose the Date' }]} >
                    <Input type='number' allowClear />
                </Form.Item>
                <Form.Item name={'pos'} label='Pos' rules={[{ required: true, message: 'Type of Pos' }]}>
                    <Input type='number' />
                </Form.Item>
                <Form.Item name='timeStart' label='Start' rules={[{ required: true, message: 'Please Select Start' }]}>
                    <Input type='time' onBlur={onchangeTime} id={'timeStart'} />
                </Form.Item>
                <Form.Item name='timeEnd' label='End' rules={[{ required: true, message: 'Please Select End' }]}>
                    <Input type='time' onBlur={onchangeTime} id={'timeEnd'} />
                </Form.Item>

                <Form.Item name={'min'} label='Minutos' >
                    <Input disabled value={form.getFieldValue('min')} />
                </Form.Item>
                <Form.Item name={'units'} label='Units'>
                    <Input disabled value={form.getFieldValue('unit')} />
                </Form.Item>
                <Form.Item name='service' label='Service Type' rules={[{ required: true, message: 'Please Main Service' }]}>
                    <Select placeholder='Main Service' showSearch onChange={(e) => onchangeService(e)} mode='multiple'>
                        {services && services.map((item, index) => (
                            <Option key={index} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='description' label='Service Details' rules={[{ required: true, message: 'Please Select Details' }]}>
                    <Select placeholder='Service' allowClear showSearch mode='multiple'>
                        {detailsServices && detailsServices.map((item, index) => (
                            <Option key={index} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ width: '100%' }} >Submit</Button>
                </Form.Item>

            </Form>
        </Col >
    )
}

export default CreateBilling