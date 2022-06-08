import React from 'react';
import { connect } from 'react-redux';

const ApplicationDescriptionSectionComponent = ({ activeLanguage, onActionButtonclick }) => (
	<div className="application-description section" id="section-3">
		<div className="application-description__top-row row">
			<h2 className="application-description__title">{activeLanguage.interface_title}</h2>
			<p className="application-description__subtitle">{activeLanguage.interface_description}</p>
			<button className="btn btn-orange register" onClick={onActionButtonclick}>
				{activeLanguage.register_active_btn_text}
			</button>
		</div>
		<div className="application-description__image-container apple-devices-img">
			<img className="application-description__image" alt="" src="/img/devices.png" width="1079" height="695" />
		</div>
	</div>
);

function mapStateToProps(state) {
	return {
		activeLanguage: state.language.languages[state.language.activeLanguage],
	};
}

export const ApplicationDescriptionSection = connect(mapStateToProps)(ApplicationDescriptionSectionComponent);
