import React, { useState } from 'react';
import { ModalPDF } from '../ModalPDF';
import './cookiespopup.css';

export const CookiePopup = ({ callback, language }) => {
	const [pdfModal, setPdfModal] = useState({ show: false, title: '', link: '' });

	const closeCookiePopup = (event) => {
		event.stopPropagation();
		callback();
	};

	const handleTermsFileLinkClick = (e) => {
		e.preventDefault();
		setPdfModal({ show: true, title: e.target.getAttribute('title'), link: e.target.href });
	};

	const handlePdfModalCloseClick = () => {
		setPdfModal({ ...pdfModal, show: false });
	};

	return (
		<div>
			{pdfModal.show && (
				<ModalPDF
					onCloseClick={handlePdfModalCloseClick}
					title={pdfModal.title}
					pdfLink={pdfModal.link}
				/>
			)}

			<div className="cookies-popup__container">
				<div className="cookies-popup__wrapper">
					<div className="cookies-popup__text">
						<h3 className="cookies-popup__header">COOKIES</h3>
						{language.cookie_popup_text}
						<a
							onClick={handleTermsFileLinkClick}
							title={language.terms_and_conditions}
							href="./docs/JetCrypto_Terms_of_Use.pdf"
							style={{ whiteSpace: 'nowrap' }}
						>
							{language.cookie_popup_link_text}
						</a>
					</div>
					<div className="cookies-popup__controls">
						<button className="btn btn-primary btn-big-fill-green cookies-popup__agree-btn" onClick={closeCookiePopup}>
							{language.cookie_popup_button_text}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
