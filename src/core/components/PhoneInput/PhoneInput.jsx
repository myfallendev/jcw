import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchCfIp,
	setCountry,
	setFilteredCountries,
	setShowCountriesSelect,
	resetFilteredCountries,
	updateCountry,
	setPhone,
	setPhoneIsValid,
} from './phoneInputSlice';
import { resetErrors } from 'core/globalSlice';
import cn from 'classnames';

import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _throttle from 'lodash/throttle';

export const PhoneInput = ({ activeLanguage, additionalClass, clearInputErrors, currentStatus, onChange }) => {
	const dispatch = useDispatch();
	const [countryNameInput, setCountryNameInput] = useState('');
	const [enableFocus, setEnableFocus] = useState(false);
	const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);

	const {
		allCountries,
		filteredCountries,
		selectedCountry,
		showCountriesSelect,
		phoneInput,
		phoneIsValid,
	} = useSelector((state) => state.phoneInput);
	const { name: countryName, alpha2: countryCode, phoneCode, phone } = selectedCountry;
	const { errors } = useSelector((state) => state.global);

	const phoneInputRef = useRef();
	const searchInputRef = useRef();
	const countriesSelectRef = useRef();

	useEffect(() => {
		dispatch(fetchCfIp());
		return () => {
			document.removeEventListener('click', cancelCountrySelection);
			dispatch(setPhone(''));
			dispatch(setPhoneIsValid(false));
		};
	}, []);

	useEffect(() => {
		if (enableFocus && phoneInputRef.current) {
			setFocus(phoneInputRef.current);
		} else if (enableFocus && searchInputRef.current) {
			setFocus(searchInputRef.current);
		}
	}, [showCountriesSelect, countryCode]);

	const cancelCountrySelection = (e) => {
		if (e.type === 'click' && e.target === searchInputRef.current) return;
		if (e.type === 'keyup' && e.key !== 'Escape' && e.key !== 'Esc') return;
		setSelectedCountryIndex(-1);
		dispatch(setShowCountriesSelect(false));
		document.removeEventListener('click', cancelCountrySelection);
	};

	useEffect(() => {
		if (phoneCode) dispatch(setPhone(phoneCode + ' ' + phone));
	}, [selectedCountry]);

	const setFocus = (field) => {
		let ctrl = field;
		let start = ctrl.value.length;
		let end = start;

		if (ctrl.setSelectionRange) {
			ctrl.focus();
			ctrl.setSelectionRange(start, end);
		} else if (ctrl.createTextRange) {
			let range = ctrl.createTextRange();

			range.collapse(true);
			range.moveEnd('character', end);
			range.moveStart('character', start);
			range.select();
		}
	};

	const handleSearch = (e) => {
		setCountryNameInput(e.target.value);
		dispatch(setFilteredCountries(e.target.value));
	};

	const handlePhoneTyping = (e) => {
		const value = e.target.value.replace(/[^\d\s\-()]/gi, '');
		const valueToSend = value.replace(/\D/gi, '');
		const resultIsValid = valueToSend.length >= 9;

		dispatch(updateCountry(value));
		dispatch(setPhone('+' + value));
		dispatch(setPhoneIsValid(resultIsValid));

		if (currentStatus === 'restore') {
			onChange(valueToSend, resultIsValid);
		}
		if (errors.length) {
			dispatch(resetErrors());
		}
	};

	const handleExpandButtonClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setEnableFocus(true);
		dispatch(resetFilteredCountries());
		document.addEventListener('click', cancelCountrySelection);
		dispatch(setShowCountriesSelect(true));
	};

	const handleSelectCountry = (e, item, enableFocus) => {
		if (e) e.preventDefault();

		dispatch(setCountry(item));
		dispatch(resetFilteredCountries());
		dispatch(setPhoneIsValid(false));
		setSelectedCountryIndex(-1);
		dispatch(setShowCountriesSelect(false));
		setEnableFocus(!!enableFocus);
	};

	const scrollToElement = (elemId, moveUp) => {
		let itemNode = document.getElementById(elemId);

		if (!(itemNode && countriesSelectRef.current)) return;

		let itemTopPos = itemNode.offsetTop;
		let containerHeight = countriesSelectRef.current.clientHeight;

		let itemBCR = itemNode.getBoundingClientRect();
		let popupBCR = countriesSelectRef.current.getBoundingClientRect();

		if (!(itemBCR && popupBCR)) return;

		if (moveUp && itemBCR.top < popupBCR.top) {
			countriesSelectRef.current.scrollTop = itemTopPos - 10;
		} else if (!moveUp && itemBCR.bottom > popupBCR.bottom) {
			countriesSelectRef.current.scrollTop = itemTopPos - containerHeight + itemNode.clientHeight + 10;
		}
	};

	const setItemSelected = (item, index, moveUp) => {
		scrollToElement(item.alpha2, moveUp);
		setSelectedCountryIndex(index);
		dispatch(setCountry(item));
		setCountryNameInput(item.name);
	};

	const handleKeyPress = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!e.keyCode === 13) return;
		if (!countryName) return;

		const selectedCountryCode = countryCode || filteredCountries[0].alpha2;

		const countryItem = _find(allCountries, (item) => item.alpha2 === selectedCountryCode);

		if (!countryItem) return;

		handleSelectCountry(null, countryItem, true);
	};

	const handleArrowEvent = (e) => {
		let keyCode = e.which || e.keyCode;
		let nextIndex = selectedCountryIndex;

		switch (keyCode) {
			case 27:
				cancelCountrySelection(e);

				break;

			case 40:
				if (filteredCountries.length === 0) return;

				nextIndex++;

				if (allCountries.length !== filteredCountries.length) {
					nextIndex = 1 + _findIndex(filteredCountries, (item) => item.alpha2 === countryCode);
				}
				if (nextIndex >= filteredCountries.length) return;

				setItemSelected(filteredCountries[nextIndex], nextIndex);

				break;

			case 38:
				if (filteredCountries.length === 1) return;

				nextIndex--;

				if (allCountries.length !== filteredCountries.length) {
					nextIndex = _findIndex(filteredCountries, (item) => item.alpha2 === countryCode) - 1;
				}
				if (nextIndex < 0) return;

				setItemSelected(filteredCountries[nextIndex], nextIndex, true);

				break;

			default:
				return;
		}
	};

	const phoneInputClassName = cn('phone-input__phone-field', {
		'phone-input__phone-field--valid': phoneIsValid,
		[additionalClass]: !!additionalClass,
	});

	return (
		<div className="phone-input">
			{showCountriesSelect ? (
				<div className={'phone-codes-selector flag flag-' + selectedCountry.alpha2.toLowerCase()}>
					<input
						type="text"
						maxLength={21}
						autoComplete={'off'}
						ref={searchInputRef}
						id="country-select-search-field"
						onChange={handleSearch}
						onFocus={() => {
							setCountryNameInput('');
							dispatch(resetFilteredCountries());
						}}
						onKeyUp={handleArrowEvent}
						value={countryNameInput}
						className="phone-codes-selector__search-field"
						placeholder={activeLanguage.country_phone_code_placeholder}
					/>
					<ul
						className="phone-codes-selector__list"
						ref={countriesSelectRef}
						onKeyUp={handleArrowEvent}
						onKeyPress={handleKeyPress}
						id="phone-codes-selector-list"
					>
						{filteredCountries.map((item) => {
							const baseButtonClassName = 'phone-codes-selector__button';
							const isSelected = countryCode === '' ? false : item.alpha2 === countryCode;
							const buttonClassName =
								baseButtonClassName +
								' flag flag-' +
								item.alpha2.toLowerCase() +
								(isSelected ? ' ' + baseButtonClassName + '--selected' : '');

							return (
								<li key={item.alpha2} id={item.alpha2}>
									<button className={buttonClassName} onClick={(e) => handleSelectCountry(e, item, true)}>
										{item.name}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			) : (
				<div className="phone-input__flag-n-phone">
					<button
						onClick={handleExpandButtonClick}
						className={'phone-codes-selector__expand-button flag flag-' + selectedCountry.alpha2.toLowerCase()}
					>
						{selectedCountry.alpha2}
					</button>
					<input
						id={'phone-input-field__' + currentStatus}
						type="tel"
						autoComplete={currentStatus === 'login' ? 'phone' : 'new-password'}
						ref={phoneInputRef}
						maxLength={21}
						className={phoneInputClassName}
						onChange={handlePhoneTyping}
						onFocus={handlePhoneTyping}
						onMouseDown={clearInputErrors}
						value={phoneInput}
						autoFocus={currentStatus === 'restore'}
					/>
				</div>
			)}
		</div>
	);
};
