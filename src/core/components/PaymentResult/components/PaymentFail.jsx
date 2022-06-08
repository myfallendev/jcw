import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentFail = () => (
	<div>
		<img src="/img/payment-fail-icon.png" alt="fail" />
		<h1>Ваш платёж не удалось провести :(</h1>
		<p className="px16-pale-text">
			{' '}
			Если вы уверены что это неправильно, свяжитесь с нами по номеру 8 800 000 00 00, указав код ошибки: xfs-123440
		</p>
		<div className="buttons">
			<Link to="/payments" className="btn-big-dark">
				Вернуться к платежам
			</Link>
			<button className="btn btn-primary btn-big-fill-green" onClick={this.props.selectAutoPayment}>
				Сохранить как шаблон
			</button>
		</div>
	</div>
);
