
import {  useState, useRef } from 'react';
import { useSliceSelector,  useSliceBillingByCmSelector } from '../../Redux/sliceProvider';
import { useDispatch } from 'react-redux';
import { loadBillingByCm } from '../../Redux/Reducers/BillingByCmReducer';
// Components
import { Col, Row, Form, Select } from 'antd';
import TableRenderBillOpen from '../TableRenderBillOpen/TableRenderBillOpen';
import SegmentedControl from '../SegmentedControl/SegmentedControl';
import ListBillByClient from '../ListBillByClient/ListBillByClient';

const { Option } = Select;


export const ListBilling = () => {
  const { data: listCms } = useSliceSelector();
  const { entities: listBillingByCm = {} } = useSliceBillingByCmSelector();
  const { clienWithBill = [], data: listBills } = listBillingByCm;
  const dispatch = useDispatch();
  const [selectedValue1, setSelectedValue1] = useState({ idx: 0 });


  const onChangeCm = async (value) => {
    dispatch(loadBillingByCm({ cm: value }));
  };


  return (
    <Col span={24} style={{ minHeight: '50vh', padding: '0px 20px 0px 20px' }} >
      <Row justify='center'>
        <Col span={8}>
          <Form >
            <Form.Item >
              <Select placeholder='Case Manager' allowClear onChange={onChangeCm} >
                {listCms && listCms.map((item, index) => (
                  <Option key={index} value={item.label}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify='center'>
        <SegmentedControl
          name="group-1"
          callback={setSelectedValue1}
          controlRef={useRef()}
          segments={[
            {
              label: "Pending",
              value: "pending",
              ref: useRef()
            },
            {
              label: "By Client",
              value: "By Client",
              ref: useRef()
            },
            {
              label: "Pending",
              value: "pending",
              ref: useRef()
            }
          ]}
        />
      </Row>
      {selectedValue1.idx === 0 && listBills && <TableRenderBillOpen listBills={listBills} />}
      {selectedValue1.idx === 1 && <ListBillByClient clienWithBill={clienWithBill} />}
    </Col>
  )
}

export default ListBilling