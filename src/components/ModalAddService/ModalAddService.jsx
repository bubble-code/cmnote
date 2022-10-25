
import { addService } from '../../Redux/Actions/ActionCMS';

import { Modal, Form, Input, Button, Row } from 'antd';

export const ModalAddService = ({ isOpen, handleClose, updateList }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        try {
            addService(values);
            form.resetFields();
            updateList();
            // message.success('Service added successfully');
            // handleClose(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal
            open={isOpen || false}
            title='Add Service'
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
        >
            <Form form={form} layout='vertical' onFinish={onFinish} >
                <Form.Item label='Service Name' name='service' rules={[{ required: true, message: 'Please input the service name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Description' name='dxc' rules={[{ required: true, message: 'Please input the service name!' }]}>
                    <Input.TextArea rows={7} />
                </Form.Item>
                <Form.Item>
                    <Row justify='space-between'>
                        <Button type='dashed' onClick={() => { handleClose(false) }} >Cancel</Button>
                        <Button type='primary' htmlType='submit' >Add</Button>
                    </Row>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAddService