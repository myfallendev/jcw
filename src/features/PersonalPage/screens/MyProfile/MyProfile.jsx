import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-calendar/assets/index.css';

import { fetchGetUserInfo } from 'core/globalSlice';
import { fetchChangeData, resetChangeDataState } from '../../userSettingsSlice';
import { CountryInput } from './';
import { ChangeGeolocation } from './';
import { VerifiedBadge } from '../../components/VerifiedBadge';

import { ModalContainer } from 'core/components/ModalContainer';
import { Loader } from 'core/components/Loader';

export const MyProfile = () => {
	const dispatch = useDispatch();
	const [countryOfBirth, setCountryOfBirth] = useState(null);
	const [date, setDate] = useState(null);
	const [showChangePersonalDataModal, setShowChangePersonalDataModal] = useState(false);
	const { user: userInfo } = useSelector((state) => state.global);
	const { languages, activeLanguage: currLang } = useSelector((state) => state.language);
	const { fetching, errors, dataChangeSuccess } = useSelector((state) => state.newUserSettings);
	const activeLanguage = languages[currLang];

	const name = useRef();
	const surname = useRef();
	const dateRef = useRef();
	const sourceOfFunds = useRef();

	useEffect(() => {
		setDate(userInfo.birthDate && moment(userInfo.birthDate).format('LL'));
	}, []);

	useEffect(() => {
		if (userInfo && userInfo.birthDate) {
			setDate(moment(userInfo.birthDate).format('LL'));
		}
	}, [userInfo]);

	const closeChangePersonalDataModal = () => {
		if (dataChangeSuccess) {
			dispatch(fetchGetUserInfo());
			dispatch(resetChangeDataState());
		}
		setShowChangePersonalDataModal(false);
	};

	const changePersonalData = () => {
		const userData = { ...userInfo };
		userData['name'] = name.current.value.substr(0, 60);
		userData['surname'] = surname.current.value.substr(0, 60);
		if (date) {
			userData['birthDate'] = date;
		}
		if (countryOfBirth) {
			userData['countryOfBirth'] = countryOfBirth;
		}
		userData['sourceOfFunds'] = sourceOfFunds.current.value;
		dispatch(fetchChangeData(userData));
	};

	const handleCountrySelect = (name) => {
		setCountryOfBirth(name);
	};

	const handleChangeDatePicker = (date) => {
		if (date) setDate(moment(date).format('LL'));
	};

	const calendar = <Calendar disabledDate={(date) => date > new Date()} style={{ zIndex: 1000 }} />;

	return (
		<div className="personal-settings">
			<div className="parameters-container phone-and-email">
				<div className="parameters-container__row head">
					<p className="title">{activeLanguage.phone_and_email_settings_title}</p>
					<p className="px16-semipale-text">{activeLanguage.phone_and_email_settings_description}</p>
				</div>
				<div className="parameter">
					<p className="px16-semipale-text">
						{activeLanguage.phone_setting_text}
						<VerifiedBadge />
					</p>
					<p className="value">{userInfo.phone ? userInfo.phone : activeLanguage.empty_data_text}</p>
				</div>
				<div className="parameter">
					<p className="px16-semipale-text">
						{activeLanguage.email_setting_text}
						{userInfo.emailVerified ? <VerifiedBadge /> : ''}
					</p>
					<p className="value">{userInfo.email ? userInfo.email : activeLanguage.empty_data_text}</p>
				</div>
			</div>
			<div className="parameters-container fullName">
				<div className="parameters-container__row head">
					<p className="title">{activeLanguage.personal_data_settings_title}</p>
					<p className="px16-semipale-text">{activeLanguage.personal_data_description_title}</p>
				</div>
				<div className="parameter">
					<p className="px16-semipale-text">{activeLanguage.first_name_setting_text}</p>
					<p className="value">{userInfo.name ? userInfo.name : activeLanguage.empty_data_text}</p>
				</div>
				<div className="parameter">
					<p className="px16-semipale-text">{activeLanguage.second_name_setting_text}</p>
					<p className="value">{userInfo.surname ? userInfo.surname : activeLanguage.empty_data_text}</p>
				</div>
				<div className="parameter">
					<p className="px16-semipale-text">{activeLanguage.birth_date_setting_text}</p>
					<p className="value">
						{userInfo.birthDate ? moment(userInfo.birthDate).format('LL') : activeLanguage.empty_data_text}
					</p>
				</div>
				<div className="parameter">
					<p className="px16-semipale-text">{activeLanguage.country_of_birth}</p>
					<p className="value">{userInfo.countryOfBirth ? userInfo.countryOfBirth : activeLanguage.empty_data_text}</p>
				</div>
				<div className="parameter">
					<p className="px16-semipale-text">{activeLanguage.source_of_funds}</p>
					<p className="value">{userInfo.sourceOfFunds ? userInfo.sourceOfFunds : activeLanguage.empty_data_text}</p>
				</div>

				<div className="parameter parameter--button">
					<button className="btn btn-primary change-personal-data" onClick={() => setShowChangePersonalDataModal(true)}>
						{activeLanguage.change_personal_data_text}
					</button>
				</div>
				{showChangePersonalDataModal && (
					<ModalContainer
						title={activeLanguage.change_personal_data_text}
						fnmodalvisible={closeChangePersonalDataModal}
					>
						{
							//TODO: add error messages
							dataChangeSuccess ? (
								<div className="popup-v2">
									<p className="success">{activeLanguage.change_personal_data_success_text}</p>
									<div
										style={{
											textAlign: 'center',
											marginTop: '55px',
										}}
									>
										<button className="btn btn-primary btn-large" onClick={closeChangePersonalDataModal}>
											{activeLanguage.ok_btn}
										</button>
									</div>
								</div>
							) : (
								<div className={'popup-v2 ' + (fetching ? 'blur' : '')}>
									<input
										maxLength="30"
										type="text"
										ref={name}
										defaultValue={userInfo.name || ''}
										placeholder={activeLanguage.change_name_placeholder}
									/>
									<input
										maxLength="30"
										type="text"
										ref={surname}
										defaultValue={userInfo.surname || ''}
										placeholder={activeLanguage.change_second_name_placeholder}
									/>
									<DatePicker animation="slide-up" calendar={calendar} ref={dateRef} onChange={handleChangeDatePicker}>
										{({ value }) => (
											<span tabIndex="0">
												<input
													placeholder={date || moment(new Date(0)).format('LL')}
													readOnly="readOnly"
													type="text"
													tabIndex="-1"
													className=""
													value={(value && value.format('LL')) || ''}
												/>
											</span>
										)}
									</DatePicker>
									<CountryInput onCountrySelect={handleCountrySelect} activeLanguage={activeLanguage} />
									<input
										maxLength="30"
										type="text"
										ref={sourceOfFunds}
										placeholder={activeLanguage.change_source_of_funds}
										defaultValue={userInfo.sourceOfFunds || ''}
									/>

									<div style={{ textAlign: 'center', marginTop: '20px' }}>
										<button className="btn btn-primary btn-large" onClick={changePersonalData}>
											{activeLanguage.submit_btn}
										</button>
									</div>
									{fetching && <Loader />}
								</div>
							)
						}
					</ModalContainer>
				)}
			</div>
			<ChangeGeolocation activeLanguage={activeLanguage} />
		</div>
	);
};
