import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as paymentActions from 'actions/PaymentActions';
import * as autoPaymentActions from 'actions/AutoPaymentActions';

import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentFail } from './components/PaymentFail';
import { Loader } from '../Loader';

class PaymentResultComponent extends Component {
	closeSuccessPopup() {
		this.props.autoPaymentActions.closeSuccessPopup();
	}

	closeErrorPopup() {
		this.props.autoPaymentActions.closeErrorPopup();
	}

	componentWillUnmount() {
		this.props.paymentActions.closePaymentResult();
	}

	render() {
		const {
			showPaymentSuccessWindow,
			showSuccessPopup,
			showErrorPopup,
			errors,
			fetchingAutoPaymentSelection,
		} = this.props;
		return (
			<div className="content payment-result">
				{showPaymentSuccessWindow ? (
					<PaymentSuccess selectAutoPayment={this.props.selectAutoPayment} />
				) : (
					<PaymentFail selectAutoPayment={this.props.selectAutoPayment} />
				)}
				{fetchingAutoPaymentSelection && <Loader />}
				{showSuccessPopup && (
					<div className="popup auto-payment-success-popup">
						<p>Быстрый платеж успешно добавлен!</p>
						<button className="btn btn-primary btn-big-fill-green" onClick={this.closeSuccessPopup.bind(this)}>
							Подтвердить
						</button>
					</div>
				)}
				{showErrorPopup && errors !== undefined && errors.UserMenu !== undefined && (
					<div className="popup auto-payment-error-popup">
						<p>{errors.UserMenu}</p>
						<button className="btn btn-primary btn-big-fill-green" onClick={this.closeErrorPopup.bind(this)}>
							Подтвердить
						</button>
					</div>
				)}
				{showErrorPopup || (showSuccessPopup && <div className="popup-bg"></div>)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		showSuccessPopup: state.autoPayments.showSuccessPopup,
		showErrorPopup: state.autoPayments.showErrorPopup,
		errors: state.autoPayments.errors,
		showPaymentSuccessWindow: state.payments.showPaymentSuccessWindow,
		fetchingAutoPaymentSelection: state.autoPayments.fetchingAutoPaymentSelection,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		paymentActions: bindActionCreators(paymentActions, dispatch),
		autoPaymentActions: bindActionCreators(autoPaymentActions, dispatch),
	};
}

export const PaymentResult = connect(mapStateToProps, mapDispatchToProps)(PaymentResultComponent);
