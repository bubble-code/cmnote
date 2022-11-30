
import { useSliceSelector } from "../../Redux/sliceProvider"
import { Select, Form, Input } from "antd";

const { Option } = Select;

export const SelectInputCm = ({ onChangeCm }) => {
    const { data: listCms = [] } = useSliceSelector();
    return (
        <div className='w-1/3 p-1 overflow-hidden mt-2'>
            <Form>
                <Form.Item>
                    <Select type="select" placeholder='Case Manager' allowClear onChange={onChangeCm} >
                        {listCms.map((item, index) => (
                            <Option key={index} value={item.label}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
}
