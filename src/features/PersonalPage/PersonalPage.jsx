import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { fetchGetUserInfo } from 'core/globalSlice';
import { fetchUploadAvatar, fetchUpdateUserCurrency } from './userSettingsSlice';
import { fetchCurrencyRatesForFiatCurrency } from 'features/currencyRatesSlice';

import { Loader } from 'core/components/Loader';

import { MyProfile } from './screens/MyProfile';
import { MySecurity } from './screens/MySecurity';
import { MySubscriptions } from './screens/MySubscriptions';
import { KYC } from './screens/KYC';

const PersonalPageWR = ({ match, location }) => {
	const dispatch = useDispatch();
	const [currencyListOpened, setCurrencyListOpened] = useState(false);
	const { languages, activeLanguage: langCode } = useSelector((state) => state.language);
	const { fetching: fetchingUserInfo, user } = useSelector((state) => state.global);
	const { fetchingUploadAvatar, fetchingUpdateUserSettings, avatarChanged, userCurrency } = useSelector(
		(state) => state.newUserSettings
	);
	const inputElement = useRef();
	const activeLanguage = languages[langCode];

	const fetching = fetchingUserInfo || fetchingUploadAvatar || fetchingUpdateUserSettings;

	useEffect(() => {
		if (avatarChanged) dispatch(fetchGetUserInfo());
	}, [avatarChanged]);

	const uploadFile = () => {
		inputElement.current.click();
	};

	const handleFileUpload = (event) => {
		const data = new FormData();
		data.append('image', event.target.files[0]);
		dispatch(fetchUploadAvatar(data));
	};

	const changeCurrency = (currencyId) => {
		setCurrencyListOpened((state) => !state);
		dispatch(fetchCurrencyRatesForFiatCurrency(currencyId));
		dispatch(fetchUpdateUserCurrency(currencyId));
	};

	const imageUrl = user.image;
	const currencies = [
		{ code: 840, name: 'USD' },
		{ code: 978, name: 'EUR' },
	];
	const { path, url } = match;

	const chooseCurrencyBtnStyle = fetching ? { pointerEvents: 'none', filter: 'blur(1px)' } : {};
	const host = document.location.hostname === 'localhost' ? '//beta.jetcrypto.com' : window.jcApi;

	return (
		<div className="content personal-page">
			<div className="content-header personal-page-header">
				<div className="blur-bg">
					<div
						className={fetching ? 'blur' : ''}
						style={{ backgroundImage: 'url(' + host + '/' + imageUrl + ')' }}
					></div>
				</div>
				<div className="personal-page-header__content">
					{fetching ? (
						<Loader />
					) : (
						<div className="personal-page-header__image-link" onClick={uploadFile}>
							<img src={host + '/' + imageUrl} width="100" hight="100" alt="" />
						</div>
					)}
					<input type="file" onChange={handleFileUpload} ref={inputElement} />
					<div className="personal-page-header__title-wrapper">
						<h1 className="personal-page-header__title">
							{user.name ? user.name + ' ' + (user.surname ? user.surname : '') : activeLanguage.anon}
						</h1>
						<p className="personal-page-header__verification-status">
							{activeLanguage.verification_level[user.verificationLevel]}
						</p>
					</div>
				</div>
			</div>

			<div className="navigation-menu navigation-internal">
				<div>
					<ul className="navigation-menu__tabs">
						<li className="navigation-menu__tab">
							<Link to={`${url}/personal-data`}>
								<button className={location.pathname.includes('personal-data') ? 'active' : ''}>My Profile</button>
							</Link>
						</li>
						<li className="navigation-menu__tab">
							<Link to={`${url}/security`}>
								<button className={location.pathname.includes('security') ? 'active' : ''}>Security</button>
							</Link>
						</li>
						<li className="navigation-menu__tab">
							<Link to={`${url}/subscriptions`}>
								<button className={location.pathname.includes('subscriptions') ? 'active' : ''}>Subscriptions</button>
							</Link>
						</li>
						<li className="navigation-menu__tab">
							<Link to={`${url}/kyc`}>
								<button className={location.pathname.includes('kyc') ? 'active' : ''}>KYC</button>
							</Link>
						</li>

						{userCurrency !== null && (
							<ul style={chooseCurrencyBtnStyle} className={'currencies ' + (currencyListOpened ? 'opened' : '')}>
								<li onClick={() => setCurrencyListOpened((state) => !state)}>{userCurrency?.isoName}</li>
								{currencies.map((curr, index) =>
									curr.code === userCurrency.id ? (
										''
									) : (
										<li key={index} onClick={() => changeCurrency(curr.code)}>
											{curr.name}
										</li>
									)
								)}
							</ul>
						)}
					</ul>
					<div style={{ clear: 'both' }}></div>
				</div>
			</div>

			<Switch>
				<Route exact path={`${path}/`}>
					<Redirect to={`${path}/personal-data`} />
				</Route>
				<Route path={`${path}/personal-data`}>
					<MyProfile userInfo={user} />
				</Route>
				<Route path={`${path}/security`}>
					<MySecurity userInfo={user} activeLanguage={activeLanguage} />
				</Route>
				<Route path={`${path}/subscriptions`}>
					<MySubscriptions activeLanguage={activeLanguage} />
				</Route>
				<Route path={`${path}/kyc`} component={KYC} />
			</Switch>
		</div>
	);
};

export const PersonalPage = withRouter(PersonalPageWR);
