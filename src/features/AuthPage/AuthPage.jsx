import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { scrollToY } from 'utils/goTopAnimate';
import { resetRegistrationResult } from 'core/globalSlice';

import { Footer } from 'core/components/Footer';
import { Loader } from 'core/components/Loader';
import { ModalContainer } from 'core/components/ModalContainer';

import { BackgroundFirstSection } from './components/BackgroundFirstSection';
import { FreeOfferAndStatisticsSection } from './components/FreeOfferAndStatisticsSection';
import { ApplicationDescriptionSection } from './components/ApplicationDescriptionSection';
import { ServicesSection } from './components/ServicesSection';

import { LoginTopMenu } from './components/LoginTopMenu';
import { LoginWindow } from './components/LoginWindow';
import { RegWindow } from './components/RegWindow';
import { PasswordRestoreModals } from './components/PasswordRestoreModals';

export const AuthPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isActiveWindow, setIsActiveWindow] = useState('login');
	const [showRestorePasswordWindow, setShowRestorePasswordWindow] = useState(false);
	const { changePasswordSuccess } = useSelector((state) => state.newUserSettings);
	const { fetching, logged_in, regSuccess } = useSelector((state) => state.global);
	const { activeLanguage: activeLanguageCode, languages } = useSelector((state) => state.language);
	const activeLanguage = languages[activeLanguageCode];

	const toggleLoginWindow = (bool) => {
		setIsActiveWindow('login');
		if (bool) scrollToLoginAndRegistrationForms();
	};

	useEffect(() => {
		const referralLinkId = history.location.hash.split('=')[1];
		if (referralLinkId) {
			localStorage.setItem('referralLinkId', referralLinkId);
		}
		history.push('/');
	}, []);

	useEffect(() => {
		if (changePasswordSuccess) {
			toggleLoginWindow();
		}
	}, [changePasswordSuccess, toggleLoginWindow, dispatch]);

	useEffect(() => {
		// user logged out -> scroll to login window
		if (logged_in === false) {
			document.getElementById('section-5').scrollIntoView();
		}
	}, [logged_in]);

	useEffect(() => {
		const LOGIN_WINDOW_HEIGHT = !!document.querySelector('#recaptcha-container') ? 618 : 515;
		const REG_WINDOW_HEIGHT = !!document.querySelector('#invitation-code-field') ? 622 : 553;

		const regWindow = document.querySelector('.reg-window');

		if (regWindow.style.height) {
			const bodyWidth = document.body.offsetWidth;

			if (bodyWidth <= 560) {
				regWindow.style = '';
			} else {
				const autoHeight = isActiveWindow === 'login' ? LOGIN_WINDOW_HEIGHT : REG_WINDOW_HEIGHT;

				regWindow.style['overflow'] = 'hidden';
				regWindow.animate({ height: autoHeight }, 500);

				setTimeout(() => {
					regWindow.height('auto');
					regWindow.style['overflow'] = 'visible';
				}, 600);
			}
		}
	}, [isActiveWindow]);

	const scrollToLoginAndRegistrationForms = () => {
		const isMobileWidth = document.body.offsetWidth < 450;
		const regSection = document.querySelector('.registration.section');
		const regForm = document.querySelector('.reg-container');

		const offsetTop = regSection.offsetTop + (isMobileWidth ? regForm.offsetTop - 20 : 0);
		scrollToY(offsetTop, 1500, 'easeInOutQuint');
	};

	const scrollToFeaturesScreen = () => {
		const featuresSection = document.querySelector('.section.services-section');

		if (!featuresSection) return;

		scrollToY(featuresSection.offsetTop, 1500, 'easeInOutQuint');
	};

	const toggleRegWindow = (bool) => {
		setIsActiveWindow('reg');
		if (bool) scrollToLoginAndRegistrationForms();
	};

	const closeRegPopupResult = () => {
		dispatch(resetRegistrationResult());
		toggleLoginWindow();
	};

	return (
		<div className="login-page row _hiddenArea">
			<LoginTopMenu
				showLoginWindow={() => toggleLoginWindow(true)}
				showRegWindow={() => toggleRegWindow(true)}
				activeLanguage={activeLanguage}
				languages={languages}
				activeLanguageCode={activeLanguageCode}
			/>

			<BackgroundFirstSection
				showLoginWindow={() => toggleLoginWindow(true)}
				showRegWindow={() => toggleRegWindow(true)}
				showFeaturesWindow={scrollToFeaturesScreen}
			/>
			<FreeOfferAndStatisticsSection />
			<ApplicationDescriptionSection onActionButtonclick={() => toggleRegWindow(true)} />
			<ServicesSection />
			<div className="registration section" id="section-5">
				<div id="registration-section-container" className={'row ' + (fetching ? 'blur' : '')}>
					<PasswordRestoreModals
						activeLanguage={activeLanguage}
						showRestorePasswordWindow={showRestorePasswordWindow}
						setShowRestorePasswordWindow={setShowRestorePasswordWindow}
					/>
					<div className="registration-section__description description">
						<h1 className="registration-section__title">{activeLanguage.register_title}</h1>
						<p className="registration-section__subtitle">{activeLanguage.register_subtitle}</p>
					</div>
					<div className="reg-container">
						<div className="reg-window">
							<div className="reg-window__switch-windows row">
								<button
									className={
										'reg-window__switch-button reg-window__switch-button--login login-btn ' +
										(isActiveWindow === 'login' ? 'active' : '')
									}
									onClick={() => toggleLoginWindow(false)}
								>
									{activeLanguage.login_btn_text}
								</button>
								<button
									className={
										'reg-window__switch-button reg-window__switch-button--reg reg-btn ' +
										(isActiveWindow === 'reg' ? 'active' : '')
									}
									onClick={() => toggleRegWindow(false)}
								>
									{activeLanguage.register_btn_text}
								</button>
							</div>
							{isActiveWindow === 'login' && (
								<LoginWindow
									onRestorePasswordClick={setShowRestorePasswordWindow}
									showRestorePasswordWindow={showRestorePasswordWindow}
									activeLanguage={activeLanguage}
								/>
							)}
							{isActiveWindow === 'reg' && (
								<RegWindow
									onRestorePasswordClick={setShowRestorePasswordWindow}
									showRestorePasswordWindow={showRestorePasswordWindow}
									activeLanguage={activeLanguage}
								/>
							)}
						</div>
					</div>
				</div>
				{regSuccess && (
					<ModalContainer
						fnmodalvisible={closeRegPopupResult}
						additionalClass={'reg-complete-popup'}
						title={activeLanguage.registration_success_message_title}
					>
						<p className="reg-complete-popup__text">{activeLanguage.registration_success_message_description}</p>
						<button
							className="btn btn-orange reg-complete-popup__close-button close-reg-popup"
							onClick={closeRegPopupResult}
						>
							{activeLanguage.ok_btn}
						</button>
					</ModalContainer>
				)}
				{fetching && <Loader />}
			</div>
			<Footer />
		</div>
	);
};
