import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const UserAccountMenu = ({ activeLanguage, changeActiveLink }) => {
	const { user } = useSelector((state) => state.global);
	const host = document.location.hostname === 'localhost' ? '//beta.jetcrypto.com' : window.jcApi;
	return (
		<div className="user-account">
			<Link
				to="/personal-page"
				className="user-icon"
				onClick={() => changeActiveLink('profile')}
				style={{
					backgroundImage: 'url(' + host + '/' + (user.image !== '' ? user.image : 'img/default.png') + ')',
					backgroundSize: 'cover',
				}}
			></Link>
			<Link to="/personal-page" className="user-name">
				{user.name ? user.name : activeLanguage.anon}
			</Link>
		</div>
	);
};
