import React from 'react';
import { Loader } from '../Loader';

export const GlobalLoader = () => {
	return (
		<div
			style={{
				position: 'fixed',
				top: '0px',
				left: '0px',
				width: '100vw',
				height: '100vh',
				backgroundColor: '#fff',
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
			}}
		>
			<Loader />
		</div>
	);
};
