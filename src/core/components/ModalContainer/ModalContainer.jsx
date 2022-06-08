import React, { Component } from 'react';
import { Loader } from '../Loader';
import './popup.css';

export class ModalContainer extends Component {

	componentWillUnmount() {
		document.body.style.overflow = 'auto';
		if (document.querySelector('._hiddenArea')) document.querySelector('._hiddenArea').style.opacity = '1';
		document.querySelector('.modal__overlay').style.opacity = '1';
		document.querySelector('.modal__body').classList.remove('noBoxShadow');
		if (document.querySelector('.main-page') !== null) document.querySelector('.main-page').classList.remove('whiteBg');
		window.removeEventListener('resize', this.onWindowResize);
	}

	componentDidMount() {
		document.body.style.overflow = 'hidden';

		if (window.innerWidth <= 540 && document.querySelector('._hiddenArea')) {
			if (document.querySelector('.main-page')) document.querySelector('.main-page').classList.add('whiteBg');
		}
		const modalBody = document.querySelector('.modal__body');
		const fluid = document.querySelector('.modal__body.fluid');

		if (window.innerWidth <= 540 && !fluid) {
			document.body.style.overflow = 'none';
			modalBody.classList.add('noBoxShadow');
			if (document.querySelector('.main-page')) document.querySelector('.main-page').classList.add('whiteBg');
			window.addEventListener('resize', this.onWindowResize);
		}
		window.dispatchEvent(new Event('resize'));
	}

	onWindowResize () {
		const modalBody = document.querySelector('.modal__body');
		modalBody.style.height = window.innerHeight + 'px';
		document.querySelector('.modal__overlay').style.opacity = '0';
	}

	closeModal(event) {
		event.stopPropagation();

		if (document.querySelector('._hiddenArea')) document.querySelector('._hiddenArea').style.opacity = '1';
		document.querySelector('.modal__body').classList.remove('noBoxShadow');
		if (document.querySelector('.main-page') !== null) document.querySelector('.main-page').classList.remove('whiteBg');
		let clsName = event.target.className;

		if (typeof clsName === 'string' && clsName.indexOf('__closeArea') !== -1) {
			if (this.props.disableOverlayClick && event.target.className.indexOf('modal__overlay') !== -1) return;

			document.body.style.overflow = 'auto';
			if (this.props.fnmodalvisible) this.props.fnmodalvisible();
		}
	}

	render() {
		const { additionalClass, style, isLoading } = this.props;

		return (
			<div>
				<div className="modal__overlay __closeArea" onClick={this.closeModal.bind(this)}></div>
				<div className="modal__container" style={style}>
					{isLoading && <Loader />}
					<div className={'modal__body ' + (additionalClass || '') + (isLoading ? ' blur' : '')}>
						<div className="modal__close __closeArea" onClick={this.closeModal.bind(this)}></div>
						<div className="modal__header">{this.props.title || ''}</div>
						<div className="modal__content">
							<div className="modal__area">{this.props.children}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
