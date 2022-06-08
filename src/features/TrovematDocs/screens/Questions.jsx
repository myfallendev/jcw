import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Questions extends Component {
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
						<h1>Frequently Asked Questions</h1>
						<div className="faq-content__menu-list">
							<h2>List of questions:</h2>
							<ol>
								<li>
									<a href="#work">How does Trovemat Kiosk work?</a>
								</li>
								<li>
									<a href="#buy_crypto">
										Can you please describe client journey of the Trovemat? How clients can buy cryptocurrency in
										Trovemat Kiosk?
									</a>
								</li>
								<li>
									<a href="#crypto_terminal_business">
										Can you describe the main flow-chart for a Trovemat? How can you describe the flow of the money?
									</a>
								</li>
								<li>
									<a href="#exchanges">Which cryptocurrency exchanges are supported by Trovemat?</a>
								</li>
								<li>
									<a href="#crypto_currencies">
										Which cryptocurrency can I buy? Where the conversion rate is calculating?
									</a>
								</li>
								<li>
									<a href="#fiat_currencies">Which fiat currency accepted by your kiosk?</a>
								</li>
								<li>
									<a href="#client">Trovemat client can top-up any wallet using Kiosk?</a>
								</li>
								<li>
									<a href="#specialist">
										Which experience Trovemat owner (or his employee) must have in order to maintain and support kiosk?
										Do I need to complete some courses for that?
									</a>
								</li>
								<li>
									<a href="#power_consumption">What about power consumption of the kiosk?</a>
								</li>
								<li>
									<a href="#peripherals">Which hardware is supported by Trovemat software?</a>
								</li>
								<li>
									<a href="#payment">How can I pay for Trovemat Kiosk?</a>
								</li>
								<li>
									<a href="#delivery">Delivery</a>
								</li>
								<li>
									<a href="#guarantee">What about warranty perios and software updates?</a>
								</li>
							</ol>
						</div>
						<h2 id="work">How does Trovemat Kiosk work?</h2>
						<p>Trovemat software steps:</p>
						<ul>
							<li>Accept cash</li>
							<li>
								Determine wallet address, where to transfer cryptocurrency:
								<ul>
									<li>Scan existing wallet address from QR-code (mobile phone, paper wallet, etc)</li>
									<li>Enter existing wallet address using on-screen keyboard</li>
									<li>
										Create new paper-wallet (if available) directly on kiosk, if the user doesn’t have any wallet yet
									</li>
								</ul>
							</li>
							<li>Print receipt to client (including paper-wallet, if it was created)</li>
						</ul>
						<p>
							Watch video, showing Trovemat software example:{' '}
							<a href="https://youtu.be/6f3cR620obs" target="_blank" rel="noopener noreferrer">
								https://youtu.be/6f3cR620obs
							</a>
						</p>
						<p>
							Technical information can be found at:{' '}
							<a href="https://trovemat.com" target="_blank" rel="noopener noreferrer">
								https://trovemat.com
							</a>
						</p>
						<p>
							Install guide can be found here:{' '}
							<a href="./user-guide" target="_blank" rel="noopener noreferrer">
								“Install Trovemat software guide”
							</a>
						</p>
						<h2 id="buy_crypto">
							Can you please describe client journey of the Trovemat? How clients can buy cryptocurrency in Trovemat
							Kiosk?
						</h2>
						<p>Here are process of byuing cryptocurrency in Trovemat Kiosk step-by-step:</p>
						<ol>
							<li>Client insert cash into Kiosk (like in any other vending machines)</li>
							<li>
								Client scans address of the recepient wallet (his wallet, or any other person), or enter wallet address
								using on-screen keyboard, or creates new paper-wallet by pressing corresponding button.
							</li>
							<li>Client enter phone number for KYC procedure (code verification by SMS)</li>
							<li>
								Trovemat software performs query to{' '}
								<a href="http://api.jetcrypto.com" target="_blank" rel="noopener noreferrer">
									api.jetcrypto.com
								</a>{' '}
								for SMS verification code (using phone number, provided by the client at previous step)
							</li>
							<li>Client enters verification code, received by SMS</li>
							<li>
								Trovemat software performs query to cryptocurrency exchange in order to transfer cryptocurrency from
								owner’s wallet to client wallet
							</li>
							<li>Cryptocurrency exchange performs withdrawal operation</li>
							<li>
								Trovemat software prints receipt for the client with payment details (transferred amount, wallet, etc)
							</li>
							<li>
								Client receives SMS with transactionId (if available) of the performed operation, which can be checked
								in the corresponding blockchain
							</li>
						</ol>
						<h2 id="crypto_terminal_business">
							Can you describe the main flow-chart for a Trovemat? How can you describe the flow of the money?
						</h2>
						<img className="trvmt_schema" src="/img/trovemat_flow_of_funds.png" alt="Schema Trovemat flow of funds" />
						<ol>
							<li>
								Trovemat owner deposit his account on any of the supported cryptocurrency exchanges (it doesn’t matter
								in which currency - crypto or fiat)
							</li>
							<li>
								In owner’s account on the cryptocurrency exchange owner must generate keys for accessing exchange API
								(for performing withdrawal operations)
							</li>
							<li>Trovemat owner saves API keys in Trovemat software</li>
							<li>Client inserts cash into Trovemat Kiosk</li>
							<li>
								After KYC procedure and determining destination wallet address, Trovemat software sends a withdrawal
								command to cryptocurrency exchange, using destination wallet address.
							</li>
							<li>Cryptocurrency exchange performs withdrawal command to destination wallet address</li>
							<li>
								Trovemat owner performs money collection procedure from Kiosk when cashbox is filled up with fiat money
							</li>
						</ol>
						<h2 id="exchanges">Which cryptocurrency exchanges are supported by Trovemat?</h2>
						<p>The list of supported cryptocurrency exchanges:</p>
						<ul>
							<li>
								<a target="_blank" rel="noopener noreferrer" href="https://exmo.com">
									https://exmo.com
								</a>
							</li>
							<li>
								<a target="_blank" rel="noopener noreferrer" href="https://poloniex.com">
									https://poloniex.com
								</a>
							</li>
							<li>
								<a target="_blank" rel="noopener noreferrer" href="https://bittrex.com">
									https://bittrex.com
								</a>
							</li>
							<li>
								<a target="_blank" rel="noopener noreferrer" href="https://bitfinex.com">
									https://bitfinex.com
								</a>
							</li>
							<li>
								<a target="_blank" rel="noopener noreferrer" href="https://jetcrypto.com">
									https://jetcrypto.com
								</a>
							</li>
							<li>
								<a target="_blank" rel="noopener noreferrer" href="https://cryptopia.co.nz">
									https://cryptopia.co.nz
								</a>
							</li>
						</ul>
						<p>This list is a subject to change upon request.</p>
						<h2 id="crypto_currencies">Which cryptocurrency can I buy? Where the conversion rate is calculating?</h2>
						<p>
							You can buy any of the cryptocurrency, supported by concrete cryptocurrency exchange (from the list of
							supported exchanges). Conversion rates are setup by Trovemat software. Rates for displaying on the main
							page Trovemat software can get from concrete exchange (if available), or from aggregator such as{' '}
							<a href="http://coinmarketcap.com" target="_blank" rel="noopener noreferrer">
								coinmarketcap.com
							</a>{' '}
							(or any other supported by Trovemat software)
						</p>
						<h2 id="fiat_currencies">Which fiat currency accepted by your kiosk?</h2>
						<p>Here is a list of all accepted currencies:</p>
						<p>
							(Currency name -{' '}
							<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/ISO_4217">
								ISO-4217
							</a>{' '}
							Code)
						</p>
						<ol>
							<li>Albanian lek - ALL</li>
							<li>Algerian Dinar - DZD</li>
							<li>Angolan kwanza - AOA</li>
							<li>Argentine peso - ARS</li>
							<li>Armenian dram - AMD</li>
							<li>Australian dollar - AUD</li>
							<li>Azerbaijani manat - AZN</li>
							<li>Bahraini dinar - BHD</li>
							<li>Bangladeshi taka - BDT</li>
							<li>Belarusian ruble - BYR, BYN</li>
							<li>Boliviano - BOB</li>
							<li>Bosnia and Herzegovina convertible mark - BAM</li>
							<li>Botswana pula - BWP</li>
							<li>Brazilian real - BRL</li>
							<li>Bulgarian lev - BGL, BGN</li>
							<li>Canadian dollar - CAD</li>
							<li>Cayman Islands dollar - KYD</li>
							<li>CFA franc BEAC - XAF</li>
							<li>CFP franc (franc Pacifique) - XPF</li>
							<li>Chilean peso - CLP</li>
							<li>Renminbi (Chinese) yuan - RMB, CNY</li>
							<li>Colombian peso - COP</li>
							<li>Costa Rican colon - CRC</li>
							<li>Croatian kuna - HRK</li>
							<li>Czech koruna - CZK</li>
							<li>Danish krone - DKK</li>
							<li>Dominican peso - DOP</li>
							<li>East Caribbean dollar - XCD</li>
							<li>Egyptian pound - EGP</li>
							<li>Pound sterling - GBP</li>
							<li>Estonian kroon - EEK</li>
							<li>Euro - EUR</li>
							<li>Georgian lari - GEL</li>
							<li>Ghanaian cedi - GHS</li>
							<li>Gibraltar pound - GIP</li>
							<li>Guatemalan quetzal - GTQ</li>
							<li>Honduran lempira - HNL</li>
							<li>Hong Kong dollar - HKD</li>
							<li>Hungarian forint - HUF</li>
							<li>Icelandic króna - ISK</li>
							<li>Indonesian rupiah - IDR</li>
							<li>Israeli new shekel - ILS</li>
							<li>Jamaican dollar - JMD</li>
							<li>Japanese yen - JPY</li>
							<li>Jordanian dinar - JOD</li>
							<li>Kazakhstani tenge - KZT</li>
							<li>Kenyan shilling - KES</li>
							<li>South Korean won - KRW</li>
							<li>Kuwaiti dinar - KWD</li>
							<li>Kyrgyzstani som - KGS</li>
							<li>Lebanese pound - LBP</li>
							<li>Lesotho loti - LSL</li>
							<li>Macanese pataca - MOP</li>
							<li>Macedonian denar - MKD</li>
							<li>Malagasy ariary - MGA</li>
							<li>Malawian kwacha - MWK</li>
							<li>Malaysian ringgit - MYR</li>
							<li>Mauritian rupee - MUR</li>
							<li>Mexican peso - MXP, MXN</li>
							<li>Moldovan leu - MDL</li>
							<li>Mongolian tögrög - MNT</li>
							<li>Moroccan dirham - MAD</li>
							<li>Mozambican metical - MZN</li>
							<li>Namibian dollar - NAD</li>
							<li>New Zealand dollar - NZD</li>
							<li>Nicaraguan córdoba - NIO</li>
							<li>Nigerian naira - NGN</li>
							<li>Norwegian krone - NOK</li>
							<li>Omani rial - OMR</li>
							<li>Paraguayan guaraní - PYG</li>
							<li>Peruvian Sol - PEN</li>
							<li>Philippine piso - PHP</li>
							<li>Polish złoty - PLZ, PLN</li>
							<li>Qatari riyal - QAR</li>
							<li>Romanian leu - ROL, RON</li>
							<li>Russian ruble - RUR, RUB</li>
							<li>Rwandan franc - RWF</li>
							<li>Saudi riyal - SAR</li>
							<li>Serbian dinar - RSD</li>
							<li>Seychelles rupee - SCR</li>
							<li>Singapore dollar - SGD</li>
							<li>South African rand - ZAR</li>
							<li>Sri Lankan rupee - LKR</li>
							<li>Sudanese pound - SDG</li>
							<li>Surinamese dollar - SRD</li>
							<li>Swazi lilangeni - SZL</li>
							<li>Swedish krona/kronor - SEK</li>
							<li>Swiss franc - CHF</li>
							<li>New Taiwan dollar - TWD</li>
							<li>Tajikistani somoni - TJS</li>
							<li>Tanzanian shilling - TZS</li>
							<li>Thai baht - THB</li>
							<li>Trinidad and Tobago dollar - TTD</li>
							<li>Tunisian dinar - TND</li>
							<li>Turkish lira - TRL, TRY</li>
							<li>Turkmenistan manat - TMT</li>
							<li>Ugandan shilling - UGX</li>
							<li>Ukrainian hryvnia - UAH</li>
							<li>United Arab Emirates dirham - AED</li>
							<li>United States dollar - USD</li>
							<li>Uruguayan peso - UYU</li>
							<li>Uzbekistan som - UZS</li>
							<li>Venezuelan bolívar - VEB, VEF</li>
							<li>Vietnamese đồng - VND</li>
							<li>CFA franc BCEAO - XOF</li>
							<li>Yemeni rial - YER</li>
							<li>Zambian kwacha - ZMW, ZMK</li>
						</ol>
						<h2 id="client">Trovemat client can top-up any wallet using Kiosk?</h2>
						<p>
							Yes, Trovemat client can use any valid wallet address for any cryptocurrency, supported by Trovemat
							software.
						</p>
						<h2 id="specialist">
							Which experience Trovemat owner (or his employee) must have in order to maintain and support kiosk? Do I
							need to complete some courses for that?
						</h2>
						<p>
							Almost all configuration and support for the software can be done through TOX client (changing
							configuration files, viewing log files, updating software). Maintainer must understand the principles of
							modifying XML-files, and must be prepared to communicate with Trovemat software using any software,
							supported TOX protocol.
						</p>
						<h2 id="power_consumption">What about power consumption of the kiosk?</h2>
						<p>
							Power consumption of the Kiosk: 200 Watts – 500 Watts, depending of the kiosk current state. For example:
							in-service mode (main screen displayed) - 200 Watts, all devices working (receipt printer, display, cash
							identification module) - 500 Watts.
						</p>
						<h2 id="peripherals">Which hardware is supported by Trovemat software?</h2>
						<p>Cash identification modules:</p>
						<ol>
							<li>MEI SC Advance / Cashflow SC (RS-232 connection, using MEI EBDS communication protocol)</li>
						</ol>
						<p>Receipt printers:</p>
						<ol>
							<li>CUSTOM VKP-80II (USB / RS-232)</li>
							<li>CUSTOM TG-2480 (USB / RS-232)</li>
							<li>Nippon NP-F3092D</li>
						</ol>
						<p>Touchscreen:</p>
						<p>Any model, supported by OS.</p>
						<h2 id="payment">How can I pay for Trovemat Kiosk?</h2>
						<p>
							After you place your order on our web-site, we will contact with you about payment details. We require
							100% payment of the order before order will be processed.
						</p>
						<h2 id="delivery">Delivery</h2>
						<p>
							We deliver Kiosks all over the world, delivery dates to your country depends on the presence of the Kiosks
							on the nearest warehouse. We can use any company by your choice to arrange the delivery. Delivery cost
							will be included in the invoice.
						</p>
						<h2 id="guarantee">What about warranty perios and software updates?</h2>
						<p>
							During warranty period (1 year after purchase) software updates is free (Trovemat Kiosk must have
							unlimited access to{' '}
							<a target="_blank" rel="noopener noreferrer" href="http://api.jetcrypto.com">
								api.jetcrypto.com
							</a>{' '}
							in order to perform automatic updates. After 1 year warranty can be extended, details available upon
							request on <a href="mailto:sales@trovemat.com">sales@trovemat.com</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
