import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';

import { MainRouter } from './MainRouter';

import { TopMenu } from './components/TopMenu';
import { Footer } from './components/Footer';
import { CookiePopup } from './components/CookiePopup';
import { GlobalLoader } from './components/GlobalLoader';
import { PasswordChange } from './components/PasswordChange';
import { VerifyEmailModal } from './components/VerifyEmailModal';
import { SetEmailFormModal } from './components/SetEmailFormModal';
import { AppInfoPopup } from './components/AppInfoPopup';
import { AuthPage } from 'features/AuthPage';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
	fetchGetUserInfo,
	fetchHeartbeat,
	fetchLogout,
	fetchSetEmail,
	resetBuildNumber,
	resetErrors,
	resetSuccessEmailVerify,
	setEmailVerifyCode,
} from './globalSlice';

import { fetchUserSettings, fetchGetCurrencyCode, USER_SETTINGS_ID } from 'features/PersonalPage/userSettingsSlice';
import { fetchCurrencyCodes } from 'features/currencyCodesSlice';
import { fetchCurrencyRatesForFiatCurrency } from 'features/currencyRatesSlice';
import { fetchGetAccounts } from 'features/accountsSlice';

function getCookie(name) {
	let matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
	options = options || {};
	let expires = options.expires;
	if (typeof expires === 'number' && expires) {
		let d = new Date();
		d.setTime(+d.getTime() + expires * 86400000); //24 * 60 * 60 * 1000
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}
	value = encodeURIComponent(value);
	let updatedCookie = name + '=' + value;

	for (let propName in options) {
		updatedCookie += '; ' + propName;
		let propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
}

export const App = () => {
	const [tab, setTab] = useState('visible');
	const [globalLoader, setGlobalLoader] = useState(true);
	const [jcCookie, setJcCookie] = useState();
	const [showEmailVerifyModal, setShowEmailVerifyModal] = useState(false);
	const [showSetEmailPopup, setShowSetEmailPopup] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	const {
		user,
		fetching,
		errors,
		logged_in,
		emailVerifyCode,
		emailIsSet,
		successEmailVerify,
		buildNumber,
		serverErrorText,
	} = useSelector((state) => state.global);
	const { settings, userCurrency } = useSelector((state) => state.newUserSettings);
	const { languages, activeLanguage } = useSelector((state) => state.language);

	const currentLanguage = languages[activeLanguage];
	const { email, phone, emailVerified, passwordExpired } = user;
	const needAddEmail = phone && !email && !emailVerified;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (logged_in) {
			dispatch(fetchGetUserInfo());
			dispatch(fetchUserSettings());
			dispatch(fetchGetAccounts());
			dispatch(fetchCurrencyCodes());
		}
		if (!logged_in) {
			console.log('heartbeat is off');
			clearInterval(window.heartbeat);
		}
	}, [logged_in, dispatch]);

	useEffect(() => {
		if (user) {
			setGlobalLoader(false);
		}
	}, [user]);

	useEffect(() => {
		if (settings) dispatch(fetchGetCurrencyCode(settings[USER_SETTINGS_ID.currency]));
	}, [settings, dispatch]);

	useEffect(() => {
		if (userCurrency) {
			dispatch(fetchCurrencyRatesForFiatCurrency(userCurrency.id || 840));
		}
	}, [userCurrency, dispatch]);

	useEffect(() => {
		if (!emailVerified) {
			if (needAddEmail) {
				setShowSetEmailPopup(true);
			}
			if (email && !showEmailVerifyModal) {
				setShowEmailVerifyModal(true);
			}
		}
	}, [emailVerified, needAddEmail]);

	useEffect(() => {
		if (logged_in) {
			clearInterval(window.heartbeat);
			console.log('heartbeat is on');
			if (showEmailVerifyModal) return;
			window.heartbeat = setInterval(() => {
				dispatch(fetchHeartbeat());
				if (!emailVerified) {
					if (needAddEmail) {
						setShowSetEmailPopup(true);
					}
					if (email && !showEmailVerifyModal) {
						setShowEmailVerifyModal(true);
					}
				}
			}, 90000);
		}
		//check if user-agent has jc_cookie
		setJcCookie({ jcCookie: !!getCookie('jc_cookie') });

		document.addEventListener('visibilitychange', handleVisibilityChange, false);
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange, false);
	}, [email, emailVerified, logged_in, needAddEmail, showEmailVerifyModal, dispatch]);

	useEffect(() => {
		if (emailVerifyCode) {
			setShowEmailVerifyModal(true);
		}
	}, [emailVerifyCode]);

	useEffect(() => {
		const verifyPath = document.location.pathname;
		if (verifyPath.indexOf('/verify/') !== -1) {
			const verifyCode = verifyPath.split('/')[2];
			if (verifyCode && verifyCode.length) {
				dispatch(setEmailVerifyCode(verifyCode));
			}
		}
	}, [dispatch]);

	useEffect(() => {
		/* make some server request after tab is in visible state after hidden state,
		if server cookie is no longer valid axios would dispatch logout action */
		if (logged_in && tab === 'visible') {
			dispatch(fetchHeartbeat());
		}
	}, [tab, logged_in, dispatch]);

	const handleVisibilityChange = () => {
		if (document.hidden) {
			setTab('hidden');
		} else {
			setTab('visible');
		}
	};

	const connectSignalR = () => {
		const baseHost = window.location.origin;

		const hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(`${baseHost}/api/signalr/devices`)
			.withAutomaticReconnect()
			.configureLogging(signalR.LogLevel.Information)
			.build();

		hubConnection.on('DeviceUpdate', (msg) => {
			var p = JSON.parse(msg);
			console.log(`Device updated! Device ID: ${p.DeviceId}; Online: ${p.Online}`);
		});

		hubConnection.on('Error', (msg) => {
			console.log(`Error occured! ${msg}`);
		});

		hubConnection.on('Approved', (msg) => {
			console.log(`Approved occured! ${msg}`);
		});

		// Starts the SignalR connection
		hubConnection.start();
	};

	const setCookiePopup = () => {
		setJcCookie({ jcCookie: true });
		setCookie('jc_cookie', true, { expires: 30 });
	};

	const reloadPage = () => {
		history.push('/');
		document.location.reload();
	};

	const handleEmailVerifyModalClose = () => {
		setShowEmailVerifyModal(false);
		if (successEmailVerify) {
			dispatch(fetchGetUserInfo());
			dispatch(resetSuccessEmailVerify());
		}
	};

	const handleSetEmailPopupClose = () => {
		setShowSetEmailPopup(false);
		if (emailIsSet) {
			dispatch(fetchGetUserInfo());
		}
	};

	const handleSetEmailSubmit = (email) => {
		dispatch(fetchSetEmail(email));
	};

	if (globalLoader) {
		return <GlobalLoader />;
	}

	if (user && logged_in) {
		if (passwordExpired) return <PasswordChange />;

		return (
			<div>
				{!jcCookie && <CookiePopup language={languages[activeLanguage]} callback={setCookiePopup} />}
				<div className="container-fluid main-container">
					<TopMenu user={user} activeLanguage={currentLanguage} logout={() => dispatch(fetchLogout())} />
					{showEmailVerifyModal && (
						<VerifyEmailModal
							emailVerified={emailVerified}
							emailVerifyCode={emailVerifyCode}
							successEmailVerify={successEmailVerify}
							serverErrorText={serverErrorText}
							userEmail={email}
							fetching={fetching}
							closeModal={handleEmailVerifyModalClose}
							openModal={() => setShowEmailVerifyModal(true)}
							hint={'VerifyEmail'}
						/>
					)}
					{showSetEmailPopup && (
						<SetEmailFormModal
							fetchingUserInfo={fetching}
							errors={errors}
							emailIsSet={emailIsSet}
							resetErrors={resetErrors}
							hideSetEmailPopup={handleSetEmailPopupClose}
							setEmailSubmit={handleSetEmailSubmit}
						/>
					)}
					<div className="row row-content">
						<MainRouter />
						<AppInfoPopup
							buildNr={buildNumber}
							isTestEnv={document.location.hostname.includes('localhost')}
							currentLanguage={currentLanguage}
							onClose={resetBuildNumber}
							onReload={reloadPage}
						/>
					</div>
					<Footer />
				</div>
			</div>
		);
	}

	return (
		<>
			<AuthPage />
			{!jcCookie && <CookiePopup language={activeLanguage} callback={setCookiePopup} />}
		</>
	);
};
