//import { bindActionCreators } from 'redux';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { scrollToY } from 'utils/goTopAnimate';
//import * as userActions from 'actions/UserActions';

import { SocialNetworks } from '../SocialNetworks';
import { ModalContainer } from '../ModalContainer';
import { Fee } from './Fee.jsx';
import moment from 'moment';

export const Footer = () => {
	const [showFeeModal, setShowFeeModal] = useState(false);
	const { logged_in } = useSelector((state) => state.global);

	const goTop = () => {
		scrollToY(0, 1500, 'easeInOutQuint');
	};

	const showFeeContainer = () => {
		setShowFeeModal(true);
	};

	const closeFeeContainer = () => {
		setShowFeeModal(false);
	};

	const _year = moment().format('YYYY');

	return (
		<div className="footer">
			{showFeeModal && (
				<ModalContainer title={'JetCrypto Fee Schedule'} fnmodalvisible={closeFeeContainer}>
					<Fee />
				</ModalContainer>
			)}

			<div className="footer-top">
				<div className="footer-top__item footer-top__item--column">
					<a
						className="footer-top__support-button"
						target="_blank"
						rel="noopener noreferrer"
						href="https://support.jetcrypto.com"
					>
						Support
					</a>
					<br />
					{logged_in && (
						<Link className="footer-top__support-button" to="/trovemat-docs">
							Trovemat Docs
						</Link>
					)}
					<br />
					{logged_in && (
						<button className="footer-top__support-button" onClick={showFeeContainer}>
							Fees
						</button>
					)}
				</div>
				<div className="footer-top__item">
					<SocialNetworks />
				</div>
				<div className="footer-top__item">
					<button className="btn btn-orange go-top-btn" onClick={goTop}></button>
				</div>
			</div>
			<div className="footer__terms-container">
				<Link className="footer__terms-button" target="_blank" to="./docs/JetCrypto_Terms_of_Use.pdf">
					Terms and Conditions
				</Link>
				<span> | </span>
				<Link className="footer__privacy-button" target="_blank" to="./docs/JetCrypto_Privacy_Policy.pdf">
					Privacy Policy
				</Link>
			</div>
			<div className="footer-bottom">
				<div className="clearfix">
					<p className="copyright">© {_year}, JetCrypto</p>
					<div className="developed-by">
						<span>Developed by:</span>
						<Link to="/">JetCrypto</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
