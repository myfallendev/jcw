import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentSuccess = () => (
	<div>
		<img src="/img/payment-success-icon.png" alt="success" />
		<h1>Ваш платеж успешно проведен</h1>
		<p className="px16-pale-text">
			{' '}
			Спасибо вам за то, что являетесь нашим клиентом! Срок зачисления от нескольких минут до 5 дней.{' '}
		</p>
		<div className="buttons">
			<Link to="/payments" className="btn-big-dark">
				Вернуться к платежам
			</Link>
			<button className="btn-big-fill-green" onClick={this.props.selectAutoPayment}>
				Сохранить как шаблон
			</button>
		</div>
	</div>
);
