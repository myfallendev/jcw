import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContainer } from 'core/components/ModalContainer';
import { Loader } from 'core/components/Loader';
import {
	fetchGetNotificationSettings,
	fetchChangeNotificationSettings,
	setNotificationSystemEvents,
	setNotificationWithdrawals,
	closeChangeNotificationSettingsPopups,
} from '../../userSettingsSlice';

export const MySubscriptions = ({ activeLanguage }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.global);
	const {
		fetchingNotificationSettings,
		//errors,
		serverError,
		notificationSettingsSystemEvents,
		notificationSettingsWithdrawals,
		changeNotificationSettingsSuccess,
	} = useSelector((state) => state.newUserSettings);

	useEffect(() => {
		dispatch(fetchGetNotificationSettings());
	}, []);

	const handleSetSubscriptionsWithdrawals = () => {
		dispatch(setNotificationWithdrawals(!notificationSettingsWithdrawals));
	};

	const handleSetSubscriptionsSystemEvents = () => {
		dispatch(setNotificationSystemEvents(!notificationSettingsSystemEvents));
	};

	const handlePutSubscriptions = () => {
		dispatch(
			fetchChangeNotificationSettings(user.id, notificationSettingsWithdrawals, notificationSettingsSystemEvents)
		);
	};

	return (
		<div className="personal-settings">
			<div className="subscriptions parameters-container" style={{ position: 'relative' }}>
				{fetchingNotificationSettings && <Loader />}
				<div className={'subscriptions__wrapper' + (fetchingNotificationSettings ? ' blur' : '')}>
					<div className="parameter">
						<div className="jc-checkbox">
							<input
								type="checkbox"
								onChange={handleSetSubscriptionsSystemEvents}
								checked={notificationSettingsSystemEvents ? 'checked' : ''}
							/>
							<label></label>
							<div className="jc-checkbox__description">{activeLanguage.receive_newsletter_emails}</div>
						</div>
					</div>
					<div className="parameter">
						<div className="jc-checkbox">
							<input
								type="checkbox"
								onChange={handleSetSubscriptionsWithdrawals}
								checked={notificationSettingsWithdrawals ? 'active' : ''}
							/>
							<label></label>
							<div className="jc-checkbox__description">
								{activeLanguage.receive_email_notifications_about_withdrawals}
							</div>
						</div>
					</div>
					<div className="parameter parameter--button">
						<button className="btn btn-primary" onClick={handlePutSubscriptions}>
							{activeLanguage.user_settings_subscriptions_apply_btn}
						</button>
					</div>
					{changeNotificationSettingsSuccess && (
						<ModalContainer
							title={activeLanguage.user_settings_subscriptions_change}
							fnmodalvisible={() => dispatch(closeChangeNotificationSettingsPopups())}
						>
							<div className="complete-popup">
								<div style={{ textAlign: 'center', margin: '15px 0' }}>
									<img style={{ width: '100px' }} src="/img/modal-ico/modal-success-ico.png" alt="" />
								</div>
								<div className="complete-popup__title">{activeLanguage.user_settings_subscriptions_changed}</div>
								<div className="complete-popup__controls">
									<button
										onClick={() => dispatch(closeChangeNotificationSettingsPopups())}
										className="btn btn-orange complete-popup__controls-btn"
									>
										{activeLanguage.ok_btn}
									</button>
								</div>
							</div>
						</ModalContainer>
					)}
					{!!serverError && (
						<ModalContainer
							title={activeLanguage.user_settings_subscriptions_change}
							fnmodalvisible={() => dispatch(closeChangeNotificationSettingsPopups())}
						>
							<div className="complete-popup">
								<div style={{ textAlign: 'center', margin: '15px 0' }}>
									<img style={{ width: '100px' }} src="/img/modal-ico/modal-warning-ico.png" alt="" />
								</div>
								<div className="complete-popup__title">
									The web server reported a gateway time-out error. Please try again in a few minutes.
								</div>
								<div className="complete-popup__controls">
									<button
										onClick={() => dispatch(closeChangeNotificationSettingsPopups())}
										className="btn btn-orange complete-popup__controls-btn"
									>
										{activeLanguage.ok_btn}
									</button>
								</div>
							</div>
						</ModalContainer>
					)}
				</div>
			</div>
		</div>
	);
};
