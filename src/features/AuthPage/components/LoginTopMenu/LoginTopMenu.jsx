import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SocialNetworks } from 'core/components/SocialNetworks';

export const LoginTopMenu = ({ activeLanguage, showLoginWindow, showRegWindow }) => {
	const [opened, setOpened] = useState(false);
	//const [langMenuOpened, setLangMenuOpened] = useState(false);
	//const [activeFlagPos, setActiveFlagPos] = useState('');

	// useEffect(() => {
	// 	const activeFlagPos =
	// 		'-' + activeLanguage['background_pos_x'] * 40 + 'px -' + activeLanguage['background_pos_y'] * 20 + 'px';
	// 	setActiveFlagPos({ activeFlagPos });
	// }, []);

	const toggleMenu = (e) => {
		e.preventDefault();
		document.body.style.overflow = opened ? '' : 'hidden';
		setOpened((state) => !state);
	};

	const hideMenu = () => {
		document.body.style.overflow = '';
		if (opened) {
			setOpened(false);
		}
	};

	const goToLoginWindow = () => {
		document.body.style.overflow = '';
		document.getElementsByClassName('navbar')[0].classList.remove('opened');
		hideMenu();
		showLoginWindow();
	};

	const goToRegWindow = () => {
		document.body.style.overflow = '';
		document.getElementsByClassName('navbar')[0].classList.remove('opened');
		hideMenu();
		showRegWindow();
	};

	// const toggleLanguageMenu = () => {
	// 	setLangMenuOpened((state) => !state);
	// 	//this.setState({ langMenuOpened: !this.state.langMenuOpened });
	// };

	// changeLanguage(language) {
	// 	this.props.changeLanguage(language['lang']);

	// 	const activeLanguage = this.props.languages[language['lang']];
	// 	const activeFlagPos =
	// 		'-' + activeLanguage['background_pos_x'] * 40 + 'px -' + activeLanguage['background_pos_y'] * 20 + 'px';

	// 	this.setState({ langMenuOpened: !this.state.langMenuOpened, activeFlagPos: activeFlagPos });
	// }

	return (
		<div className={'navbar navbar-static-top' + (opened ? ' opened' : '')}>
			<div className="navbar-header">
				<button type="button" className="navbar-toggle" onClick={toggleMenu}>
					<span className="sr-only">Navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
			</div>
			<div className="collapse navbar-collapse" id="responsive-menu">
				<ul className="nav navbar-nav">
					<li className="navbar-nav__item navbar-nav__item--logo" onClick={hideMenu}>
						<Link className="navbar-nav__link navbar-nav__link--logo" to="/">
							<img className="logo-svg" src="/img/jc_logo.svg" width="210" height="40" alt="JetCrypto" />
						</Link>
					</li>
					<li className="navbar-nav__item" onClick={hideMenu}>
						<a
							className="navbar-nav__link"
							target="_blank"
							rel="noopener noreferrer"
							href="https://support.jetcrypto.com"
						>
							{activeLanguage.landing_page_top_menu_support}
						</a>
					</li>
					<li className="navbar-nav__item navbar-nav__item--login login">
						<button className="navbar-nav__link navbar-nav__link--login" onClick={goToLoginWindow}>
							{activeLanguage.landing_page_top_menu_login}
						</button>
					</li>
					<li className="navbar-nav__item navbar-nav__item--register register">
						<button className="navbar-nav__link navbar-nav__link--register" onClick={goToRegWindow}>
							{activeLanguage.landing_page_top_menu_register}
						</button>
					</li>
				</ul>
				<SocialNetworks />
			</div>
		</div>
	);
};
