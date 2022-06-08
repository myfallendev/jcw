import React from 'react';
import { connect } from 'react-redux';

import { ModalContainer } from '../ModalContainer';

const ModalPDFComponent = ({ title, activeLanguage, width, height, containerId, onCloseClick, pdfLink }) => {
	let arrNoPDF = activeLanguage.browser_doesnt_support_PDF;

	return (
		<ModalContainer fnmodalvisible={onCloseClick} additionalClass="pdf-modal" title={title}>
			<div className="pdf-modal-container">
				<object data={pdfLink} type="application/pdf" width={width} height={height}>
					<embed src={pdfLink} type="application/pdf" />
					<p>
						{arrNoPDF[0]}
						<a href={pdfLink} target="_blank" rel="noopener noreferrer">
							{arrNoPDF[1]}
						</a>
						{arrNoPDF[2]}
					</p>
				</object>
				<button
					className="btn btn-orange pdf-modal-container__link"
					href={pdfLink}
					target="_blank"
					rel="noopener noreferrer"
				>
					{activeLanguage.download}
				</button>
			</div>
		</ModalContainer>
	);
};

function mapStateToProps(state) {
	return {
		activeLanguage: state.language.languages[state.language.activeLanguage],
	};
}

ModalPDFComponent.defaultProps = {
	title: 'PDF',
	showPopup: true,
	width: '100%',
	height: '100%',
	containerId: 'pdf-viewer',
};

export const ModalPDF = connect(mapStateToProps)(ModalPDFComponent);
