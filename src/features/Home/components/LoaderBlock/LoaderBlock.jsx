import React, { useState, useEffect } from 'react';
import { Loader } from 'core/components/Loader';

export const LoaderBlock = ({ timeoutText, emptyText, refreshCallback, containerMaskClassName, count }) => {
	const [loadingText, setLoadingText] = useState('Loading...');
	const [showSpinner, setShowSpinner] = useState(true);
	let timeout;
	const startSpinner = () => {
		timeout = setTimeout(() => {
			setLoadingText(timeoutText);
			setShowSpinner(false);
		}, 5000);
	};

	useEffect(() => {
		startSpinner();
		return () => {
			setShowSpinner(true);
			clearTimeout(timeout);
		};
	}, []);

	const refresh = (e) => {
		e.preventDefault();
		setShowSpinner(true);
		startSpinner();
		refreshCallback();
	};

	return (
		<div>
			{showSpinner ? (
				<>
					<Loader />
					{containerMaskClassName && <div className={containerMaskClassName} />}
				</>
			) : (
				<div>
					{count === 0 ? emptyText : loadingText}
					<p>
						<button className="btn btn-primary btn-refresh" onClick={refresh}></button>
					</p>
				</div>
			)}
		</div>
	);
};
