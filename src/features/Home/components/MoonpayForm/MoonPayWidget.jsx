import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPayUrl } from './moonpayFormSlice';
import { Loader } from 'core/components/Loader';

export const MoonPayWidget = ({ accountId }) => {
    const dispatch = useDispatch();
    
	useEffect(() => {
		dispatch(fetchGetPayUrl(accountId));
    }, [accountId, dispatch]);
    
    const { payUrl, fetching, errors } = useSelector((state) => state.moonpay);
    
    if (fetching || !payUrl) return <Loader />;
    
	if (payUrl)
		return (
			<iframe
				title="MoonPay"
				allow="accelerometer; autoplay; camera; gyroscope; payment"
				frameBorder="0"
				height="100%"
				src={payUrl}
				width="100%"
			>
				<p>Your browser does not support iframes.</p>
			</iframe>
        );
    
	if (errors.length) return <p>{errors[0].value}</p>;
};
