import React from 'react';

export const AppInfoPopup = ({ buildNr, isTestEnv, onReload, onClose, currentLanguage }) => {
	if (buildNr !== window.buildNumber && buildNr !== null && !isTestEnv) {
		return (
			<div className="app-info__popup">
				<div className="app-info__close" onClick={onClose}></div>
				{currentLanguage.app_version_reload_text}
				<div>
					<button className="btn btn-orange app-info__btn-refresh" onClick={onReload}>
						{currentLanguage.app_version_reload_btn_text}
					</button>
				</div>
			</div>
		);
	}
	return null;
};
