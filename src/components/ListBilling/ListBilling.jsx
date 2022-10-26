
import { useEffect, useState } from 'react';
import { useSliceSelector, useSliceBillingByCmActions, useSliceBillingByCmSelector } from '../../Redux/sliceProvider';
import { getBillingByCMs } from '../../Redux/Actions/ActionCMS';
import { useDispatch } from 'react-redux';
// Components
import { Col, Row, Form, Select, Button } from 'antd';
import TableRenderBillOpen from '../TableRenderBillOpen/TableRenderBillOpen';

const { Option } = Select;


export const ListBilling = () => {
  const { data: listCms } = useSliceSelector();
  const { getBillingByCm, errorBillingByCm, loadingBillingByCm } = useSliceBillingByCmActions();
  const { data: listBillingByCm = {} } = useSliceBillingByCmSelector();
  const { clienWithBill = [], data: listBills } = listBillingByCm; 
  const dispatch = useDispatch();


  const onChangeCm = async (value) => {
    // console.log(value);
    await getBillingByCMs(dispatch, loadingBillingByCm, getBillingByCm, errorBillingByCm, value);
  };

  useEffect(() => { }, []);

  return (
    <Col span={24} style={{ minHeight: '50vh', padding: '0px 20px 0px 20px' }} >
      <Form >
        <Col span={18} >
          <Row justify='space-between'>
            <Col span={8}>
              <Form.Item >
                <Select placeholder='Case Manager' allowClear onChange={onChangeCm} >
                  {listCms && listCms.map((item, index) => (
                    <Option key={index} value={item.label}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item >
                <Select placeholder='Client Name' allowClear >
                  {clienWithBill && clienWithBill.map((item, index) => (
                    <Option key={index} value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item >
                <Button type='primary' >Search</Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Form>
      {listBills && <TableRenderBillOpen listBills={listBills} />}
    </Col>
  )
}

export default ListBilling