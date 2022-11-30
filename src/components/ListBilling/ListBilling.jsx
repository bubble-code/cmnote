
import { useState, useRef } from 'react';
import { useSliceSelector, useSliceBillingByCmSelector } from '../../Redux/sliceProvider';
import { useDispatch } from 'react-redux';
import { loadBillingByCm } from '../../Redux/Reducers/BillingByCmReducer';
// Components
import { Col, Row, Form, Select } from 'antd';
import TableRenderBillOpen from '../TableRenderBillOpen/TableRenderBillOpen';
import SegmentedControl from '../SegmentedControl/SegmentedControl';
import ListBillByClient from '../ListBillByClient/ListBillByClient';
import { SelectInputCm } from '../SelectInputCm/selectInputCm';
import { async } from '@firebase/util';

const { Option } = Select;


export const ListBilling = () => {
  const { data: listCms } = useSliceSelector();
  const { entities: listBillingByCm = {} } = useSliceBillingByCmSelector();
  const { clienWithBill = [], data: listBills } = listBillingByCm;
  const dispatch = useDispatch();
  const [selectedValue1, setSelectedValue1] = useState({ idx: 0 });


  async function onChangeCm(value) {
    dispatch(loadBillingByCm({ cm: value }));
  };


  return (
    <section className='min-h-screen'>
      <div className='text-left flex justify-between flex-row w-full items-center align-bottom mt-10'>
        <SelectInputCm onChangeCm={onChangeCm} />
        <div>
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
        </div>

      </div>

      {selectedValue1.idx === 0 && listBills && <TableRenderBillOpen listBills={listBills} />}
      {selectedValue1.idx === 1 && <ListBillByClient clienWithBill={clienWithBill} />}
    </section>
  )
}

export default ListBilling