import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetUserInfo } from 'core/globalSlice';
import { fetchChangeData, resetChangeDataState } from '../../userSettingsSlice';
import { ModalContainer } from 'core/components/ModalContainer';
import { Loader } from 'core/components/Loader';

export const ChangeGeolocation = ({ activeLanguage }) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const { user: userInfo } = useSelector((state) => state.global);
	const { dataChangeSuccess, fetching } = useSelector((state) => state.newUserSettings);

	const city = useRef();
	const country = useRef();
	const postCode = useRef();

	const changeGeolocation = () => {
		const userData = { ...userInfo };
		userData['city'] = city.current.value.charAt(0).toUpperCase() + city.current.value.slice(1);
		userData['country'] = country.current.value.charAt(0).toUpperCase() + country.current.value.slice(1);
		userData['postCode'] = postCode.current.value;
		dispatch(fetchChangeData(userData));
	};

	const toggleModal = () => {
		if (dataChangeSuccess) {
			dispatch(fetchGetUserInfo());
			dispatch(resetChangeDataState());
		}
		setShowModal((state) => !state);
	};

	const cityInputProps = [];
	const countryInputProps = [];
	const postCodeInputProps = [];
	userInfo.city ? (cityInputProps.defaultValue = userInfo.city) : (cityInputProps.defaultValue = '');
	cityInputProps.placeholder = activeLanguage.change_city_placeholder;

	userInfo.country ? (countryInputProps.defaultValue = userInfo.country) : (countryInputProps.defaultValue = '');
	countryInputProps.placeholder = activeLanguage.change_country_placeholder;

	userInfo.postCode ? (postCodeInputProps.defaultValue = userInfo.postCode) : (postCodeInputProps.defaultValue = '');
	postCodeInputProps.placeholder = activeLanguage.change_postal_code_placeholder;

	return (
		<div className="geo parameters-container">
			<div className="parameters-container__row head">
				<p className="title">{activeLanguage.geolocation_settings_title}</p>
				<p className="px16-semipale-text">{activeLanguage.geolocation_settings_description}</p>
			</div>
			<div className="parameter">
				<p className="px16-semipale-text">{activeLanguage.city_setting_text}</p>
				<p className="value">{userInfo.city ? userInfo.city : activeLanguage.empty_data_text}</p>
			</div>
			<div className="parameter">
				<p className="px16-semipale-text">{activeLanguage.country_setting_text}</p>
				<p className="value">{userInfo.country ? userInfo.country : activeLanguage.empty_data_text}</p>
			</div>
			<div className="parameter">
				<p className="px16-semipale-text">{activeLanguage.postal_code_text}</p>
				<p className="value">{userInfo.postCode ? userInfo.postCode : activeLanguage.empty_data_text}</p>
			</div>
			<div className="parameter parameter--button">
				<button className="btn btn-primary change-geo" onClick={toggleModal}>
					{activeLanguage.change_geolocation_text}
				</button>
			</div>

			{showModal && (
				<ModalContainer title={activeLanguage.change_geolocation_text} fnmodalvisible={toggleModal}>
					{dataChangeSuccess ? (
						<div className="popup-v2">
							<p className="success">{activeLanguage.change_geo_data_success_text}</p>
							<div style={{ textAlign: 'center', marginTop: '55px' }}>
								<button className="btn btn-primary btn-large" onClick={toggleModal}>
									{activeLanguage.ok_btn}
								</button>
							</div>
						</div>
					) : (
						<div className={'popup-v2 ' + (fetching ? 'blur' : '')}>
							<input maxLength="30" type="text" ref={city} {...cityInputProps} />
							<input maxLength="30" type="text" ref={country} {...countryInputProps} />
							<input maxLength="30" type="text" ref={postCode} {...postCodeInputProps} />
							<div style={{ textAlign: 'center', marginTop: '20px' }}>
								<button className="btn btn-primary btn-large" onClick={changeGeolocation}>
									{activeLanguage.submit_btn}
								</button>
							</div>
							<button className="close-popup" onClick={toggleModal}></button>
							{fetching && <Loader />}
						</div>
					)}
				</ModalContainer>
			)}
		</div>
	);
};
