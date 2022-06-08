import axiosWrapper from '../utils/axiosWrapper';
import _foreach from 'lodash/forEach';
import moment from 'moment';
import _find from 'lodash/find';
import _clone from 'lodash/clone';

export const SET_DEVICE_STATUS = 'SET_DEVICE_STATUS';
export const SET_DEVICE_LIST = 'SET_DEVICE_LIST';

export const ADD_DEVICE_ADMIN_FETCH = 'ADD_DEVICE_ADMIN_FETCH';
export const ADD_DEVICE_ADMIN = 'ADD_DEVICE_ADMIN';
export const SET_CURRENT_DEVICE = 'SET_CURRENT_DEVICE';
export const SET_DEVICES_STATUS = 'SET_DEVICES_STATUS';
export const SET_ADVANCED_COMMAND_FETCHING = 'SET_ADVANCED_COMMAND_FETCHING';
export const SWAP_GROUP_VISIBILITY = 'SWAP_GROUP_VISIBILITY';
export const SET_DEVICE_LIST_FETCHING = 'SET_DEVICE_LIST_FETCHING';

export function getDeviceList(id = null) {
	return (dispatch, getState) => {
		dispatch({
			type: SET_DEVICE_LIST_FETCHING,
			payload: true,
		});
		return axiosWrapper('/api/Devices?page=1&itemsPerPage=100', { credentials: 'same-origin' })
			.then(async (response) => {
				let devicesStatusQuery = [];
				if (response.data) {
					_foreach(response.data, (item, index) => {
						if (item.id) devicesStatusQuery.push(item.id);
					});
				}
				await dispatch(getDevicesStatus(devicesStatusQuery));
				let state = getState();
				_foreach(response.data, async (item, index) => {
					let status = _find(state.device.devicesStatus, (e, index) => {
						return e[index] === item.id;
					});
					let extraData = JSON.parse(item.extraData);
					item.build = extraData !== null && !!extraData.Build ? extraData.Build : '';
					item.lastHeartbeat = moment.parseZone(item.lastHeartbeat).local().startOf('hour').fromNow();
					item.fetchLastConfig = false;
					item.payments = [];
					item.loadedPayments = false;
					item.online = status;
					item.cfg = await dispatch(getLastConfigFromDB(item.id));
					item.balance =
						(await dispatch(
							getDeviceBalance({
								data: 'status -balance -use_currency_codes-json',
								deviceId: item.id,
								name: 'DeviceBalance',
							})
						)) || null;
				});
				dispatch({
					type: SET_DEVICE_LIST,
					payload: response.data,
				});
				if (id !== null) {
					let currentDevice = _find(response.data, (o) => {
						return o.id === parseInt(id);
					});
					dispatch({
						type: SET_CURRENT_DEVICE,
						payload: currentDevice,
					});
				}
				dispatch({
					type: SET_DEVICE_LIST_FETCHING,
					payload: false,
				});
				let tList = response.data;
				dispatch(getDevicesStatusTicker());
				window.deviceStatusTimeout = setInterval(() => {
					dispatch(getDevicesStatusTicker());
				}, 60000);
			})
			.catch((e) => {
				console.error(e);
				dispatch({
					type: SET_DEVICE_LIST_FETCHING,
					payload: false,
				});
			});
	};
}

export function setDeviceStatus(json, id) {
	let bufDeviceList = [];
	_foreach(json, (item, index) => {
		if (item.id === id) {
			item.status = item.status ? 0 : 1;
			bufDeviceList.push(item);
		} else {
			bufDeviceList.push(item);
		}
	});
	return (dispatch, getState) => {
		let state = getState();
		dispatch({
			type: SET_DEVICE_STATUS,
			payload: bufDeviceList,
			state: state,
		});
	};
}

export function getDevicesStatus(dataQuery) {
	// {PublicKeys: []}
	return (dispatch, getState) => {
		return axiosWrapper('/api/Devices/getDevicesStatus', {
			credentials: 'same-origin',
			method: 'POST',
			data: {
				deviceIds: dataQuery,
			},
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: SET_DEVICES_STATUS,
					payload: response.data.statuses,
				});
			}
		});
	};
}

export function getDevicesStatusTicker() {
	return async (dispatch, getState) => {
		let state = getState();
		let devicesStatusQuery = [];
		_foreach(state.device.deviceList, (item, index) => {
			if (item.id) devicesStatusQuery.push(item.id);
		});
		if (devicesStatusQuery.length) await dispatch(getDevicesStatus(devicesStatusQuery));
		state = getState();
		let deviceList = _clone(state.device.deviceList);
		_foreach(deviceList, (item, index) => {
			let status = _find(state.device.devicesStatus, (e, index) => {
				return parseInt(index) === item.id;
			});
			item.online = status;
		});
		dispatch({
			type: SET_DEVICE_LIST,
			payload: deviceList,
		});
	};
}

export function addDeviceAdmin(admin) {
	return (dispatch, getState) => {
		let state = getState();
		dispatch({
			type: ADD_DEVICE_ADMIN_FETCH,
			value: true,
			state: state,
		});
		let bufAdminList = state.device.adminList.concat(admin);
		setTimeout(() => {
			dispatch({
				type: ADD_DEVICE_ADMIN,
				value: bufAdminList,
				state: state,
			});
		}, 3000);
	};
}

export function removeCurrentDevice() {
	return (dispatch) => {
		dispatch({
			type: SET_CURRENT_DEVICE,
			payload: null,
		});
	};
}

export function getLastConfig(data = null) {
	if (!!data) {
		return (dispatch, getState) => {
			let state = getState();
			let bufDeviceList = state.device.deviceList;
			let _payload = [];
			_foreach(bufDeviceList, (item) => {
				if (data.deviceId === item.id) {
					item.fetchLastConfig = true;
					item.status = 1; // Loading;
					item.cfg = null;
				}
				_payload.push(item);
			});
			dispatch({
				type: 'SET_DEVICE_LIST',
				payload: _payload,
			});
			return axiosWrapper('/api/Command', { credentials: 'same-origin', method: 'POST', data })
				.then((response) => {
					if (response.data && response.data.errorCode === 0) {
						let queryCounter = 0;
						let _interval = setInterval(() => {
							queryCounter++;
							if (queryCounter === 6) {
								clearInterval(_interval);
								let state = getState();
								let bufDeviceList = state.device.deviceList;
								let _payload = [];
								_foreach(bufDeviceList, (item) => {
									if (data.deviceId === item.id) {
										item.fetchLastConfig = false;
										item.status = 2; // Can't load cfg.. try to push refresh btn later...
										item.cfg = null;
									}
									_payload.push(item);
								});
								dispatch({
									type: 'SET_DEVICE_LIST',
									payload: _payload,
								});
								//console.log('Не удалось получить конфиг с тровмата №', data.deviceId);
							}
							axiosWrapper(
								'/api/Command?page=1&itemsPerPage=100&deviceID=' + data.deviceId + '&commandName=' + data.name,
								{ credentials: 'same-origin' }
							)
								.then((response) => {
									if (response.data.length) {
										let _temp = JSON.parse(response.data[0].response);
										let newCfg = JSON.parse(_temp.Messages[0].replace('Json: ', ''));
										let state = getState();
										let bufDeviceList = state.device.deviceList;
										let _payload = [];
										_foreach(bufDeviceList, (item) => {
											if (data.deviceId === item.id) {
												item.fetchLastConfig = false;
												item.status = 0;
												item.cfg = newCfg;
												item.online = true;
												//console.log('CFG', newCfg);
											}
											_payload.push(item);
										});
										dispatch({
											type: 'SET_DEVICE_LIST',
											payload: _payload,
										});
										clearInterval(_interval);
										//console.log('Получен конфиг от устройства №', data.deviceId);
									} else {
										//console.log('Ждем конфиг... от устройства №', data.deviceId);
									}
								})
								.catch((e) => {
									clearInterval(_interval);
									console.error(e);
								});
						}, 5000);
					}
				})
				.catch((e) => {
					console.error(e);
				});
		};
	}
}

export function sendTrovematCommand(data = null) {
	if (!!data) {
		return (dispatch) => {
			return axiosWrapper('/api/Command', { credentials: 'same-origin', method: 'POST', data })
				.then((response) => {
					//console.log('RESPONSE command: ', data, response.data);
				})
				.catch((e) => {
					console.error(e);
				});
		};
	}
}

export function setCurrentDevice(deviceId) {
	if (!!deviceId) {
		return (dispatch, getState) => {
			let state = getState();
			if (state.device && state.device.deviceList && state.device.deviceList.length) {
				let currentDevice = _find(state.device.deviceList, (o) => {
					return o.id === parseInt(deviceId);
				});
				if (!!currentDevice) {
					currentDevice.status = 0;
					dispatch({
						type: 'SET_CURRENT_DEVICE',
						payload: currentDevice,
						state,
					});
				}
			} else {
				(() => {
					dispatch(getDeviceList(deviceId));
				})();
			}
		};
	}
}

export function getLastCommands(deviceId, commandName) {
	//console.log('getLastCommands id: ', deviceId, commandName);
	if (!!deviceId && !!commandName) {
		return (dispatch) => {
			return axiosWrapper('/api/Command?page=1&itemsPerPage=100&deviceID=' + deviceId + '&commandName=' + commandName, {
				credentials: 'same-origin',
			})
				.then((response) => {
					if (response.data) {
						//console.log('RESPONSE getLastCommands: ', response.data);
						let json = JSON.parse(response.data[0].response);
						//console.log('FINAL', JSON.parse(json.Json));
					}
				})
				.catch((e) => {
					console.error(e);
				});
		};
	}
}

export function getTrovematPayments(
	deviceId = null,
	startDate = moment().subtract(1, 'months').format('YYYY-MM-DD'),
	endDate = moment().format('YYYY-MM-DD')
) {
	if (!!deviceId) {
		return (dispatch, getState) => {
			return axiosWrapper(
				`/api/Payment/getByDate?startDate=${startDate}&endDate=${endDate}&deviceID=${deviceId}&itemsPerPage=1000`,
				{ credentials: 'same-origin' }
			)
				.then((response) => {
					if (response.data) {
						let state = getState();
						let bufDeviceList = state.device.deviceList;
						let _payload = [];
						_foreach(bufDeviceList, (item) => {
							if (deviceId === item.id) {
								item.payments = response.data.reverse();
								item.loadedPayments = true;
							}
							_payload.push(item);
						});
						dispatch({
							type: 'SET_DEVICE_LIST',
							payload: _payload,
						});
					}
				})
				.catch((e) => {
					console.error(e);
				});
		};
	}
}

export function sendSingleCommandToDevice(data) {
	return (dispatch, getState) => {
		dispatch({
			type: SET_ADVANCED_COMMAND_FETCHING,
			payload: true,
		});
		return axiosWrapper('/api/Command', {
			credentials: 'same-origin',
			method: 'POST',
			data,
		})
			.then((response) => {
				if (response.data && response.data.errorCode === 0) {
					setTimeout(() => {
						dispatch({
							type: SET_ADVANCED_COMMAND_FETCHING,
							payload: false,
						});
					}, 10500);
				}
			})
			.catch(() => {
				dispatch({
					type: SET_ADVANCED_COMMAND_FETCHING,
					payload: false,
				});
			});
	};
}

export function getLastConfigFromDB(deviceId) {
	return (dispatch, getState) => {
		let state = getState();
		axiosWrapper('/api/Command?page=1&itemsPerPage=100&deviceID=' + deviceId + '&commandName=' + 'LastConfig', {
			credentials: 'same-origin',
		})
			.then((response) => {
				if (response.data.length) {
					let _temp = JSON.parse(response.data[0].response);
					let newCfg = JSON.parse(_temp.Messages[0].replace('Json: ', ''));
					let state = getState();
					let bufDeviceList = state.device.deviceList;
					let _payload = [];
					_foreach(bufDeviceList, (item) => {
						if (deviceId === item.id) {
							item.fetchLastConfig = false;
							item.status = 0;
							item.cfg = newCfg;
							item.online = true;
							//console.log('CFG', newCfg);
						}
						_payload.push(item);
					});
					dispatch({
						type: 'SET_DEVICE_LIST',
						payload: _payload,
					});
					clearInterval(window.deviceStatusTimeout);
					window.deviceStatusTimeout = setInterval(() => {
						dispatch(getDevicesStatusTicker());
					}, 60000);
					//console.log('Получен конфиг от устройства №', data.deviceId);
				} else {
					//console.log('Ждем конфиг... от устройства №', data.deviceId);
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

export function getDeviceBalance(data = null) {
	if (!!data) {
		return (dispatch, getState) => {
			let state = getState();
			let bufDeviceList = state.device.deviceList;
			let _payload = [];
			_foreach(bufDeviceList, (item) => {
				if (data.deviceId === item.id) {
					item.balance = null;
				}
				_payload.push(item);
			});
			dispatch({
				type: 'SET_DEVICE_LIST',
				payload: _payload,
			});
			return axiosWrapper('/api/Command', { credentials: 'same-origin', method: 'POST', data })
				.then((response) => {
					if (response.data && response.data.errorCode === 0) {
						let queryCounter = 0;
						let _interval = setInterval(() => {
							queryCounter++;
							if (queryCounter === 3) {
								clearInterval(_interval);
								let state = getState();
								let bufDeviceList = state.device.deviceList;
								let _payload = [];
								_foreach(bufDeviceList, (item) => {
									if (data.deviceId === item.id) {
										item.balance = null;
									}
									_payload.push(item);
								});
								dispatch({
									type: 'SET_DEVICE_LIST',
									payload: _payload,
								});
								//console.log('Не удалось получить конфиг с тровмата №', data.deviceId);
							}
							axiosWrapper(
								'/api/Command?page=1&itemsPerPage=100&deviceID=' + data.deviceId + '&commandName=' + data.name,
								{ credentials: 'same-origin' }
							)
								.then((response) => {
									if (response.data.length) {
										let _temp = JSON.parse(response.data[0].response);
										let newBalance = JSON.parse(_temp.Messages[0].replace('Json: ', ''));
										let state = getState();
										let bufDeviceList = state.device.deviceList;
										let _payload = [];
										_foreach(bufDeviceList, (item) => {
											if (data.deviceId === item.id) {
												item.balance = newBalance;
												//console.log('CFG', newCfg);
											}
											_payload.push(item);
										});
										dispatch({
											type: 'SET_DEVICE_LIST',
											payload: _payload,
										});
										clearInterval(_interval);
										//console.log('Получен конфиг от устройства №', data.deviceId);
									} else {
										//console.log('Ждем конфиг... от устройства №', data.deviceId);
									}
								})
								.catch((e) => {
									clearInterval(_interval);
									console.error(e);
								});
						}, 5000);
					}
				})
				.catch((e) => {
					console.error(e);
				});
		};
	}
}

// /api/Payment/restartPayment
export function restartPayment(paymentId, createNew) {
	axiosWrapper(`/api/Payment/restartPayment?id=${paymentId}&createNew=${createNew}`, { credentials: 'same-origin' })
		.then((response) => {
			if (response.data) {
				console.log(response.data);
			}
		})
		.catch((e) => {});
}

export function sendCommandToDevice(data, response = false) {
	return (dispatch, getState) => {
		dispatch({
			type: 'SET_DEVICE_COMMAND_FETCHING',
			payload: true,
		});
		return axiosWrapper('/api/Command', {
			credentials: 'same-origin',
			method: 'POST',
			data,
		})
			.then((response) => {
				if (response.data && response.data.errorCode === 0) {
					let _timeout = setTimeout(() => {
						dispatch({
							type: 'SET_DEVICE_COMMAND_FETCHING',
							payload: true,
						});
					}, 30000);
					//console.log('COMMAND RESPONSE', response.data);
					if (response) {
						clearTimeout(_timeout);
					}
				}
			})
			.catch(() => {
				dispatch({
					type: 'SET_DEVICE_COMMAND_FETCHING',
					payload: false,
				});
			});
	};
}

export function removeDevice(deviceId = null, errorOnNoUserKeys = false) {
	return (dispatch, getState) => {
		if (!!deviceId) {
			axiosWrapper(`/api/Devices?deviceId=${deviceId}&errorOnNoUserKeys=${errorOnNoUserKeys}`, {
				credentials: 'same-origin',
				method: 'DELETE',
				data: {
					deviceId,
					errorOnNoUserKeys,
				},
			})
				.then((response) => {
					if (response.data) {
						dispatch(getDeviceList());
					}
				})
				.catch((e) => {});
		}
	};
}
