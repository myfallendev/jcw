import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Highlight from 'react-highlight';
import 'highlightjs/styles/github.css';

export class TrovematDev extends Component {
	componentDidMount() {
		document.body.addEventListener('click', e => {
			const check = node => node.classList.contains('write-btn') || node.classList.contains('button_overlay');
			if (check(e.target)) {
				let btn = e.target;

				if (btn.classList.contains('button_overlay')) {
					btn = btn.parentNode;
				}
				let text = btn.parentNode.querySelector('.clickable_command').textContent.trim();
				const copyIcon = btn.querySelector('.copy-icon');
				const doneIcon = btn.querySelector('.done-icon');

				navigator.clipboard
					.writeText(text)
					.then(() => {
						copyIcon.style.display = 'none';
						doneIcon.style.display = 'flex';

						setTimeout(() => {
							copyIcon.style.display = 'flex';
							doneIcon.style.display = 'none';
						}, 5000);
					})
					.catch(err => {
						console.log('Error: ', err);
					});
			}
		});
	}

	render() {
		return (
			<div className="faq-block">
				<div className="wrapper">
					<Link className="btn btn-primary account-transfer-button account-fill-button account-wallet__btn" to="/faq">
						Prev
					</Link>
				</div>
				<div className="faq-content">
					<svg display="none">
						<symbol id="copy-icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
							<rect
								fill="none"
								height="13"
								rx="2"
								ry="2"
								stroke="#555"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								width="13"
								x="9"
								y="9"
							></rect>
							<path
								d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
								fill="none"
								stroke="#555"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							></path>
						</symbol>
						<symbol
							id="done-icon"
							fill="none"
							height="32"
							stroke="#239d60"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							width="32"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polyline points="20 6 9 17 4 12"></polyline>
						</symbol>
					</svg>
					<div className="wrapper">
						<h1>Version History</h1>
						<div class="faq-content__menu-list">
							<h2>Version list:</h2>
							<ol>
								<li>
									<a href="#1.9.0.117X">Version 1.9.0.117X</a>
								</li>
								<li>
									<a href="#1.9.0.114X">Version 1.9.0.114X</a>
								</li>
								<li>
									<a href="#1.9.0.108X">Version 1.9.0.108X</a>
								</li>
								<li>
									<a href="#1.9.0.103X">Version 1.9.0.103X</a>
								</li>
								<li>
									<a href="#1.8.0.10XX">Version 1.8.0.10XX</a>
								</li>
								<li>
									<a href="#1.8.0.92X">Version 1.8.0.92X</a>
								</li>
								<li>
									<a href="#1.8.0.9XX">Version 1.8.0.9XX</a>
								</li>
								<li>
									<a href="#1.8.0.85X">Version 1.8.0.85X</a>
								</li>
								<li>
									<a href="#1.8.0.81X">Version 1.8.0.81X</a>
								</li>
								<li>
									<a href="#1.8.0.74X">Version 1.8.0.74X</a>
								</li>
								<li>
									<a href="#1.8.0.67X">Version 1.8.0.67X</a>
								</li>
								<li>
									<a href="#1.8.0.64X">Version 1.8.0.64X</a>
								</li>
								<li>
									<a href="#1.8.0.59X">Version 1.8.0.59X</a>
								</li>
								<li>
									<a href="#1.8.0.57X">Version 1.8.0.57X</a>
								</li>
								<li>
									<a href="#1.8.0.50X">Version 1.8.0.50X</a>
								</li>
								<li>
									<a href="#1.8.0.47X">Version 1.8.0.47X</a>
								</li>
								<li>
									<a href="#1.7.2.2012">Version 1.7.2.2012</a>
								</li>
								<li>
									<a href="#1.7.2.2005">Version 1.7.2.2005</a>
								</li>
								<li>
									<a href="#1.7.0.1968">Version 1.7.0.1968</a>
								</li>
								<li>
									<a href="#1.7.0.1893">Version 1.7.0.1893</a>
								</li>
								<li>
									<a href="#1.7.0.1863">Version 1.7.0.1863</a>
								</li>
								<li>
									<a href="#1.7.0.1852">Version 1.7.0.1852</a>
								</li>
								<li>
									<a href="#1.6.0.1728">Version 1.6.0.1728</a>
								</li>
								<li>
									<a href="#1.5.3.1637">Version 1.5.3.1637</a>
								</li>
								<li>
									<a href="#1.5.3.1617">Version 1.5.3.1617</a>
								</li>
								<li>
									<a href="#1.5.3.1606">Version 1.5.3.1606</a>
								</li>
								<li>
									<a href="#1.5.2.1564">Version 1.5.2.1564</a>
								</li>
								<li>
									<a href="#1.5.2.1537">Version 1.5.2.1537</a>
								</li>
							</ol>
						</div>
						<h2 id="1.9.0.117X">Version 1.9.0.117X</h2>
						<p>1.9.0.1172 - for Ubuntu 16.04</p>
						<p>1.9.0.1171 - for Ubuntu 18.04</p>
						<ol>
							<li>Save unknown file types to temp directory</li>
							<li>"Print paper wallet" button replaced with "Generate JetCrypto wallet" button</li>
						</ol>	
						<h2 id="1.9.0.114X">Version 1.9.0.114X</h2>
						<p>1.9.0.1148 - for Ubuntu 16.04</p>
						<p>1.9.0.1147 - for Ubuntu 18.04</p>
						<ol>
							<li>Devices coniguration presets now can be applied to Trovemat using {' '}
								<a href={`https://dashboard.${window.location.host}`} target="_blank" rel="noopener noreferrer">
									ATM dashboard
								</a>
							</li>
							<li>Added new coins to Trovemat</li>
							<li>Fixed UI issues in service menu</li>
						</ol>	
						<h2 id="1.9.0.108X">Version 1.9.0.108X</h2>
						<p>1.9.0.1084 - for Ubuntu 16.04</p>
						<p>1.9.0.1083 - for Ubuntu 18.04</p>
						<ol>
							<li>Localization strings can be customized by Trovemat owner</li>
							<li>Improved QR-code printing procedure</li>
							<li>Updated advertisement logic on main screen</li>
							<li>Reduced log files size in some cases</li>
						</ol>						
						<h2 id="1.9.0.103X">Version 1.9.0.103X</h2>
						<p>1.9.0.1036 - for Ubuntu 16.04</p>
						<p>1.9.0.1035 - for Ubuntu 18.04</p>
						<ol>
							<li>Added events log for device in {' '}
								<a href={`https://dashboard.${window.location.host}`} target="_blank" rel="noopener noreferrer">
									ATM dashboard
								</a>
							</li>
							<li>Various improvements in customer SELL and BUY scenarios</li>
							<li>Receipt now can be printed right after cash accepted</li>
							<li>User behavior metrics saved for further analysis</li>
							<li>Various inner improvements</li>
							<li>Receipts stored for printing from {' '}
								<a href={`https://dashboard.${window.location.host}`} target="_blank" rel="noopener noreferrer">
									ATM dashboard
								</a>
							</li>
							<li>Prepare Trovemat for other platforms</li>
							<li>More functions in service menu + extended info about current Trovemat state</li>
						</ol>
						<h2 id="1.8.0.10XX">Version 1.8.0.10XX</h2>
						<p>1.8.0.1020 - for Ubuntu 16.04</p>
						<p>1.8.0.1019 - for Ubuntu 18.04</p>
						<ol>
							<li>Updated used libraries</li>
							<li>New log archive filename</li>
							<li>Update JCM integration</li>
							<li>Added config template</li>
						</ol>
						<h2 id="1.8.0.92X">Version 1.8.0.92X</h2>
						<p>1.8.0.930 - for Ubuntu 16.04</p>
						<p>1.8.0.929 - for Ubuntu 18.04</p>
						<ol>
							<li>Support proxy for monitoring</li>
						</ol>
						<h2 id="1.8.0.9XX">Version 1.8.0.9XX</h2>
						<p>1.8.0.910 - for Ubuntu 16.04</p>
						<p>1.8.0.909 - for Ubuntu 18.04</p>
						<ol>
							<li>Updated min purchase limit policy</li>
							<li>Update for monitoring transport</li>
							<li>Updated icons for coins</li>
						</ol>
						<h2 id="1.8.0.85X">Version 1.8.0.85X</h2>
						<p>1.8.0.859 - for Ubuntu 16.04</p>
						<p>1.8.0.858 - for Ubuntu 18.04</p>
						<ol>
							<li>IPv6 support for monitoring</li>
							<li>Improvements in find devices function</li>
							<li>Some UI improvements</li>
						</ol>
						<h2 id="1.8.0.81X">Version 1.8.0.81X</h2>
						<p>1.8.0.812 - for Ubuntu 16.04</p>
						<p>1.8.0.811 - for Ubuntu 18.04</p>
						<ol>
							<li>Updated UI theme for main screen</li>
						</ol>
						<h2 id="1.8.0.74X">Version 1.8.0.74X</h2>
						<p>1.8.0.749 - for Ubuntu 16.04</p>
						<p>1.8.0.748 - for Ubuntu 18.04</p>
						<ol>
							<li>Added support for NV-200 SmartPayout</li>
							<li>Added hardware Rakinda QR-code scanner</li>
							<li>New UI theme for main screen</li>
							<li>Lots of inner improvements</li>
						</ol>
						<h2 id="1.8.0.67X">Version 1.8.0.67X</h2>
						<p>1.8.0.672 - for Ubuntu 16.04</p>
						<p>1.8.0.671 - for Ubuntu 18.04</p>
						<ol>
							<li>Added support for JCM cash validator</li>
							<li>Event-based notifications for cash unit info changed</li>
							<li>Added stacker in-out text message notification</li>
						</ol>
						<h2 id="1.8.0.64X">Version 1.8.0.64X</h2>
						<p>1.8.0.646 - for Ubuntu 16.04</p>
						<p>1.8.0.645 - for Ubuntu 18.04</p>
						<ol>
							<li>Added default cash box settings for cash dispenser after device search</li>
							<li>Fresh look for admins list in service menu</li>
							<li>Updated JetCrypto templates</li>
						</ol>
						<h2 id="1.8.0.59X">Version 1.8.0.59X</h2>
						<p>1.8.0.599 - for Ubuntu 16.04</p>
						<p>1.8.0.597 - for Ubuntu 18.04</p>
						<ol>
							<li>Fixed some issues MEI SCR logic</li>
							<li>Hourly / Daily / Monthly limits support for {' '}
								<a href={`https://dashboard.${window.location.host}`} target="_blank" rel="noopener noreferrer">
									ATM dashboard
								</a>
							</li>
						</ol>
						<h2 id="1.8.0.57X">Version 1.8.0.57X</h2>
						<p>1.8.0.578 - for Ubuntu 16.04</p>
						<p>1.8.0.577 - for Ubuntu 18.04</p>
						<ol>
							<li>Fixed some network issues in specific configuration</li>
							<li>Saved state 'Manually blocked' after application restart</li>
							<li>Added "Unlock" button in service menu</li>
						</ol>
						<h2 id="1.8.0.50X">Version 1.8.0.50X</h2>
						<p>1.8.0.503 - for Ubuntu 16.04</p>
						<p>1.8.0.501 - for Ubuntu 18.04</p>
						<ol>
							<li>Fixed rate issue for non-USD single-currency configuration</li>
							<li>Support in interface for coins with extremely low rates (like 0.000001 cent)</li>
						</ol>
						<h2 id="1.8.0.47X">Version 1.8.0.47X</h2>
						<p>1.8.0.472 - for Ubuntu 16.04</p>
						<p>1.8.0.471 - for Ubuntu 18.04</p>
						<ol>
							<li>Hardware watchdog support for Trovemat T2 PRO model</li>
							<li>Improved cashout scenario (will be updated automatically)</li>
							<li>Many improvements in service menu (WiFi setup, recycler additional functions, etc)</li>
							<li>Adaptive GUI for different display models</li>
							<li>New printer suport (Custom K80)</li>
							<li>FR + CN localizations</li>
						</ol>
						<h2 id="1.7.2.2012">Version 1.7.2.2012</h2>
						<ol>
							<li>Added fiat rate adjustment feature.</li>
						</ol>
						<h2 id="1.7.2.2005">Version 1.7.2.2005</h2>
						<ol>
							<li>Increased network stability</li>
							<li>Fixed "apilayer" rates source HTTP protocol issues</li>
							<li>Rate addendum is now can be setup for each fiat currency</li>
							<li>Led lights colors settings</li>
							<li>Some internal improvements</li>
						</ol>
						<h2 id="1.7.0.1968">Version 1.7.0.1968</h2>
						<ol>
							<li>Added ability to specify multiple accountings for the "accounting archive info" command</li>
							<li>"Out of service" mode according to the schedule</li>
							<li>Some minor UI fixes</li>
							<li>Added "Cash collection" button in service menu</li>
						</ol>
						<h2 id="1.7.0.1893">Version 1.7.0.1893</h2>
						<ol>
							<li>New implementation of MEI SC cash validator</li>
							<li>Some minor changes in installer</li>
							<li>
								Support for{' '}
								<a
									href="https://coinatmradar.com/manufacturer/87/trovemat-bitcoin-atm-producer/"
									target="_blank"
									rel="noopener noreferrer"
								>
									CoinAtmRadar
								</a>{' '}
								status reporting
							</li>
							<li>Continue accepting cash if recycler drum is full</li>
						</ol>
						<h2 id="1.7.0.1863">Version 1.7.0.1863</h2>
						<ol>
							<li>
								Passing point name to{' '}
								<a href={`https://dashboard.${window.location.host}`} target="_blank" rel="noopener noreferrer">
									ATM dashboard
								</a>
							</li>
						</ol>
						<h2 id="1.7.0.1852">Version 1.7.0.1852</h2>
						<ol>
							<li>Multicurrency support in cash-in / cash-out operations</li>
							<li>Multiple different formats for current device state</li>
							<li>
								Supported cloud-based{' '}
								<a href={`https://dashboard.${window.location.host}`} target="_blank" rel="noopener noreferrer">
									ATM dashboard
								</a>
							</li>
							<li>New look of the service menu</li>
							<li>Guidelights support for Trovemat T2 PRO model</li>
							<li>Fixed XMPP issue with unstable internet connection</li>
							<li>Preparing for fingerprint scanner</li>
							<li>Combined cash-out using cash dispenser and cash recycler</li>
							<li>Various performance and UI updates</li>
						</ol>
						<h2 id="1.6.0.1728">Version 1.6.0.1728</h2>
						<ol>
							<li>New devices (cash dispenser, face camera, cash recycler)</li>
							<li>Photo from any camera, attached to ATM</li>
							<li>Deep customization of the interface with user settings</li>
							<li>More accurate use of TOX nodes.</li>
							<li>Added user-defined disclaimers for main screen and money entry screen</li>
							<li>New look of some screens (language selection, phone country code selection)</li>
							<li>Hourly / Daily / Monthly limits for cash-in / cash-out for single device per user</li>
							<li>New crypto -> cash scenario</li>
							<li>Speed-up of the "Search devices" function in service menu</li>
							<li>New functions in service menu</li>
							<li>JetCrypto Monitoring subsystem is now can be used instead of TOX</li>
							<li>More stable payment processing in case of connection problems</li>
							<li>Accurate statistic counters in case of using rate addendum as a profit source</li>
							<li>Dynamic load of network fee</li>
							<li>Reading JetCrypto keys from QR-code, generated in JetCrypto Dashboard</li>
						</ol>
						<h2 id="1.5.3.1637">Version 1.5.3.1637</h2>
						<ol>
							<li>Update for cash withdrawal scenario </li>
						</ol>
						<h3>!WARNING! operators.xml scenario must be updated manually! !WARNING!</h3>
						<h4>Version remarks</h4>
						<p>How to install update for cashout scenario:</p>
						<p>Run following TOX commands:</p>
						<ol className="no-counter">
							<li>
								<div className="copied_command">
									<p className="clickable_command">
										settings set ‘operators.cashout.money_frozen._CURRENCY->network_id’ ‘fiatCurrency’
									</p>
									<button className="write-btn">
										<span className="button_overlay"></span>
										<span className="copy-icon">
											<svg width="30" height="30">
												<use xlinkHref="#copy-icon" />
											</svg>
										</span>
										<span className="done-icon" style={{ display: 'none' }}>
											<svg width="30" height="30">
												<use xlinkHref="#done-icon" />
											</svg>
										</span>
									</button>
								</div>
							</li>
							<li>
								<div className="copied_command">
									<p className="clickable_command">
										settings set ‘operators.cashout.money_frozen._CURRENCY->type’ ‘request_field’
									</p>
									<button className="write-btn">
										<span className="button_overlay"></span>
										<span className="copy-icon">
											<svg width="30" height="30">
												<use xlinkHref="#copy-icon" />
											</svg>
										</span>
										<span className="done-icon" style={{ display: 'none' }}>
											<svg width="30" height="30">
												<use xlinkHref="#done-icon" />
											</svg>
										</span>
									</button>
								</div>
							</li>
							<li>
								<div className="copied_command">
									<p className="clickable_command">
										settings set ‘operators.cashout.money_frozen._WITHDRAWAL->network_id’ ‘fiatAmount’
									</p>
									<button className="write-btn">
										<span className="button_overlay"></span>
										<span className="copy-icon">
											<svg width="30" height="30">
												<use xlinkHref="#copy-icon" />
											</svg>
										</span>
										<span className="done-icon" style={{ display: 'none' }}>
											<svg width="30" height="30">
												<use xlinkHref="#done-icon" />
											</svg>
										</span>
									</button>
								</div>
							</li>
							<li>
								<div className="copied_command">
									<p className="clickable_command">
										settings set ‘operators.cashout.money_frozen._WITHDRAWAL->type’ ‘request_field’
									</p>
									<button className="write-btn">
										<span className="button_overlay"></span>
										<span className="copy-icon">
											<svg width="30" height="30">
												<use xlinkHref="#copy-icon" />
											</svg>
										</span>
										<span className="done-icon" style={{ display: 'none' }}>
											<svg width="30" height="30">
												<use xlinkHref="#done-icon" />
											</svg>
										</span>
									</button>
								</div>
							</li>
							<li>
								<div className="copied_command">
									<p className="clickable_command">
										settings set ‘operators.cashout.money_frozen._FEE->network_id’ ‘fiatFee’
									</p>
									<button className="write-btn">
										<span className="button_overlay"></span>
										<span className="copy-icon">
											<svg width="30" height="30">
												<use xlinkHref="#copy-icon" />
											</svg>
										</span>
										<span className="done-icon" style={{ display: 'none' }}>
											<svg width="30" height="30">
												<use xlinkHref="#done-icon" />
											</svg>
										</span>
									</button>
								</div>
							</li>
							<li>
								<div className="copied_command">
									<p className="clickable_command">
										settings set ‘operators.cashout.money_frozen._FEE->type’ ‘request_field’
									</p>
									<button className="write-btn">
										<span className="button_overlay"></span>
										<span className="copy-icon">
											<svg width="30" height="30">
												<use xlinkHref="#copy-icon" />
											</svg>
										</span>
										<span className="done-icon" style={{ display: 'none' }}>
											<svg width="30" height="30">
												<use xlinkHref="#done-icon" />
											</svg>
										</span>
									</button>
								</div>
							</li>
						</ol>
						<h2 id="1.5.3.1617">Version 1.5.3.1617</h2>
						<ol>
							<li>
								New cash withdrawal scenario
								<h3>!WARNING! operators.xml scenario must be updated manually! !WARNING!</h3>
							</li>
							<li>Some UI improvements</li>
							<li>JetCrypto dashboard support</li>
						</ol>
						<h4>Version remarks</h4>
						<p>How to install new cashout scenario:</p>
						<ol>
							<li>
								Download operators.xml file using TOX command:
								<br />
								<div className="copied_command">
									<p className="clickable_command">download &#34;configs/operators.xml&#34;</p>
									<button className="write-btn">
										<span className="button_overlay"></span>
										<span className="copy-icon">
											<svg width="30" height="30">
												<use xlinkHref="#copy-icon" />
											</svg>
										</span>
										<span className="done-icon" style={{ display: 'none' }}>
											<svg width="30" height="30">
												<use xlinkHref="#done-icon" />
											</svg>
										</span>
									</button>
								</div>
							</li>
							<li>
								Replace all content of the <span className="code">&#60;cashout&#62;</span> tag (including{' '}
								<span className="code">&#60;cashout&#62;</span> tag itself) with the following:
								<Highlight className="xml">
									{/* eslint-disable */
									`<cashout name="cashout" >
		<check_printer type="check_printer" />
		<enter_phone type="data_entry" >
            <phone field_style="phone" title="enter_your_phone_number" keyboard="numbers" regexp="(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$" />
        </enter_phone>
		<check_account type="check" path="/api/Trovemat/User/userExists" method="GET" >
            <phone network_id="phoneNumber" type="request_field" />
			<redeemCodeExists type="receive_field" />
			<userSessionExists type="receive_field" />
			<userId type="receive_field" />
			<userState type="receive_field" />
        </check_account>
		<switch_user type="switch" >
			<repeat_phone field="userState" value="0" next_step="repeat_phone" />
			<create_pin_code field="userState" value="1" next_step="create_pin_code" />
		</switch_user>
		<enter_pin_code type="data_entry" >
            <pinCode title="enter_pin_code" keyboard="numbers" print="0" regexp="[0-9]{4,12}" />
        </enter_pin_code>
		<switch_user_2 type="switch" >
			<create_redeem_code field="userState" value="2" next_step="get_user_accounts" />
			<get_user_accounts field="userState" value="3" next_step="get_user_accounts" />
		</switch_user_2>
  		<repeat_phone type="data_entry" >
            <phone_duplicate field_style="phone" title="repeat_your_phone_number" keyboard="numbers" regexp="(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$" />
        </repeat_phone>
        <check_phone type="condition">
        	<not_equal lh_field="phone_duplicate" rh_field="phone" next_step="enter_phone" />
        </check_phone>
		<create_pin_code type="data_entry" >
            <pinCode title="create_pin_code" keyboard="numbers" print="0" regexp="[0-9]{4,12}" />
        </create_pin_code>
		<repeat_pin_code type="data_entry" >
            <pinCode_duplicate title="repeat_pin_code" keyboard="numbers" print="0" regexp="[0-9]{4,12}" />
        </repeat_pin_code>
        <check_pin_code type="condition">
        	<not_equal lh_field="pinCode" rh_field="pinCode_duplicate" next_step="create_pin_code" />
        </check_pin_code>
		<register_user_by_phone type="check" path="/api/Trovemat/User/registerByPhone" method="POST" >
			<phone type="request_field" />
			<pinCode type="request_field" />
		</register_user_by_phone>
		<get_user_accounts type="check" path="/api/Trovemat/Withdraw/withdrawAccounts" method="POST" >
			<phone network_id="phoneNumber" type="request_field" />
			<pinCode type="request_field" />
			<userAccounts type="receive_field" value_type="array" />
        </get_user_accounts>
		<enter_crypto_currency type="data_entry" >
            <userAccounts title="choose_crypto_currency" input_type="list" />
			<userAccountId input_type="choice" />
        </enter_crypto_currency>
		<switch_action type="switch" >
			<generate_redeem field="action" value="getRedeem" next_step="get_deposit_address" />
			<init_cashout field="action" value="getCash" next_step="init_cashout" />
		</switch_action>
		<get_deposit_address type="check" path="/api/Trovemat/User/getCryptoAddress" method="GET" >
			<phone network_id="phoneNumber" type="request_field" />
			<userAccountId type="request_field" />
			<cryptoAccountAddress network_id="cryptoAddress" type="receive_field" value_type="qrcode" screen="1" />
			<accountBalance network_id="balance" type="receive_field" />
		</get_deposit_address>
		<create_redeem_code type="check" path="/api/Trovemat/User/getRedeemCode" method="POST" >
			<phone type="request_field" />
			<pinCode network_id="PinCode" type="request_field" />
			<redeemCode type="request_field" />
		</create_redeem_code>
		<print_make_order type="print" check_name="redeem.chq" />
		<make_order_done type="message" sub_type="order_maked" />
		<init_cashout type="init_cashout" />
		<enter_redeem type="data_entry" >
            <redeemCode title="enter_redeem_code" keyboard="numbers" print="0" regexp="[0-9]{8}" />
        </enter_redeem>
		<set_cashout type="set_cashout" dispense_amounts="10,20,50,100,200,500" />
	    <money_frozen type="check" path="/api/Trovemat/Withdraw/moneyInit" method="POST" >
			<phone network_id="phoneNumber" type="request_field" />
			<pinCode type="request_field" />
			<redeemCode type="request_field" />
			<userAccountId type="request_field" />
			<_WITHDRAWAL_CRYPTO network_id="amount" type="request_field" />
			<paymentId network_id="id" type="receive_field" />
        </money_frozen>
		<cashout type="cashout" />
		<print_cashout type="print" check_name="cashout.chq" failed_check_name="cashout_failed.chq" />
		<withdraw_done type="message" sub_type="cashout" />
	</cashout>`}
								</Highlight>
							</li>
						</ol>
						<ol>
							<li>Upload edited operators.xml back to Trovemat</li>
							<li>
								Restart Trovemat using TOX command: <br />
								<span className="code">service close</span>
							</li>
						</ol>
						<h2 id="1.5.3.1606">Version 1.5.3.1606</h2>
						<ol>
							<li>
								Daily, hourly, monthly limits for cash-in and cash-out operations. See “Trovemat Kiosk User Guide” on
								jetcrypto.com in “Trovemat Docs” section for more details
							</li>
							<li>Some UI improvements</li>
							<li>Optimized auto-search devices procedure</li>
							<li>More detailed TOX notification for new payment</li>
						</ol>
						<h2 id="1.5.2.1564">Version 1.5.2.1564</h2>
						<ol>
							<li>
								Improvements for <span className="code">‘config.interface->print_paper_wallet’</span> and{' '}
								<span className="code">‘config.interface->input_wallet_manually’</span> flags.
							</li>
							<li>
								‘Refund’ button fix on <span className="code">‘money_entry’</span> screen
							</li>
							<li>
								Custom styles for coin rate buttons on main screen – use{' '}
								<span className="code">‘_css.coin_button_background_color’</span> variable in user.js for change rate
								button color.
							</li>
							<li>
								Custom coin icon size on main screen – use{' '}
								<span className="code">‘_css.main_menu_crypto_icon_size’</span> variable in percents (45% by default).
							</li>
							<li>
								Custom ‘Cash withdrawal’ button text from user.js file – use{' '}
								<span className="code">‘_userLang.LANG_ID.accepted_only_bills’</span> variable. (LANG_ID = “EN”, “ES”,
								…). You can use the following placeholders in that phrase: &#123;min_sum&#125;, &#123;max_sum&#125;.
							</li>
							<li>
								Custom ‘Accepted only bills of …’ phrase from user.js file – use{' '}
								<span className="code">‘_userLang.LANG_ID.money_out_menu_btn’</span> variable. (LANG_ID = “EN”, “ES”,
								…).
							</li>
							<li>
								Custom disclaimer for ‘Cash withdrawal’ scenario from user.js file – use{' '}
								<span className="code">‘_disclaimer_cashout’</span> variable.
							</li>
							<li>
								New timer: <span className="code">‘config.interface.inactivity_timer->disclaimer_modal’</span> in
								seconds – timeout for waiting client actions while displaying disclaimer text.
							</li>
						</ol>
						<h2 id="1.5.2.1537">Version 1.5.2.1537</h2>
						<ol>
							<li>
								Setting <span className="code">«config.payments->check_min_on_first_note»</span> (“true” or “false”),
								that allow to limit first accepted note to min accepted amount. E.g.{' '}
								<span className="code">«config.payments.limit_min»</span> = 20, then first note can be $20, $50, $100.
								And $10, $5, $2, $1 will not be accepted as first note, only after the first note.
							</li>
							<li>
								Setting <span className="code">«config.payments->do_not_show_real_balance_as_max_limit»</span> (“true”
								or “false”) – allow owner to “hide” his real balance on money entry screen, when balance is lower than
								maximum accepted amount for chosen coin.
							</li>
							<li>
								Setting <span className="code">«config.payments->rates_addendum»</span> (decimal with 2 decimal places)
								– that setting is a percent, that will be added to coins rate without notifying user about that. That
								way owner can “hide” fee inside bigger rate, instead of showing fee as a separate number.
							</li>
							<li>
								Setting <span className="code">«config.interface->print_paper_wallet»</span> (“true” or “false”) – flag
								that allow to hide “Print paper wallet” button on wallet scan screen.
							</li>
							<li>
								Setting <span className="code">«config.interface->input_wallet_manually»</span> (“true” or “false”) -
								flag that allow to hide “Input wallet address manually” button on wallet scan screen.
							</li>
							<li>OAUTH step type (specific for smartid.ee website).</li>
							<li>
								Owner-defined dislaimer before coin purchase – you have to fill{' '}
								<span className="code">“_disclaimer”</span> variable in /opt/trovemat/user/user.js file, and that text
								user have to confirm before proceed to purchase scenario.
							</li>
							<li>Screensaver for main screen.</li>
							<li>Fixed some UI issues.</li>
						</ol>
					</div>
				</div>
			</div>
		);
	}
}
