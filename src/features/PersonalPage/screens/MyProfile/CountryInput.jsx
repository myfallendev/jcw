import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchCfIp,
	setCountry,
	setShowCountriesSelect,
	resetFilteredCountries,
	setCountryFromProps,
} from 'core/components/PhoneInput/phoneInputSlice';

import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

export const CountryInput = ({ activeLanguage, onCountrySelect }) => {
	const dispatch = useDispatch();
	const [countryNameInput, setCountryNameInput] = useState('');
	const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);
	const [enableFocus, setEnableFocus] = useState(false);
	const { allCountries, filteredCountries, setFilteredCountries, selectedCountry, showCountriesSelect } = useSelector(
		(state) => state.phoneInput
	);
	const { user } = useSelector((state) => state.global);
	const { countryOfBirth, country } = user;
	const { name: countryName, alpha2: countryCode } = selectedCountry;
	const searchInputRef = useRef();
	const countriesSelectRef = useRef();

	useEffect(() => {
		if (countryOfBirth) {
			dispatch(setCountryFromProps(countryOfBirth));
		} else {
			dispatch(fetchCfIp());
		}
		return () => {
			document.removeEventListener('click', cancelCountrySelection);
		};
	}, []);

	useEffect(() => {
		if (enableFocus && searchInputRef.current) {
			setFocus(searchInputRef.current);
		}
	}, [showCountriesSelect]);

	const cancelCountrySelection = (e) => {
		if (e.type === 'click' && e.target === searchInputRef.current) return;
		if (e.type === 'keyup' && e.key !== 'Escape' && e.key !== 'Esc') return;
		setSelectedCountryIndex(-1);
		dispatch(setShowCountriesSelect(false));
		document.removeEventListener('click', cancelCountrySelection);
	};

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
		onCountrySelect(item.name);
		dispatch(resetFilteredCountries());
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

	return (
		<div className="country-input">
			{showCountriesSelect ? (
				<div className={'phone-codes-selector flag flag-' + selectedCountry.alpha2.toLowerCase()}>
					<input
						type="text"
						autoComplete={'off'}
						maxLength={21}
						ref={searchInputRef}
						id="country-select-search-field"
						onChange={handleSearch}
						value={countryNameInput}
						onFocus={() => {
							setCountryNameInput('');
							dispatch(resetFilteredCountries());
						}}
						onKeyUp={handleArrowEvent}
						className="phone-codes-selector__search-field"
						placeholder={activeLanguage.country_phone_code_placeholder}
					/>
					<ul
						className="phone-codes-selector__list"
						id="phone-codes-selector-list"
						ref={countriesSelectRef}
						onKeyUp={handleArrowEvent}
						onKeyPress={handleKeyPress}
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
				<div className="country-input__flag">
					<button
						id={'country-input-field'}
						onClick={handleExpandButtonClick}
						className={'country-selector__expand-button flag flag-' + selectedCountry.alpha2.toLowerCase()}
					>
						{selectedCountry.alpha2}
					</button>
					<input
						id={'country-input-field'}
						type="text"
						//ref={countryInput}
						readOnly="readOnly"
						value={selectedCountry.name}
					/>
				</div>
			)}
		</div>
	);
};
