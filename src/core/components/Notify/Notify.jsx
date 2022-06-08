import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as accountActions from 'actions/AccountActions';

class NotifyComponent extends Component {
	constructor(props) {
		super(props);
		this.handlePasteUserId = this.handlePasteUserId.bind(this);
		this.handleChangeUserId = this.handleChangeUserId.bind(this);
		this.handleSendNotify = this.handleSendNotify.bind(this);

		this.state = {
			userId: false,
			isLoader: false,
		};
	}

	componentWillMount() {
		if (this.props.user.roleId === 0) {
		}
	}

	handleChangeUserId() {
		if (this.refs.userId.value !== '') {
			this.setState({ userId: true });
		} else {
			this.setState({ userId: false });
		}
	}

	handleSendNotify() {
		this.props.accountActions.sendNotify(this.refs.userId.value, this.refs.subject.value, this.refs.content.value);
	}

	handlePasteUserId() {
		this.refs.userId.value = this.props.user.id;
		this.handleChangeUserId();
	}

	render() {
		const { user } = this.props;

		return (
			<div className="notify">
				<div className="notify__wrapper">
					<div className="notify__header">Notify</div>
					{user.roleId !== 0 ? (
						<div className="notify__content">
							<div className="form-group" style={{ opacity: this.state.userId ? 1 : 0.3 }}>
								<label className="notify__label" htmlFor="userid">
									User ID (optional){' '}
									<span style={{ fontSize: '1rem' }}>
										[ Your userId -{' '}
										<span
											onClick={this.handlePasteUserId}
											style={{
												borderBottom: '1px dotted #666',
												cursor: 'pointer',
											}}
										>
											{user.id}
										</span>{' '}
										]
									</span>
								</label>
								<input
									type="text"
									ref="userId"
									onChange={this.handleChangeUserId}
									className="form-control notify__input"
									id="userid"
									placeholder="User ID"
								/>
							</div>
							<div className="form-group">
								<label className="notify__label" htmlFor="subject">
									Subject *
								</label>
								<input
									ref="subject"
									type="text"
									className="form-control notify__input"
									id="subject"
									placeholder="Subject"
								/>
							</div>
							<div className="form-group">
								<label className="notify__label" htmlFor="content">
									Content *
								</label>

								<textarea className="notify__textarea" ref="content" name="content"></textarea>
							</div>
							<div className="form-group">
								<button onClick={this.handleSendNotify} className="btn btn-large btn-orange">
									Send Notify
								</button>
							</div>
						</div>
					) : (
						<div className="notify__content">Only for admins</div>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.user,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		accountActions: bindActionCreators(accountActions, dispatch),
	};
}

export const Notify = connect(mapStateToProps, mapDispatchToProps)(NotifyComponent);
