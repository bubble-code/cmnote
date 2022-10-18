
import { Row, Col, Form, Input, Button, Select, DatePicker, InputNumber, message, Checkbox, Typography } from 'antd';
const { Option } = Select;





const initValues = {
    username: '',
    password: '',
    remember: false
}

export const CreateBilling = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const { username, password, remember } = values;
        // login(dispatch, { username, password });
    };

    return (
        <Row justify='center' align='middle' className='container-form-login' >

            <Col span={20} style={{ minHeight: '50vh', padding: '0px 20px 0px 20px' }} >
                <Form name='newBill' initialValues={initValues} onFinish={onFinish} form={form} wrapperCol={{ span: 24 }} labelCol={{ span: 4 }}>
                    <Form.Item name='cm' label='Case Manager' rules={[{ required: true, message: 'Please select the CM!' }]}>
                        <Input placeholder='Case Manager' />
                    </Form.Item>
                    <Form.Item name='cn' label='Name Client' rules={[{ required: true, message: 'Please select the Client Name' }]}>
                        <Input placeholder='Client Name' />
                    </Form.Item>
                    <Form.Item name='fecha' label='Select Date' rules={[{ required: true, message: 'Plase Chose the Date' }]}>
                        <DatePicker>Date of Service</DatePicker>
                    </Form.Item>
                    <Row style={{ padding: '0px 20px 0px 20px' }} justify={'space-between'}>
                        <Col span={20}>
                            <Form.Item label='Setting' name={'pos'} rules={[{ required: true, message: 'Plase Chose the Date' }]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Row justify='space-around'>
                                <Form.Item >
                                    <Typography.Text type='secondary'>Setting</Typography.Text>
                                </Form.Item>
                                <Form.Item >
                                    <Typography.Text type='secondary'>Min</Typography.Text>
                                </Form.Item>
                                <Form.Item >
                                    <Typography.Text type='secondary'>Unit</Typography.Text>
                                </Form.Item>
                            </Row>
                        </Col>
                    </Row>
                    <Form.Item name='description' label='Service Descriptiom' rules={[{ required: true, message: 'Please Main Service' }]}>
                        <Input placeholder='Main Service' />
                    </Form.Item>
                    <Form.Item name='details' label='Service Details' rules={[{ required: true, message: 'Please Select Details' }]}>
                        <Input placeholder='Details Service' />
                    </Form.Item>
                    <Form.Item name='start' label='Start' rules={[{ required: true, message: 'Please Select Start' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='end' label='End' rules={[{ required: true, message: 'Please Select End' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' style={{ width: '100%' }} >Submit</Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    )
}

export default CreateBilling