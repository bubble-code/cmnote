
import { updateService } from '../../Redux/Actions/ActionCMS';

// Components
import { Modal, Form, Input, Button, Row } from 'antd';

export const ModalEditService = ({ isOpen, handleClose, updateList, service }) => {
    const [form] = Form.useForm(service);

    const onFinish = (values, id) => {
        try {
            updateService(values, id);
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
            title='Edit Service'
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

export default ModalEditService