import React from 'react';

export const VerifiedBadge = ({ text, noMarginLeft }) => (
	<span
		style={{
			fontSize: '1rem',
			backgroundColor: 'rgba(0,255,0,.7)',
			display: 'inline-block',
			padding: '3px 10px',
			marginLeft: noMarginLeft ? '0' : '10px',
			color: '#000000',
			borderRadius: '4px',
		}}
	>
		{text ? text : 'Verified'}
	</span>
);
