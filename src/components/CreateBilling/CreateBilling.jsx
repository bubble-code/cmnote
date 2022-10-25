
import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCms, getClients, getServices, getDetailsServices } from '../../Redux/Actions/ActionCMS';
import { useSliceActions, useSliceSelector } from '../../Redux/sliceProvider';
import { Row, Col, Form, Input, Button, Select, DatePicker, InputNumber, message, Checkbox, AutoComplete } from 'antd';
const { Option } = Select;





const initValues = {
    username: '',
    password: '',
    remember: false
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

    const onchangeService = async (value) => {
        console.log("service", value);
        form.setFieldValue('service', value);
        const response = await getDetailsServices(value);
        setDetailsServices(response);
    };


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onFinish = (values) => {
        const { username, password, remember } = values;
        console.log('Success:', values);
        // login(dispatch, { username, password });
    };

    return (
        <Col span={10} style={{ minHeight: '50vh', padding: '0px 20px 0px 20px' }} >
            <Form name='newBill' onFinish={onFinish} form={form} wrapperCol={{ span: 24 }} labelCol={{ span: 6 }} >
                <Form.Item name='cm' label='Case Manager' rules={[{ required: true, message: 'Please select the CM!' }]} >
                    <Select placeholder='Case Manager' allowClear onChange={onChangeCm}>
                        {data && data.map((item, index) => (
                            <Option key={index} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='cn' label='Name Client' rules={[{ required: true, message: 'Please select the Client Name' }]}>
                    <Select placeholder='Client Name' allowClear showSearch>
                        {listClients && listClients.map((item, index) => (
                            <Option key={index} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='fecha' label='Select Date' rules={[{ required: true, message: 'Plase Chose the Date' }]}>
                    <DatePicker>Date of Service</DatePicker>
                </Form.Item>
                <Form.Item label='Setting' name={'setting'} rules={[{ required: true, message: 'Plase Chose the Date' }]} >
                    <Input type='number' allowClear />
                </Form.Item>
                <Form.Item name={'pos'} label='Pos' rules={[{ required: true, message: 'Type of Pos' }]}>
                    <Input type='number' />
                </Form.Item>
                <Form.Item name='start' label='Start' rules={[{ required: true, message: 'Please Select Start' }]}>
                    <Input type='time' />
                </Form.Item>
                <Form.Item name='end' label='End' rules={[{ required: true, message: 'Please Select End' }]}>
                    <Input type='time' />
                </Form.Item>

                <Form.Item name={'min'} label='Minutos' >
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'unit'} label='Units'>
                    <Input disabled />
                </Form.Item>
                <Form.Item name='service' label='Service Type' rules={[{ required: true, message: 'Please Main Service' }]}>
                    <Select placeholder='Main Service' showSearch onChange={(e) => onchangeService(e)}>
                        {services && services.map((item, index) => (
                            <Option key={index} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='details' label='Service Details' rules={[{ required: true, message: 'Please Select Details' }]}>
                    <Select placeholder='Service' allowClear showSearch>
                        {detailsServices && detailsServices.map((item, index) => (
                            <Option key={index} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ width: '100%' }} >Submit</Button>
                </Form.Item>

            </Form>
        </Col>
    )
}

export default CreateBilling