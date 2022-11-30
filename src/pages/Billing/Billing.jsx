// import { useState } from 'react';
import { SliceProvider, BillingByCmProvider } from '../../Redux/sliceProvider';
import { SliceCMs, SliceBillingByCm } from '../../Redux/Slices/CmSlice';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Row, Col } from 'antd';
import NavBarVertical from '../../components/NavVertical/NavBarVertical';

export const Billing = () => {
    // const location = useLocation();
    // console.log(location.pathname.split('/')[1]);

    return (
        <SliceProvider slice={SliceCMs}>
            <BillingByCmProvider slice={SliceBillingByCm}>
                <Col span={24}>
                    <Row justify='space-between' align='top' className='container-form-login' >
                        <Col span={4}>
                            <Row justify='start' style={{ paddingTop: '2rem' }}>
                                <Col span={2}>
                                    <NavBarVertical />
                                </Col>
                            </Row>
                        </Col>
                        <div className='w-4/5 relative'>
                            <Outlet />
                        </div>
                    </Row>
                </Col>
            </BillingByCmProvider>
        </SliceProvider>
    )
}

export default Billing