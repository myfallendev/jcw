import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAccountMenu } from './UserAccountMenu';

export const TopMenu = ({ user, logout, activeLanguage }) => {
	const [opened, setOpened] = useState(false);
	const [activeLink, setActiveLink] = useState('');
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

	useEffect(() => {
		setActiveLink(window.location.pathname.slice(1) || 'wallets');
	}, [window.location.pathname]);

	const hideMenu = (link, isMobile = false) => {
		if (opened) {
			setOpened(false);
		}
		if (!(link === 'devices')) {
			changeActiveLink(link);
		}
		if (isMobile) {
			toggleHamburgerMenu();
		} else {
			hideHamburgerMenu();
		}
	};

	const changeActiveLink = (link) => {
		setActiveLink(link);
	};

	const toggleHamburgerMenu = () => {
		setShowHamburgerMenu((state) => !state);
		document.body.style.overflow = showHamburgerMenu ? 'auto' : 'hidden';
		document.body.style.height = showHamburgerMenu ? 'auto' : window.innerHeight + 'px';
		document.body.style.width = showHamburgerMenu ? 'auto' : '100vw';
		document.body.style.transform = !showHamburgerMenu ? 'translate3d(0, 0, 0)' : 'none';
		document.querySelector('#root').style.height = showHamburgerMenu ? 'auto' : window.innerHeight + 'px';
		document.querySelector('#root').style.overflow = showHamburgerMenu ? 'auto' : 'hidden';
		document.querySelector('.row-content').style.display = showHamburgerMenu ? 'block' : 'none';
		document.querySelector('.footer').style.display = showHamburgerMenu ? 'block' : 'none';
		document.querySelector('.personal-info').style.display = showHamburgerMenu ? 'block' : 'none';
	};

	const hideHamburgerMenu = () => {
		setShowHamburgerMenu(false);
		document.body.style.overflow = 'auto';
	};

	const dashboardEnabled = user?.dashboardEnabled;
	const exchangeEnabled = user?.exchangeEnabled;
	const isBeta = window.location.hostname.includes('beta');
	const dashboard_url =
		process.env.NODE_ENV === 'production' && !isBeta ? 'https://dashboard' : 'http://dashboard.beta';
	return (
		<div className={'navbar navbar-static-top' + (opened ? ' opened' : '')}>
			<div className="navbar-collapse" id="responsive-menu">
				<div className="nav navbar-nav" style={{ position: 'relative' }}>
					<div
						className="top-menu__hamburger-container"
						style={{
							display: showHamburgerMenu ? 'block' : 'none',
						}}
					>
						<ul>
							<li onClick={hideMenu} className="logo top-menu__hamburger-logo">
								<img alt="logo" className="logo-svg" src="/img/jc_logo_w_jetiks.svg" width="226" height="33" />
							</li>

							<li className="top-menu__hamburger-close" onClick={toggleHamburgerMenu}>
								<img className="top-menu__hamburger-close-ico" src="/img/top-menu_close.svg" alt="" />
							</li>
							<li
								onClick={() => hideMenu('wallets', true)}
								className={'top-menu__hamburger-item-container top-menu__hamburger-item-container--first'}
							>
								<Link
									className={
										'wallets top-menu__hamburger-item' + (activeLink === 'wallets' ? ' top-menu__item--active' : '')
									}
									to="/"
								>
									{activeLanguage.wallets_menu}
								</Link>
							</li>
							<li onClick={() => hideMenu('payments', true)} className={'top-menu__hamburger-item-container'}>
								<Link
									className={
										'payments top-menu__hamburger-item' + (activeLink === 'faq' ? ' top-menu__item--active' : '')
									}
									to="/payments"
								>
									{activeLanguage.payments_menu}
								</Link>
							</li>
							{exchangeEnabled && (
								<li onClick={() => hideMenu('exchange', true)} className={'top-menu__hamburger-item-container'}>
									<Link
										className={
											'exchange top-menu__hamburger-item' + (activeLink === 'exchange' ? ' top-menu__item--active' : '')
										}
										to="/exchange"
									>
										{activeLanguage.exchange_menu}
									</Link>
								</li>
							)}

							<li onClick={() => hideMenu('support', true)} className={'top-menu__hamburger-item-container'}>
								<Link
									className={
										'support top-menu__hamburger-item' + (activeLink === 'support' ? ' top-menu__item--active' : '')
									}
									to="/faq"
								>
									{activeLanguage.faq_menu}
								</Link>
							</li>

							{dashboardEnabled && (
								<li onClick={() => hideMenu('devices', true)} className={'top-menu__hamburger-item-container'}>
									<button
										onClick={() => window.open(dashboard_url + '.jetcrypto.com', '_blank')}
										className={
											'support top-menu__hamburger-item' + (activeLink === 'devices' ? ' top-menu__item--active' : '')
										}
									>
										Devices
									</button>
								</li>
							)}
						</ul>
					</div>

					<ul className="menu">
						<li onClick={hideMenu} className="logo">
							<img alt="logo" className="logo-svg" src="/img/jc_logo_w_jetiks.svg" width="226" height="33" />
						</li>
						<li onClick={() => hideMenu('wallets')} className={'top-menu__hamburger-item--hidden'}>
							<Link className={'wallets' + (activeLink === 'wallets' ? ' top-menu__item--active' : '')} to="/">
								<span className="top-menu__icon-text hidden-xs">{activeLanguage.wallets_menu}</span>
							</Link>
						</li>
						<li onClick={() => hideMenu('payments')} className={'top-menu__hamburger-item--hidden'}>
							<Link
								className={'payments' + (activeLink === 'payments' ? ' top-menu__item--active' : '')}
								to="/payments"
							>
								<span className="top-menu__icon-text hidden-xs">{activeLanguage.payments_menu}</span>
							</Link>
						</li>
						{exchangeEnabled && (
							<li onClick={() => hideMenu('exchange')} className={'top-menu__hamburger-item--hidden'}>
								<Link
									className={'exchange' + (activeLink === 'exchange' ? ' top-menu__item--active' : '')}
									to="/exchange"
								>
									<span className="top-menu__icon-text hidden-xs f1">{activeLanguage.exchange_menu}</span>
								</Link>
							</li>
						)}
						<li onClick={() => hideMenu('support')} className={'top-menu__hamburger-item--hidden'}>
							<Link className={'support' + (activeLink === 'faq' ? ' top-menu__item--active' : '')} to="/faq">
								<span className="top-menu__icon-text hidden-xs">{activeLanguage.faq_menu}</span>
							</Link>
						</li>
						{dashboardEnabled && (
							<li onClick={() => hideMenu('devices')} className={'top-menu__hamburger-item--hidden'}>
								<button
									onClick={() => window.open(dashboard_url + '.jetcrypto.com', '_blank')}
									className={'support' + (activeLink === 'devices' ? ' top-menu__item--active' : '')}
								>
									<span className="top-menu__icon-text hidden-xs">Devices</span>
								</button>
							</li>
						)}

						<li className="top-menu__hamburger" onClick={toggleHamburgerMenu}>
							<img src="/img/top-menu_hamburger.svg" alt="" />
						</li>
					</ul>
					<div className="personal-info">
						<div className="user-account-menu">
							<UserAccountMenu activeLanguage={activeLanguage} changeActiveLink={changeActiveLink} />
							<div onClick={hideMenu} className="exit">
								<button onClick={logout}>
									<img alt="logout" src="/img/logout.png" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
