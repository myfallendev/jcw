import React from 'react';
import { ModalContainer } from 'core/components/ModalContainer';
export const TransferResult = ({ isSuccess, message, cb }) => {
	const iconName = isSuccess ? 'success' : 'warning';
	return (
		<ModalContainer fnmodalvisible={cb}>
			<div className="complete-popup">
				<div className="complete-popup__title">{message}</div>
				<div style={{ textAlign: 'center', margin: '15px 0' }}>
					<img style={{ width: '100px' }} src={`/img/modal-ico/modal-${iconName}-ico.png`} alt={iconName} />
				</div>
				<div className="complete-popup__controls">
					<button onClick={cb} className="btn btn-orange complete-popup__controls-btn">
						OK
					</button>
				</div>
			</div>
		</ModalContainer>
	);
};
