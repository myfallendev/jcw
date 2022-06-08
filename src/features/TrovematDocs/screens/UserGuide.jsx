import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Highlight from 'react-highlight';
import 'highlightjs/styles/github.css';

export class UserGuide extends Component {
	componentDidMount() {
		document.body.addEventListener('click', (e) => {
			const check = (node) => node.classList.contains('write-btn') || node.classList.contains('button_overlay');
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
					.catch((err) => {
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
						<h1>Trovemat Kiosk User Guide</h1>
						<div className="faq-content__menu-list">
							<h2>List of sections:</h2>
							<ol>
								<li>
									<a href="#configs">Kiosk configuration files (configs)</a>
								</li>
								<li>
									<a href="#kiosk_settings">Trovemat software configuration (config.xml)</a>
								</li>
								<li>
									<a href="#menu">Menu (menu.xml)</a>
								</li>
								<li>
									<a href="#operators_list">Operators list (operators.xml)</a>
								</li>
								<li>
									<a href="#black_list">Phones black list (user/phones_black_list.js)</a>
								</li>
								<li>
									<a href="#check_template">Receipt templates (*.chq)</a>
								</li>
								<li>
									<a href="#logs">Logs (Logs&frasl;*.log)</a>
								</li>
								<li>
									<a href="#devices_emulation">Device emulation</a>
								</li>
								<li>
									<a href="#service_buttons">Service keys</a>
								</li>
								<li>
									<a href="#demo">Demo version limitations</a>
								</li>
								<li>
									<a href="#app_features">Trovemat software special notes</a>
								</li>
								<li>
									<a href="#screen_calibration">Calibrating touch-screen</a>
								</li>
								<li>
									<a href="#replace_devices">Peripheral devices replacement.</a>
								</li>
								<li>
									<a href="#settings_admin_list">Setting administrator lists for Trovemat software administration</a>
								</li>
								<li>
									<a href="#settings_exchange">Settings for crytpocurrency exchange</a>
								</li>
								<li>
									<a href="#run_terminal">Exit to command line from Trovemat software</a>
								</li>
							</ol>
						</div>
						<h2 id="configs">Kiosk configuration files (configs)</h2>
						<p>Kiosk configuration files are located in the directory "configs". All files are UTF-8 encoded.</p>
						<ul>
							<li>config.xml - Trovemat software configuration file</li>
							<li>menu.xml - Menu structure</li>
							<li>
								operators.xml - List of, so called, operators (concrete scenarios how to interact with the Kiosk client
								for selling cryptocurrency)
							</li>
							<li>crypto.xml - secure storage for settings</li>
							<li>*_lastgood.xml - last succesfully loaded file</li>
							<li>*_lastbad.xml - last unsuccesfully loaded file</li>
						</ul>
						<p>Example:</p>
						<ol>
							<li>
								If config.xml - correct. After successful validation Trovemat software will copy that file and save it
								as config_lastgood.xml.
							</li>
							<li>
								If operators.xml is wrong. After unsuccessful validation Trovemat software will copy that file and save
								it as operators_lastbad.xml. Then Trovemat software tries to load operators_lastgood.xml, and if it's
								valid - copy operators_lastgood.xml and save it as operators.xml
							</li>
						</ol>
						<h2 id="kiosk_settings">Trovemat software configuration (config.xml)</h2>
						<p>Example:</p>
						<Highlight className="xml">
							{`<config> 
    <parameters logs_storage_period="30" accountings_storage_period="365" receipt_lang="EN" auto_restart="03:00" > 
        <extended_logging>false</extended_logging> 
        <point_name>Trovemat kiosk #1</point_name> 
        <point_id>1</point_id> 
        <auto_update value="true" soft_update="true" time_to_update="00:00:00" interval_to_update="23:59:59" /> 
        <display use="true" width="1280" height="1024" rate="60"/> 
    </parameters> 
    <gateways> 
    <jetcrypto_wallet type="trovemat" url="api.jetcrypto.com" private_key="crypto.jetcrypto_wallet_private_key" public_key="crypto.jetcrypto_wallet_public_key" username="demo" password="crypto.jetcrypto_wallet_password" check="true" pay="true" tasks="3" tasks_interval="300" network_control="true" /> 
    <tox type="tox" > 
    <users> 
        <oleg tox_id="0C91345234446F73B9E55049BF141407841A8A53F70985E0BEDDADCEF1BDC52C3DA1A15BE693" tasks="3" info_task="2" info_state="true" info_full_state="false" info_bill="false" info_payment="true"/> 
    </users> 
    <nodes>
        <node_1 ip="144.76.60.215" port="33445" tox_id="04119E835DF3E78BACF0F84235B300546AF8B936F035185E2A8E9E0A67C8924F" />
        <node_3 ip="128.199.199.197" port="33445" tox_id="B05C8869DBB4EDDD308F43C1A974A20A725A36EACCA123862FDE9945BF9D3E09" /> 
        <node_4 ip="23.226.230.47" port="33445" tox_id="A09162D68618E742FFBCA1C2C70385E6679604B2D80EA6E84AD0996A1AC8A074" /> 
        <node_5 ip="2001:bc8:4400:2100::1c:50f" port="33445" tox_id="2C289F9F37C20D09DA83565588BF496FAB3764853FA38141817A72E3F18ACA0B" /> 
        <node_6 ip="178.21.112.187" port="33445" tox_id="4B2C19E924972CB9B57732FB172F8A8604DE13EEDA2A6234E348983344B23057" /> 
        <node_7 ip="163.172.136.118" port="33445" tox_id="2C289F9F37C20D09DA83565588BF496FAB3764853FA38141817A72E3F18ACA0B" /> 
    </nodes> 
    </tox> 
    <xmpp type="xmpp" use="false" username="kiosk_76726@prvc.im" password="crypto.xmpp_password" use="false" > 
    <users> 
        <oleg xmpp_id="oleg@prvc.im" tasks="3" info_task="2" info_state="true" info_full_state="false" info_bill="false" info_payment="true"/> 
    </users> 
        </xmpp> 
    </gateways> 
    <payments> 
        <gateway>jetcrypto_wallet</gateway> 
        <currency>USD</currency> 
        <currency_control>true</currency_control> 
        <balance_control>true</balance_control> 
        <limit_min>10</limit_min> 
        <limit_max>3000</limit_max> 
        <common_params> 
        <poloniex_public_key>00000000000000000000000000000000000000000000000000000000</poloniex_public_key> 
        </common_params> 
        <time_limits> 
        <cashin currency="USD" hour="1500" day="5000" month="30000" /> 
        <cashin currency="EUR" hour="1000" day="3000" month="20000" /> 
        <cashout currency="USD" hour="1500" day="5000" month="30000" /> 
        <cashout currency="EUR" hour="1000" day="3000" month="20000" /> 
        </time_limits> 
    </payments> 
    <interface show_init_page="true" unit_page_delay="1" lang="EN" h="0" w="0" zoom="0" no_activity_refresh="60"> 
        <menu vending="true" /> 
        <inactivity_timer data_entry="120" message="120" money_entry="120" service_menu="120" /> 
    </interface> 
    <terminal> 
        <init> 
            <app>./startup.sh</app> 
            <timeout></timeout> 
        </init> 
    </terminal> 
    <peripherals> 
        <printer model="" port="" baudrate="9600" extended_logging="config.parameters.extended_logging" show_errors="0" charset_code_table="0" /> 
        <validator model="" port="" baudrate="9600" extended_logging="config.parameters.extended_logging" show_errors="0" /> 
        <camera model="" show_errors="0" /> 
        <auto_search_devices custom="1" mei_ebds="1" ccnet="1" webcam="1" /> 
    </peripherals> 
    <point_info> 
        <dealer_name name="" value="JetCrypto" /> 
        <dealer_address name="" value="Dzērbenes iela 14, Vidzemes priekšpilsēta, Rīga, LV-1006" /> 
        <dealer_phone name="" value="+371 66 555 098" /> 
        <point_address name="" value="Dzērbenes iela 14, Vidzemes priekšpilsēta, Rīga, LV-1006" /> 
    </point_info> 
</config>`}
						</Highlight>
						<blockquote>
							<p>Default values.</p>
							<p>
								If parameter is missing in the configs, or it has value "default" - Trovemat software will load it's
								default value.
							</p>
						</blockquote>
						<blockquote>
							<p>References to another parameter's value.</p>
							<p>
								If parameter value begins with "config." - Trovemat software reads this value as reference to another
								parameter value. In the above example attribute "extended_logging" of tag "barcodereader" is a reference
								to the value of a parameter "extended_logging" in tag "parameters".
							</p>
						</blockquote>
						<ul>
							<li>parameters - common parameters</li>
							<ul>
								<li>logs_storage_period - logs shelf life (days). Default value - 30.</li>
								<li>accountings_storage_period - accounting archives shelf life (days). Default value - 365.</li>
								<li>receipt_lang - language of cheaues templates if using default tamplates.</li>
								<li>
									auto_restart - daily kiosk reboot time in format 'HH: MM'. Default value - 03:00. To turn off daoly
									restart set to empty value.
								</li>
								<li>
									extended_logging - the most complete log files:
									<blockquote>
										<p>
											<strong>
												!!! ATTENTION ! When you turn on extended logging, you must be aware of the fact, that all data
												will be logged in the text files, including sensetive data from devices, not intended to be
												stored in a usual text files !!!
											</strong>
										</p>
										<ul>
											<li>
												<b>"false"</b> (default value) - turned off.
											</li>
											<li>
												<b>"true"</b> - turned on.
											</li>
										</ul>
									</blockquote>
								</li>
								<li>point_id - Identification number of this Kiosk installation. Default value - 0.</li>
								<li>
									point_name - Symbolic name of this Kiosk installation for displaying in messenger as a contact name.
									If this attribute not present or empty - name of the contact would be "Trovemat kiosk #&lt;VALUE FROM
									ATTRIBUTE point_id&gt;".
								</li>
								<li>
									auto_update - auto update. You can also update kiosk by tox command "service update".
									<ul>
										<li>value - enable auto update, default value - "true".</li>
										<li>
											soft_update - default value "true" - after downloading the update files, the program will not
											close until the user's last activity has passed 60 seconds. The similar tox command: "service
											update -soft".
										</li>
										<li>time_to_update - default value "00:00:00".</li>
										<li>
											interval_to_update - default value "23:59:59". This attributes ("time_to_update" and
											"interval_to_update") form the time interval |time_to_update, interval_to_update| - in which
											program tries to update.
										</li>
									</ul>
								</li>
							</ul>
							<li>
								payments - Default parameters for payments. Can be redefined for each operator in "money_entry" step
								inside operators.xml file. Parameters full description can be found at{' '}
								<a href="#operators_list">"Operators"</a> section.
								<ul>
									<li>
										show_fee_rules - attribute - Default value - "true" - display fee calculation rules (max - 12
										items).
									</li>
									<li>show_fee_amount - attribute - Default value - "true" - display calculated fee amount.</li>
									<li>
										check_min_on_first_note - attribute - Default value "false" - possible values “true” or “false” -
										allow to limit first accepted note to min accepted amount. E.g. «config.payments.limit_min» = 20,
										then first note can be $20, $50, $100. And $10, $5, $2, $1 will not be accepted as first note, only
										after the first note.
									</li>
									<li>
										do_not_show_real_balance_as_max_limit - attribute - default value "false" - possible values “true”
										or “false” - allow owner to “hide” his real balance on money entry screen, when balance is lower
										than maximum accepted amount for chosen coin.
									</li>
									<li>
										rates_addendum - attribute - empty by default - decimal with 2 decimal places – that setting is a
										percent, that will be added to coins rate without notifying user about that. That way owner can
										“hide” fee inside bigger rate, instead of showing fee as a separate number. Can be set for operator.
									</li>
									<li>
										rates_source - attribute - default value "cryptocompare" - Rates source for loading crypto
										currencies rates. Possible values: bittrex, poloniex, cryptopia, cryptocompare, yobit.
									</li>
									<li>
										get_rates_interval - attribute - default value "300" - Interval in seconds for loading crypto
										currencies rates from 'rates_source'.
									</li>
									<li>
										fiat_rates_source - attribute - default value "cryptocompare" - Rates source for loading fiat rates
										(USD -> accepted fiat currency rate). Possible values: apilayer, cryptocompare.
									</li>
									<li>
										get_fiat_rates_interval - attribute - default value "1" - Interval in seconds for loading fiat rates
										from 'fiat_rates_source'.
									</li>
									<li>
										fiat_rates_key - attribute - default: empty value - API key for using with 'apilayer' fiat rates
										source
									</li>
									<li>gateway - Default value - "" - Gateway name.</li>
									<li>currency - Default value - "USD".</li>
									<li>currency_control - Default value - "true".</li>
									<li>
										balance_control - Default value - "true". Check balance of the Trovemat owner wallets - if balance
										is not enough to make transaction - Trovemat will be out of service
									</li>
									<li>
										limit_min - Default value - "0". Minimum value of purchase or cash withdrawal. Can be set for
										operator.
									</li>
									<li>
										limit_max - Default value - "1000000". Maximum value of purchase or cash withdrawal. Can be set for
										operator.
									</li>
									<li>payment_type - Default value - "mut_price".</li>
									<li>fee - Empty by default.</li>
									<li>check_name - Default value - "default.chq".</li>
									<li>failed_check_name - Default value - "default_failed.chq".</li>
									<li>common_params - List of parameters, that can be used in operators.xml file like "fields".</li>
									<li>
										time_limits - tag - Hourly, daily and monthly limits for cashin and cashout operations. Differs for
										each accepted or dispensed currency.
										<ul>
											Each tag can describe limit for one currency. For each currency you can set 2 type of limits -
											cashin and cashout.
											<li>
												cashin - tag - cashin limits
												<ul>
													<li>currency - attribute - ISO4217 currency code</li>
													<li>hour - attribute - hourly limit in major currency units</li>
													<li>day - attribute - daily limit in major currency units</li>
													<li>month - attribute - monthly limit in major currency units</li>
												</ul>
											</li>
											<li>
												cashout - tag - cashout limits
												<ul>
													<li>currency - attribute - ISO4217 currency code</li>
													<li>hour - attribute - hourly limit in major currency units</li>
													<li>day - attribute - daily limit in major currency units</li>
													<li>month - attribute - monthly limit in major currency units</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								interface
								<ul>
									<li>
										show_init_page - show init page while wait for initialization of all devices. Default value -
										"true".
									</li>
									<li>
										init_page_delay - time to stay at init page (in seconds) after initialization of all devices.
										Default value - "1".
									</li>
									<li>lang - main page language by default</li>
									<li>
										default_phone_code - ISO 3166-1 country code for "enter phone number" page. If the value of this
										attribute is empty - then country code field will not be filled up with the value. If this attribute
										is missing - then country code by default will be "+1"
									</li>
									<li>
										print_paper_wallet - default value "true" - flag that allow to hide “Print paper wallet” button on
										wallet scan screen.
									</li>
									<li>
										input_wallet_manually - default value "true" - flag that allow to hide “Input wallet address
										manually” button on wallet scan screen.
									</li>
									<li>
										refund_button - default value "false" - flag that allow to show “Refund” button on main screen and
										on the money entry screen.
									</li>
									<li>
										menu - tag, describing main page behavior:
										<ul>
											<li>
												vending - default value "true" - flag, that allow cash acceptance on the main page without
												choosing any cryptocurrency (vending machine logic, when you first insert cash, than choose the
												snack that you want to buy)
											</li>
										</ul>
									</li>
									<li>
										inactivity_timer - Inactivity timeout in seconds for different pages:
										<ul>
											<li>data_entry - "Data entry" page - where client enters (or scan) it's wallet address</li>
											<li>message - "Message" screen to client</li>
											<li>money_entry - Cash acceptance page</li>
											<li>service_menu - Service menu</li>
										</ul>
									</li>
									<li>
										h - sets the height of the resolution for the screen page (content page) - default value "1024".
									</li>
									<li>
										w - sets the width of the resolution for the screen page (content page) - default value "1280".
									</li>
									<li>
										zoom - sets the final zoom of the 'h' and 'w' parameters in percentages - default value "0".
										<p>
											Final height and width can not exceed the screen resolution. The page is always centered on the
											screen.{' '}
										</p>
										<p>
											If zoom = 0, the automatic zoom (auto-zoom) mode is activated: the page completely fit on the
											screen (does not go beyond its borders), with at least two opposite sides touching the screen.
										</p>
										<p>The page displaying algorithm is the following:</p>
										<ul>
											<li>If no page height or width is specified, the default settings are used.</li>
											<li>
												If the height or width is set to 0 (h="0" or w="0"), the screen size parameters are used (with
												zoom="0").
											</li>
											<li>
												If the zoom parameter is not equal to 0 (auto-zoom is switched off), the specified zoom is
												applied.
											</li>
										</ul>
									</li>
									<li>
										no_activity_refresh - refresh web-application while IN-SERVICE mode without any user activity during
										last N minutes. Default value - 60 (minutes).
									</li>
								</ul>
							</li>
							<li>
								terminal
								<ul>
									<li>init - tag, described parameters for launching application when kiosk starts</li>
									<ul>
										<li>
											app - string - application, that would be launched as a separate process when Trovemat software
											starts. You can write an arguments for that application separeted by spaces, in that string.
										</li>
										<li>
											timeout - integer number - timeout in msek for waiting application to start and finish. If value
											is "-1" - than that timeout is ignored.
										</li>
									</ul>
								</ul>
							</li>
							<li>
								peripherals - describes models and parameters for the devices (e.g. cash identification module or
								receipt printer)
								<ul>
									<li>
										model - device model. Empty value means that there is no device of such type. Default value - "".
									</li>
									<li>port - name of the serial port, used by this device. Default value - "".</li>
									<li>baudrate - Baud rate of the serial port, used by this device. Default value - "9600".</li>
									<li>
										extended_logging - the most complete log files, including all bytes transferred to and from device:
										<blockquote>
											<p>
												<strong>
													!!! ATTENTION ! When you turn on extended logging, you must be aware of the fact, that all
													data will be logged in the text files, including sensetive data from devices, not intended to
													be stored in a usual text files !!!
												</strong>
											</p>
											<ul>
												<li>
													<b>"false"</b> (default value) - turned off.
												</li>
												<li>
													<b>"true'</b> - turned on.
												</li>
											</ul>
										</blockquote>
									</li>
									<li>
										show_errors - flag - show "Out of order" page when device have critical error(s):
										<ul>
											<li>
												<b>"0"</b> (default value) - do not show
											</li>
											<li>
												<b>"1"</b> - show "Out of order" page only if there is no active payments or no unspent cash
											</li>
											<li>
												<b>"2"</b> - show "Out of order" page immediately
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								validator - Supported models (stored in "model" attribute):
								<ul>
									<li>
										<b>"mei_ebds"</b> - MEI (SC or SC Advanced) cash identification module (aka note acceptor). Trovemat
										software supports firmware update for that model (firmware file name - 'mei_ebds.bin').
									</li>
									<li>
										<b>"ccnet"</b> - Cashcode (GX or SM) cash identification module (aka note acceptor). Trovemat
										software supports firmware update for that model (firmware file name - 'cashcode_gx.cf2' for GX and
										'cashcode_sme.ssf' for SM).
									</li>
									<li>
										<b>"mei_scr"</b> - MEI SCR cash recycler module. Trovemat software supports firmware update for that
										model (firmware file name - 'mei_scr.bin'). Supported attributes:
										<ul>
											<li>
												<b>recycling_N</b> - nominal of N-nth (starting from 1) cassette, for example recycling_1="50
												USD". If exists - Trovemat will begin to use that device as a recycler (both cashin and cashout
												will be available). If cash dispenser exists - Trovemat will use both - MEI SCR and cash
												dispenser. MEI SCR will be preferred for cashout.
											</li>
										</ul>
									</li>
									<li>
										<b>"test_validator"</b> - test device emulated by Trovemat software for debug purpose.
									</li>
									<li>
										Common supported attributes:
										<ul>
											<li>
												<b>enabled_currencies</b> - list of accepted currencies (if device firmware supports acceptance
												more than one currency). Empty value means that all supported by the device currencies can be
												accepted. Default value - empty string. Supported syntax:
												<ol>
													<li>
														String with the delimeter "," (comma), it contains 3-symbols ISO-4217 currency codes.
														Example: "EUR,USD" - Allow acceptance of "EURO" (EUR, 978), "US Dollar" (USD, 840).
													</li>
													<li>
														String with the delimeter "," (comma), it contains banknotes descriptions, that allowed to
														accept by device. Syntax for banknote description "CUR:NOM", CUR - 3-symbols ISO-4217
														currency code, NOM - nominal of that banknote in main unit of the currency. Example:
														"EUR:50,EUR:100,USD:10,USD:100" - allowed to accept "50 Euro" (EUR, 978, 50EUR), "100 Euro"
														(EUR, 978, 100EUR), "10 US Dollars" (USD, 840, 10USD), "100 US Dollars" (USD, 840, 100USD).
													</li>
												</ol>
											</li>
										</ul>
									</li>
									<li>
										Firmware update. When Trovemat software starts, it check for existence of firmware archive file in
										the './system/firmware' directory of Trovemat software installation, and, if that file exists,
										performs firmware update for the device. If firmware update was successfull, then that file is
										deleted.
									</li>
								</ul>
							</li>
							<li>
								printer - Supported models (stored in "model" attribute):
								<ul>
									<li>
										<b>"custom"</b> - receipt printers CUSTOM TG 2480 & Custom VKP 80 II.
										<ul>
											<li>
												<b>charset_code_table</b> - number of characters table, used for printing. Default value - "0".
												<ul>
													<li>
														<b>"0"</b> - CP437 (US)
													</li>
													<li>
														<b>"2"</b> - CP850 (Multilingual)
													</li>
													<li>
														<b>"3"</b> - CP860 (Portuguesse)
													</li>
													<li>
														<b>"4"</b> - CP863 (Canadian-French)
													</li>
													<li>
														<b>"5"</b> - CP865 (Nordic)
													</li>
													<li>
														<b>"17"</b> - CP866 (Cyrillic)
													</li>
													<li>
														<b>"19"</b> - CP858 (for Euro symbol 213)
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li>
										<b>"np-f3092d"</b> - Receipt printer Nippon NP-F3092D.
									</li>
									<li>
										<b>"test_printer"</b> - test device emulated by Trovemat software for debug purpose.
									</li>
								</ul>
							</li>
							<li>
								dispenser - Supported models (stored in "model" attribute):
								<ul>
									<li>
										<b>"puloon_lcdm"</b> - Banknotes dispenser "Puloon LCDM1000/2000" (1 and 2 cassettes respectively).
									</li>
									<li>
										<b>"fujitsu_f5x"</b> - Banknotes dispenser "Fujitsu F53" (2 cassettes respectively).
									</li>
									<li>
										<b>"test_dispenser"</b> - test device emulated by Trovemat software for debug purpose (2 cassettes).
									</li>
								</ul>
								<p>
									Following attributes must be specified for each cassette in dispenser (cassette number starts from 0):
								</p>
								<ul>
									<li>cassette_N - nominal of N-nth (starting from 0) cassette, for example cassette_0="100 USD".</li>
									<li>
										default_capacity_N - banknotes count by default for N-nth cassette (admin can change that value
										during service procedures), for example: default_capacity_0="1000".
									</li>
								</ul>
								<p>Following attributes (not mandatory):</p>
								<ul>
									<li>
										max_dispense_items - unlimited if missing or empty - maximum number of notes, that can be dispensed
										during one cashout operation.
									</li>
								</ul>
							</li>
							<li>
								camera - Supported models (stored in "model" attribute):
								<ul>
									<li>
										<b>"webcam"</b> - any webcam is compatible with your operating system.
									</li>
									<li>
										<b>"test_camera"</b> - test device emulated by Trovemat software for debug purpose.
									</li>
									<li>
										test_code - qr-code value scanned by test camera (see "Device emulation"). Default value -
										1Test18BrEkPVue1J9FXBRaHRavmzAiek.
									</li>
								</ul>
							</li>
							<li>
								auto_search_devices - describes device models, that can be found using "Auto search devices" function
								from the service menu. Each attribute (or nested tag) is the name of the device, that can be found. If
								the name is not on that list - it will not be found during auto search of the devices. If that tag is
								empty or missing - then every supported device can be found during auto search. This tag is missing by
								default. Throwing out devices from auto search, that will never can be found, dramatically decrease the
								duration of the auto search procedure. E.g. on Trovemat T1 it is unnecessary to search for cash
								dispenser, or, e.g. if you have only MEI validators, than you can disable autosearch for CashCode cash
								validator.
							</li>
							<li>
								point_info - In that section you can setup unlimited parameters with any name. These parameters will be
								interpreted as fields during client session. These fields can be used in receipts and in requests to
								gateways. "Id" of the field has name like _INFO_*, where * - name of the field written in uppercase
								letters. Name and value of the field can be setup by "name" and "value" attributes. Example:
								&lt;dealer_name name="Dealer" value="Trovemat services seller, Gmbh" /&gt; will be translated into field
								with id="_INFO_DEALER_NAME", name="Dealer" and value="Trovemat services seller, Gmbh".
							</li>
							<li>
								gateways - In that section you can setup unlimited number of tags, describing connections to different
								servers.
								<p>
									Name of child tag - it's the name of the gateway, which can be used in steps descriptions (see
									attribute "gateway" of tag "step"). For each gateway you have to specify following attributes:
								</p>
								<ul>
									<li>use - use current gateway. Default value - "true".s</li>
									<li>
										type - Gateway type. Available types:
										<ul>
											<li>
												<b>"trovemat"</b> - gateway for accessing api.jetcrypto.com.
												<p>Additional attributes for that gateway:</p>
												<ul>
													<li>url - server address</li>
													<li>private_key - private key for JetCrypto account</li>
													<li>public_key - public key for JetCrypto account</li>
													<li>username - login for JetCrypto account</li>
													<li>password - password for JetCrypto account</li>
													<li>tasks_interval - New tasks request period (seconds). Default value - "1".</li>
													<li>
														network_control - check connection to gateway. If gateway unavailable - kiosk change state
														to "Error". Default value - "true".
													</li>
												</ul>
											</li>
											<li>
												<b>"tox"</b> - gateway for accessing TOX network for Trovemat software.
												<p>Additional attributes for that gateway:</p>
												<ul>
													<li>udp_enabled - use UP protocol. Default value - "true".</li>
													<li>
														local_discovery_enabled - search for another tox-nodes inside local networl. Default value -
														"true".
													</li>
													<li>
														hole_punching_enabled - use "hole-punching" method for search of another tox-nodes. Default
														value - "true".
													</li>
													<li>
														Attributes "udp_enabled", "local_discovery_enabled", "hole_punching_enabled" can be disabled
														in order to minimize network traffic, but in that case you need to use tcp connection to
														node, that supports tcp relay.
													</li>
												</ul>
												<p>Additional tags for that gateway:</p>
												<ul>
													<li>
														users - list of trusted tox-accounts. Name of child tag - name of trusted account.
														<ul>
															<li>tox_id - id of tox contact</li>
															<li>
																message_queue_limit - size of the unsent message queue for that tox contact (if Trovemat
																software or tox account is offline). Default value - "100".
															</li>
														</ul>
													</li>
													<li>
														nodes - node list for connecting to tox network. Name of the child tag - is the name of the
														node.
														<ul>
															<li>ip - ip address of the node</li>
															<li>port - port number of the node</li>
															<li>tox_id - public key of the node</li>
															<li>
																tcp_relay - flag - connecting to tox node using TCP. Will work only if node can accept
																TCP connections and for that gateway UDP is disabled (udp_enabled is "false"). Default
																value - "false".
															</li>
														</ul>
													</li>
												</ul>
											</li>
											<li>
												<b>"xmpp"</b> - gateway for accessing XMPP network for Trovemat software.
												<p>Additional attributes for that gateway:</p>
												<ul>
													<li>username - login for xmpp account</li>
													<li>password - password for xmpp account</li>
												</ul>
												<p>Additional tags for that gateway:</p>
												<ul>
													<li>
														users - list of trusted xmpp-accounts. Name of child tag - name of trusted account.
														<ul>
															<li>xmpp_id - id of xmpp contact</li>
															<li>
																message_queue_limit - size of the unsent message queue for that tox contact (if Trovemat
																software or tox account is offline). Default value - "100".
															</li>
														</ul>
													</li>
												</ul>
											</li>
											<li>
												Some attributes for gateways tags can be set for gateways without users ("trovemat" gateway, for
												example) and in users tags for gateways that works with users ("tox_text" for example):
												<ul>
													<li>
														check - flag - enables gateway without users for info queries from Trovemat software.
														Default value - "false".
													</li>
													<li>
														pay - flag - enables gateway without users for payment queries from Trovemat software.
														Default value - "false".
													</li>
													<li>
														tasks - attribute for user or gateway tag - defines permission level for current
														user/gateway:
														<ul>
															<li>
																<b>"-1"</b> (default value) - all forbidden.
															</li>
															<li>
																<b>"0"</b> - info requests, not changing Kiosk state or settings
															</li>
															<li>
																<b>"1"</b> - service commands (restart, shut down, etc).
															</li>
															<li>
																<b>"2"</b> - change Trovemat software settings
															</li>
															<li>
																<b>"3"</b> - running scripts in OS using Trovemat software account credentials.
															</li>
														</ul>
													</li>
													<li>
														info_task - applied to user - filters all notification below that level about executing
														tasks by other users. For example, if this attribute set to "2", than that user will receive
														notification, when other user tries to execute task with levels "2", "3" and will not
														receive notifications about tasks with levels "0" and "1". Default value - "2".
													</li>
													<li>
														info_full_state - flag - applied to user - receive notifications about changing of a
														detailed state (added or removed one of the factors) of the Trovemat software (for example,
														if receipt printer is low on paper, this will be treated as change of a detailed state)
														Default value - "false".
													</li>
													<li>
														info_state - flag - applied to user - receive notifications about changing of a overall
														state of the Trovemat software (e.g. it's in the error state, or everything fine) - this
														state also used as a state of a TOX account for that Trovemat instance. Default value -
														"false".
													</li>
													<li>
														info_bill - flag - applied to user - receive notifications about accepting/stacking
														banknotes into cassette. Default value - "false".
													</li>
													<li>
														info_payment - flag - applied to user - receive notifications about new payments and
														encashments. Default value - "false".
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
						<h2 id="menu">Menu (menu.xml)</h2>
						<p>
							Menu contains groups and operators. Allowed only 'group' or 'operator' tag inside that file. Attribute
							'type' is required for all tags. All operators in menu must be described in operators list{' '}
							<a href="#operators_list">operators.xml</a>. Operator description in menu and in operators list{' '}
							<a href="#operators_list">operators.xml</a> must have same tag name.
						</p>
						<p>Attributes:</p>
						<ul>
							<li>
								"type" - type of an item. Possible values: "group" - group of operators - when user press that button in
								the menu, list of items from that group will be displayed to client, "operator" - concrete operator -
								when user press that button in the menu, Trovemat software will begin to execute scenario for that
								operator (scenario described in operators list <a href="#operators_list">operators.xml</a>).
							</li>
							<li>
								"name" - Group name. Value must contain key name from file with localized string
								interface/js/language.js for current locale. This name displayed on the screen with group items.
							</li>
						</ul>
						<p>Example of menu.xml for menu, which contains 8 operators on the main page:</p>
						<Highlight className="xml">
							{`<?xml version="1.0" encoding="utf-8"?> 
<menu type="group" name="choose_your_currency" > 
    <bitcoin type="operator" /> 
    <ethereum type="operator" /> 
    <dash type="operator" /> 
    <ripple type="operator" /> 
    <monero type="operator" /> 
    <ethereum_classic type="operator" /> 
    <litecoin type="operator" /> 
    <nem type="operator" /> 
</menu>`}
						</Highlight>
						<h2 id="operators_list">Operators list (operators.xml)</h2>
						<ul>
							<li>
								operator - Operator. Describes payments scenario for that operator. Name of this tag can be in any
								format, according to XML rules.
								<ul>
									<li>
										name - name of the operator, used for loading rate search for paper-wallet generating algorithm
									</li>
									<li>long - long name of the crypto-currency, some data sources using this for loading rate</li>
									<li>short - crypto-currency code, some data sources using this for loading rate</li>
									<li>image - name of the file with operator logo</li>
									<li>
										source_currency - optional attribute, you can set here code of source crypto-currency, which is used
										as a source for exchange operation into destination crypto-currency. E.g., if Trovemat's owner have
										only BTC on the deposit, and current operator tag describes ETH crypto-currency, than Trovemat owner
										can set BTC in this attribute's value. In that case Trovemat first convert deposited fiat amount
										into BTC, than convert that amount of BTC into ETH, than withdrawal that ETH to client's address.
									</li>
									<li>
										step - Step of the scenario.
										<ul>
											<li>
												type - attribute - Type of the step. Required attribute. No default value. Possible values:
												<ul>
													<li>
														<b>"data_entry"</b> - User enters some payment details on that step (e.g. wallet address).
													</li>
													<li>
														<b>"money_entry"</b> - Insert fiat cash by the client. Also you can redefine payment
														parameters default values, saved in conig.xml -> payments:
														<ul>
															<li>
																payment_type - Type of payment. Possible values:
																<ul>
																	<li>
																		<b>"mut_price"</b> - not fixed price.
																	</li>
																	<li>
																		<b>"fix_price"</b> - fixed price.
																	</li>
																</ul>
															</li>
															<li>
																price - item price (for fixed price operator). No default value. Required in case of{' '}
																<b>type="fix_price"</b>.
															</li>
															<li>currency - 3-symbols ISO-4217 currency code.</li>
															<li>
																currency_control - make the operator icon on the screen inactive if set unsupported
																currency.
															</li>
															<li>
																balance_control - make the operator icon on the screen inactive if the balance is less
																than the threshold.
															</li>
															<li>limit_min - Min accepted amount in fiat currency.</li>
															<li>limit_max - Max accepted amount in fiat currency.</li>
															<li>network_fee - fixed network fee in cryptocurrency, added to convinience fee.</li>
															<li>
																crypto_limit_min - Min accepted amount in crypto currency. Default value: network_fee.
															</li>
															<li>crypto_limit_max - Max accepted amount in crypto currency.</li>
															<li>
																fee - Convinience fee, can be setup with different values depends on the amount of
																inserted fiat currency.
																<ul>
																	<li>
																		part - Interval for concrete fee value:
																		<ul>
																			<li>
																				min - min amount of inserted cash. When reached, this fee rate begins to be
																				active for that payment.
																			</li>
																			<li>percent - Percent value for fee.</li>
																			<li>fix - Fix fee rate.</li>
																		</ul>
																	</li>
																	<p>Example:</p>
																	<p>From 0 to 50 - Convinience fee 2% + 2.01 fix</p>
																	<p>From 50 and more - Convinience fee 1%</p>
																	<Highlight className="xml">
																		{`<fee> 
    <part_1 min="0" percent="2" fix="2.01" /> 
    <part_2 min="50" percent="1" fix="0" /> 
</fee>`}
																	</Highlight>
																</ul>
															</li>
														</ul>
													</li>
													<li>
														<b>"check"</b> - Request for conversion rate from cryptocurrency to fiat from exchange.
														<ul>
															<li>
																server - Server name, where to send this request. Values for accessing server saved in
																conig.xml -> network -> &lt;SERVER NAME&gt;
															</li>
															<li>path - Request URL (path). E.g.: "/api/Method"</li>
															<li>
																method - Request method. Possible values:
																<ul>
																	<li>
																		<b>"POST"</b> - POST request. Request body will contain JSON-object, containing
																		fields, described in tags with attribute "type" equals to "request_field" value
																		inside current step.
																	</li>
																	<li>
																		<b>"GET"</b> - GET request. Request body will be empty. Request URL will be filled
																		up with fields, tags with attribute "type" equals to "request_field" value inside
																		current step.
																	</li>
																</ul>
															</li>
														</ul>
													</li>
													<li>
														<b>"pay"</b> - Request to gateway for payment (withdrawal operation from Trovemat owner's
														wallet to client wallet). Parameters for this step are the same, as in "check" step.
													</li>
													<li>
														<b>"print"</b> - Print receipt.
														<ul>
															<li>check_name - name of the receipt template, default value stored in config.xml.</li>
														</ul>
													</li>
													<li>
														<b>"message"</b> - Show some text message to client.
													</li>
												</ul>
											</li>
											<li>
												All child tags with attribute "type" equals to "request_field" - used for steps with type
												"check" and "pay":
												<ul>
													<li>
														id - field id. If value contains symbol "." (point) - in the request with method="POST" this
														field will be saved as nested elements of JSON object. For example, field with id
														"parameters.token" will be sent as JSON object inside requests body: &#123;"parameters"
														&#58; &#123;"token" &#58; "123123123123"&#125;&#125;
													</li>
													<li>
														value - Value for request field. Inside that value you can place reference to another field
														or data, received on any previous step (from user or from gateway). Reference to field,
														filled by client, can be described as "|&lt;NAME OF THE TAG WITH FIELD, FILLED BY
														USER&gt;|". Reference to field, received from gateway (tag with attribute "type" equals to
														"receive_field") can be described as "|&lt;TAG NAME WITH ATTRIBUTE 'TYPE' EQUALS TO
														'receive_field'&gt;|". Example: Assume that scenario executes step with type
														**"data_entry"** and on that step user enters value for tag with the name 'field_wallet'.
														Than in any followed steps we can get that value by using "|field_wallet|" substring. For
														example, string "01-|field_wallet|" - will be translated to "01-123" in case when user
														inputs "123" as wallet address on data entry step with field "field_wallet".
													</li>
												</ul>
											</li>
											<li>
												All child tags with attribute "type" equals to "receive_field" - field, that Trovemat software
												receives from gateway in answer to request.
												<ul>
													<li>
														tag name - name of the parameter in server response. When Trovemat software receives
														response from server, it creates in current client session parameter with name, equal to tag
														name. This parameter will exists only during current client session. This name can be
														referenced in any other field. Example: gateway response contains field with the name "buy".
														In step description we use tag &lt;buy type="receive_field" name="BUY_RECEIVED" /&gt;". Then
														in any other following step, e.g. in step with type "request_field", we can reference to
														that parameter as follows: "|BUY_RECEIVED|" - Trovemat software replace this string with the
														value of the received parameter.
													</li>
													<li>name - name of the parameter inside this step.</li>
												</ul>
											</li>
											<li>
												All child tags can have following attributes:
												<ul>
													<li>network_id - name of the field in request or response.</li>
													<li>name - human readable name of the field (i.e. for receipt)</li>
													<li>description - text description of that field</li>
													<li>value - see "request_field"</li>
													<li>print - if "true" - that field will be printed on the receipt in form "name: value"</li>
													<li>screen - if "true" - that field value will be passed to money_entry screen</li>
													<li>secure - replace content of that field to "***" in logs</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
						<p>Example of operators.xml, contains 2 operators:</p>
						<Highlight className="xml">
							{`<?xml version="1.0" encoding="utf-8"?> 
<operators> 
    <bitcoin name="bitcoin" long="bitcoin" short="BTC" image="btc.png" > 
        <step_0 type="check_printer" /> 
        <step_1 type="money_entry" /> 
        <step_2 type="data_entry" > 
            <field_wallet name="Wallet" barcode_title="scan_your_wallet" title="enter_wallet_address" input_type="barcode" keyboard="text" regexp="^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$" validChars="[a-km-zA-HJ-NP-Z1-9]" control_buttons="SHIFT DEL" language="EN" /> 
        </step_2> 
        <step_3 type="data_entry" > 
            <field_phone name="Phone number" title="enter_your_phone_number" keyboard="numbers" regexp="(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$" /> 
        </step_3> 
        <step_4 type="check" path="/api/trovemat/Phone/verify" method="GET" > 
            <phoneNumber type="request_field" value="|field_phone|" /> 
            <message type="request_field" value="Trovemat verification code: 0" /> 
            <verifyCode type="receive_field" name="VERIFYCODE_RECEIVED" /> 
        </step_4> 
        <step_5 type="data_entry" > 
            <field_code name="Verification code" title="enter_verification_code" keyboard="numbers" print="0" regexp="[0-9]{4,}" /> 
        </step_5> 
        <step_6 type="check" path="validate_verification_code" > 
            <VERIFYCODE_SRC type="request_field" value="|verifyCode|" /> 
            <VERIFYCODE_DST type="request_field" value="|field_code|" /> 
        </step_6> 
        <step_7 type="pay" path="/api/trovemat/Payment" method="POST"> 
            <operatorId type="request_field" value="31" /> 
            <params type="request_field" secure="true" value="{"currency":"BTC","address":"|field_wallet|","secretKey":"|_CRYPTO_poloniex_secret_key|","publicKey":"|_COMMON_poloniex_public_key|","withdrawalAmount":"|WITHDRAWAL_AMOUNT|","phoneNumber":"|field_phone|"}" /> 
            <currencyId type="request_field" value="|_CURRENCY_CODE|" /> 
            <amount type="request_field" value="|_ACCEPTED_MINOR_UNIT|" /> 
        </step_7> 
        <step_8 type="print" check_name="poloniex.chq" failed_check_name="poloniex_failed.chq" /> 
        <step_9 type="message" /> 
    </bitcoin> 
    <ethereum name="ethereum" long="ethereum" short="ETH" image="ethereum.png" > 
        <step_0 type="check_printer" /> 
        <step_1 type="money_entry" /> 
        <step_2 type="data_entry" > 
            <field_wallet name="Wallet" barcode_title="scan_your_wallet" title="enter_wallet_address" input_type="barcode" keyboard="text"  regexp="^(0x)?([0-9a-f]40)|([0-9A-F]40)$" validChars="[a-fA-FxX0-9]" control_buttons="SHIFT DEL" language="EN" /> 
        </step_2> 
        <step_3 type="data_entry" > 
            <field_phone name="Phone number" title="enter_your_phone_number" keyboard="numbers" regexp="(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$" /> 
        </step_3> 
        <step_4 type="check" path="/api/trovemat/Phone/verify" method="GET" > 
            <phoneNumber type="request_field" value="|field_phone|" /> 
            <message type="request_field" value="Trovemat verification code: 0" /> 
            <verifyCode type="receive_field" name="VERIFYCODE_RECEIVED" /> 
        </step_4> 
        <step_5 type="data_entry" > 
            <field_code name="Verification code" title="enter_verification_code" keyboard="numbers" print="0" regexp="[0-9]{4,}" /> </step_5> <step_6 type="check" path="validate_verification_code" > 
            <VERIFYCODE_SRC type="request_field" value="|verifyCode|" /> 
            <VERIFYCODE_DST type="request_field" value="|field_code|" /> 
        </step_6> 
        <step_7 type="pay" path="/api/trovemat/Payment" method="POST"> 
            <operatorId type="request_field" value="31" /> 
            <params type="request_field" secure="true" value="{"currency":"ETH","address":"|field_wallet|","secretKey":"|_CRYPTO_poloniex_secret_key|","publicKey":"|_COMMON_poloniex_public_key|","withdrawalAmount":"|WITHDRAWAL_AMOUNT|","phoneNumber":"|field_phone|"}" /> 
            <currencyId type="request_field" value="|_CURRENCY_CODE|" /> 
            <amount type="request_field" value="|_ACCEPTED_MINOR_UNIT|" /> 
        </step_7> 
        <step_8 type="print" check_name="poloniex.chq" failed_check_name="poloniex_failed.chq" /> 
        <step_9 type="message" /> 
    </ethereum> 
</operators>`}
						</Highlight>

						<h2 id="black_list">Phones black list (user/phones_black_list.js)</h2>
						<p>Phone numbers specified in blacklist won't be able to pass SMS verification validation.</p>
						<p>
							To blacklist specific phone numbers, you need to create a file named <b>phones_black_list.js</b> and
							containing blacklisted phone numbers in specific format (see below) and then upload it to your Trovemat
							using Tox.
						</p>
						<p>
							Example of **phones_black_list.js** contents, which contains 1 inclusive phone range and 1 specific phone
							number:
						</p>
						<Highlight className="javascript">
							{`var PhonesBlackList = [
    ['79262234700','79262234799'],
    ['79262234733']
];`}
						</Highlight>
						<h2 id="check_template">Receipt templates (*.chq)</h2>
						<p>
							Default receipt templates located in "origin_receipts" in subdirectories depending on the language (it can
							be set by "receipt_lang" attribute in config.xml). For use templates that are different from default ones
							you need to place your receipt templates at "configs" directory.
						</p>
						<p>
							In text of receipt templates it is possible to use variables (aliases to fields, fillied by operator
							scenario).
						</p>
						<p>Variables syntax rules:</p>
						<ol>
							<li>Variable name must be enclosed in percent sign ("%").</li>
							<li>Name of the variable may consist of: latin uppercase letters, numbers, underscore sign ("_").</li>
							<li>
								After variable name it is possible to set modifiers using following rules:
								<ol>
									<li>Modifiers separeted by colon sign (":")</li>
									<li>Modifiers must be mentioned in strict order, described below.</li>
									<ol>
										<li>
											Uppercase latin letter "N" or "V". "N" means that variable would be substituted by field name. "V"
											means that variable would be substituted by field value. Default value: "V".
										</li>
										<li>
											Number. Max length of replaced string. If this number is bigger than value length, than the string
											would be completed by spaces until specified length. If this number is less than value length,
											than the string would be truncated to specified length.
										</li>
										<li>
											Uppercase latin letter "R" or "L". "R" (right) or "L" (left) defines the side, where the string
											would be truncated or completed up to specified length. Default value: "L".
										</li>
									</ol>
								</ol>
							</li>
						</ol>
						<p>Example:</p>
						<p>Receipt template:</p>
						<Highlight className="xml">
							{`--------------------------------
%SUM%
%SUM:N%: %SUM:V%
Value of the field SUM: %SUM:V%
%SUM:N:2:R%.: %SUM:V:5%
%SUM:20%
--------------------------------`}
						</Highlight>
						<p>Let's assume that we have define the following field:</p>
						<p>&lt;sum name="Amount" value="1234567890" /&gt;</p>
						<p>Printed receipt will look like the following text:</p>
						<Highlight className="xml">
							{`--------------------------------
1234567890
Amount: 1234567890
Value of the field SUM: 1234567890
Am.: 67890
          1234567890
--------------------------------`}
						</Highlight>
						<p>User-defined variables.</p>
						<ol>
							<li>Can't start with the underscore "_" sign.</li>
							<li>All defined fields is treated as user variables. Name of the tag is the name of the variable.</li>
						</ol>
						<p>System-defined variables.</p>
						<p>All variables, begins with uderscore sign "_" is system. Avaialable variables:</p>
						<ul>
							<li>
								_FIELDS_FOR_PRINT - Prints all user-defined variables, which has attribute "print" with value "1", in
								the following form: "variable_name: variable_value".
							</li>
							<li>_INFO_* - fields, from configuration file config.xml -> config -> point_info.</li>
							<li>_TERMNUMBER - Kiosk number (config.xml -> config -> parameters -> point_id)</li>
							<li>_DATETIME - Current date and time</li>
							<li>_ACCEPTED - Total amount of accepted cash, starting from last opened incassation period.</li>
							<li>_FEE - Fee</li>
							<li>_CREDIT - Total amount to be converted to cryptocurrency (_ACCEPTED minus _FEE)</li>
							<li>_CURRENCY - 3-symbols ISO-4217 currency code of the inserted cash</li>
							<li>_OPNAME - name of the operator</li>
						</ul>
						<p>Only for collection receipt template:</p>
						<ul>
							<li>_INCS_LAST_INCASSATION_TIME - last incassation time</li>
							<li>_INCS_INCASSATION_TIME - current incassation time</li>
						</ul>
						<p>Only for validators:</p>
						<ul>
							<li>_INCS_MONEY_NOTES - detailed information (with counters) about accepted banknotes</li>
							<li>_INCS_MONEY_NOTES_TOTAL - total accepted banknotes</li>
							<li>_INCS_MONEY_CURRENCIES - detailed information (with counters) about accepted currencies</li>
							<li>_INCS_GOODS - detailed information (with counters) about sold cryptocurrencies</li>
							<li>_INCS_PROFIT - profit from fees</li>
						</ul>
						<p>Only for dispensers:</p>
						<ul>
							<li>_INCS_MONEY_START - detailed information (with counters) about loaded banknotes</li>
							<li>_INCS_MONEY_DESPENSED - detailed information (with counters) about dispensed banknotes</li>
							<li>_INCS_MONEY_REJECTED - detailed information (with counters) about rejected banknotes</li>
							<li>_INCS_MONEY_REST - detailed information (with counters) about rested banknotes</li>
						</ul>
						<h2 id="logs">Logs (Logs&#58;*.log)</h2>
						<p>
							Stored in "logs" directory, located at the application level. Name of each log file includes name of the
							log object and date. Each log line consist of message type, timestamp, thread id, number of line in code
							and message text.
						</p>
						<p>Objects that logs events:</p>
						<ul>
							<li>Kiosk - Main application log file.</li>
							<li>Main - Critical information about Trovemat software.</li>
							<li>Device_* - Devices log (name of the device is a part of a log file name).</li>
						</ul>
						<p>Message types:</p>
						<ul>
							<li>INF - information level.</li>
							<li>WRN - warning.</li>
							<li>ERR - error.</li>
							<li>EXT - Extended message, appears only if extended logging enabled.</li>
						</ul>
						<h2 id="devices_emulation">Device emulation</h2>
						<p>
							For demo version of a Trovemat software it is possible to use software-emulated devices, such as receipts
							printer and cash identification module. For each device type there are special model name for such virtual
							devices. To emulate device events you have to use functional keys on hardware keyboard (F1-F12). First key
							press choses device, second - emulates device event. Interval between key presses must not exceed 5
							seconds. Virtual device events can be emulated only in demo version of Trovemat software. Virtual devices
							must be used only with test purposes!
						</p>
						<ul>
							<li>
								Validator.
								<ul>
									<li>model - "test_validator"</li>
									<li>key - "F9"</li>
									<li>
										events:
										<ul>
											<li>F1 - device online</li>
											<li>F2 - device online with warning</li>
											<li>F3 - device is offline</li>
											<li>F4 - cassette removed</li>
											<li>F7 - Inserted 1 minimum unit for chosen currency</li>
											<li>F8 - Inserted 10 minimum unit for chosen currency</li>
											<li>F9 - Inserted 100 minimum unit for chosen currency</li>
											<li>F10 - Inserted 500 minimum unit for chosen currency</li>
											<li>F11 - Inserted 1000 minimum unit for chosen currency</li>
											<li>F12 - Inserted 5000 minimum unit for chosen currency</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								Camera.
								<ul>
									<li>model - "test_camera"</li>
									<li>key - "F10"</li>
									<li>
										events:
										<ul>
											<li>F1 - device online</li>
											<li>F2 - device online with warning</li>
											<li>F3 - device is offline</li>
											<li>F4 - scanned test qr-code</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								Printer - Prints receipts into text files (temp/receipt_*.txt)
								<ul>
									<li>model - "test_printer"</li>
									<li>key - "F11"</li>
									<li>
										events:
										<ul>
											<li>F1 - device online</li>
											<li>F2 - device online with warning</li>
											<li>F3 - device is offline</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								Dispenser.
								<ul>
									<li>model - "test_dispenser"</li>
									<li>key - "F12"</li>
									<li>
										events:
										<ul>
											<li>F1 - device online</li>
											<li>F2 - device online with warning</li>
											<li>F3 - device is offline</li>
											<li>F4 - cassette removed</li>
											<li>
												F5 - dispense number of banknotes, equal to the nominal of the banknotes from of the 0-nth
												cassette
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
						<h2 id="service_buttons">Service keys</h2>
						<ul>
							<li>F1 + F1 - Close Trovemat software for access to system console</li>
							<li>F1 + F2 - Enter Trovemat software service menu</li>
							<li>F1 + F3 - Restart Trovemat software without restarting OS</li>
							<li>F1 + F4 - Launch touch-screen calibrate procedure</li>
							<li>
								F9 + ... - Virtual cash identification module command - see{' '}
								<a href="#devices_emulation">Device emulation</a>.
							</li>
							<li>
								F10 + ... - Virtual QR-code scanner - see <a href="#devices_emulation">Device emulation</a>.
							</li>
							<li>
								F11 + ... - Virtual receipt printer - see <a href="#devices_emulation">Device emulation</a>.
							</li>
							<li>
								F12 + ... - Virtual banknotes dispenser - see <a href="#devices_emulation">Device emulation</a>.
							</li>
						</ul>
						<h2 id="demo">Demo version limitations</h2>
						<ol>
							<li>
								SMS sends through server{' '}
								<a href="https://jetcrypto.com/" target="_blank" rel="noopener noreferrer">
									jetcrypto.com
								</a>{' '}
								using "Trovemat" sender name.
							</li>
							<li>There are big red flashing message on the top of the application about demo version.</li>
							<li>
								Application automatically shuts down after 10 minutes of work (can be changed upon request on{' '}
								<a href="mailto:sales@trovemat.com">sales@trovemat.com</a>).
							</li>
						</ol>
						<h2 id="app_features">Trovemat software special notes</h2>
						<ol>
							<li>
								Phone number must be entered according to mask in input field (withut country code). Country code must
								be chosen from a list of countries.
							</li>
							<li>Exchange rates on the main page are loaded from cryptocompare.com</li>
							<li>
								Access to cryptocurrency exchanges performed with the access tokens (keys), specified for each exchange
								separately. Parameters name for storing access keys see at{' '}
								<a href="#settings_exchange">Settings for crytpocurrency exchange</a>.
							</li>
						</ol>
						<h2 id="screen_calibration">Calibrating touch-screen</h2>
						<p>
							Calibrating procedure can be neccessary in case of incorrect positioning of touches on the screen. This
							can be a reason of a missed hit on the screen button or wrong behaviour of a Trovemat software.
						</p>
						<p>
							If after calibration procedure problems with the touch-screen still there, then the possible reason of
							that can be dirty edges of the touch-screen panel (or hardware failure in touch-screen controller) and
							service maintanence required.
						</p>
						<h3>Touch-screen calibrating program</h3>
						<p>
							You can run touch-screen calibrating program by pressing F1 + F4 while Trovemat software is running and
							showing main page (see <a href="#service_buttons">Service keys</a>).
						</p>
						<h3>Manual run of a touch-screen calibrating procedure from command line</h3>
						<p>Run following script (in case when Trovemat software installed into /opt/trovemat directory)</p>
						<div className="copied_command">
							<p className="clickable_command">/opt/trovemat/screen_calibration.sh $USER</p>
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
						<h2 id="replace_devices">Peripheral devices replacement.</h2>
						<p>In order to replace peripheral devices properly you must to do the following:</p>
						<ol>
							<li>
								Activate the service mode (see <a href="#service_buttons">Service keys</a>)
							</li>
							<li>Delete from device list a model that you need to change, by pressing "x" key</li>
							<li>Switch off the terminal</li>
							<li>Replace the device</li>
							<li>
								In the case of the printer, make sure that the paper is free to run in order to print the qr-codes
								correctly.
							</li>
							<li>Switch on the terminal and push "search device" button in service mode</li>
						</ol>
						<h2 id="settings_admin_list">Setting administrator lists for Trovemat software administration</h2>
						<p>
							You can use any program (desktop or mobile version) that supports communication using{' '}
							<a href="https://tox.chat/" target="_blank" rel="noopener noreferrer">
								Tox protocol
							</a>
							. You can manage user list, which have access to Trovemat instance, using following instruction:
						</p>
						<ol>
							<li>
								Go to service menu (see <a href="#service_buttons">Service keys</a>)
							</li>
							<li>Press "Admins list" button</li>
							<li>Open QR-code with tox-id of a user you want to add to admins list</li>
							<li>Scan opened QR-code by Trovemat software</li>
							<li>Accept invitation from Trovemat instance contact using your TOX client</li>
						</ol>
						<p>You can perform almost all tasks using messenger as a communcation channel with Trovemat software:</p>
						<ol>
							<li>
								Help command shows all available commands:
								<div className="copied_command">
									<p className="clickable_command">help</p>
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
								<p>Trovemat software answer will contain description of all supported commands.</p>
							</li>
							<li>
								To receive full description for any command, you need to send message like:
								<div className="copied_command">
									<p className="clickable_command">help '&lt;COMMAND NAME&gt;'</p>
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
								<p>For example, if you send command:</p>
								<div className="copied_command">
									<p className="clickable_command">help 'status'</p>
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
								<p>The result will be a full description of a "status" command.</p>
							</li>
						</ol>
						<h2 id="settings_exchange">Settings for cryptocurrency exchange</h2>

						<h3>
							<a href="https://jetcrypto.com" target="_blank" rel="noopener noreferrer">
								JetCrypto
							</a>
						</h3>
						<p>Public Key stored in parameter "config.gateways.jetcrypto_wallet->public_key"</p>
						<p>Secret Key stored in parameter "crypto.jetcrypto_wallet_private_key"</p>

						<h3>
							<a href="https://poloniex.com" target="_blank" rel="noopener noreferrer">
								Poloniex
							</a>
						</h3>
						<p>API Key stored in parameter "config.payments.common_params.poloniex_public_key"</p>
						<p>Secret stored in parameter "crypto.poloniex_secret_key"</p>

						<h3>
							<a href="https://bittrex.com" target="_blank" rel="noopener noreferrer">
								Bittrex
							</a>
						</h3>
						<p>API key stored in parameter "config.payments.common_params.bittrex_public_key"</p>
						<p>API key secret stored in parameter "crypto.bittrex_secret_key"</p>

						<h3>
							<a href="https://www.bitfinex.com/" target="_blank" rel="noopener noreferrer">
								Bitfinex
							</a>
						</h3>
						<p>API key stored in parameter "config.payments.common_params.bitfinex_public_key"</p>
						<p>API key secret stored in parameter "crypto.bitfinex_secret_key"</p>

						<h3>
							<a href="https://exmo.com" target="_blank" rel="noopener noreferrer">
								EXMO
							</a>
						</h3>
						<p>Public key stored in parameter "config.payments.common_params.exmo_public_key"</p>
						<p>Secret key stored in parameter "crypto.exmo_secret_key"</p>

						<h3>
							<a href="https://www.binance.com" target="_blank" rel="noopener noreferrer">
								Binance
							</a>
						</h3>
						<p>API key stored in parameter "config.payments.common_params.binance_public_key"</p>
						<p>Secret key stored in parameter "crypto.binance_secret_key"</p>

						<h3>
							<a href="https://www.bitstamp.com" target="_blank" rel="noopener noreferrer">
								Bitstamp
							</a>
						</h3>
						<p>API key stored in parameter "config.payments.common_params.bitstamp_public_key"</p>
						<p>Secret key stored in parameter "crypto.bitstamp_secret_key"</p>

						<h3>
							<a href="https://www.bitgo.com/" target="_blank" rel="noopener noreferrer">
								BitGo
							</a>
						</h3>
						<p>API key stored in parameter "config.payments.common_params.bitgo_public_key"</p>
						<p>Secret key stored in parameter "crypto.bitgo_secret_key"</p>

						<h3>
							<a href="https://yobit.net/" target="_blank" rel="noopener noreferrer">
								YObit
							</a>
						</h3>
						<p>API-key stored in parameter "config.payments.common_params.yobit_public_key"</p>
						<p>Secret key stored in parameter "crypto.yobit_secret_key"</p>

						<h3>
							<a href="https://bitlish.com/" target="_blank" rel="noopener noreferrer">
								Bitlish
							</a>
						</h3>
						<p>Please contact Trovemat support for details</p>

						<h2 id="run_terminal">Exit to command line from Trovemat software</h2>
						<ol>
							<li>
								Close Trovemat software (see. <a href="#service_buttons">Service keys</a>)
							</li>
							<li>Press ALT + F4</li>
							<li>Press "Logout" button</li>
							<li>
								When you're done with the command line - run command "exit" to launch Trovemat software or just simply
								reboot
							</li>
						</ol>

						<h2 id="cash_collection">Cash collection procedure</h2>
						<ol>
							<li>
								Cash dispenser:
								<ol>
									<li>Pull out empty cash cassettes</li>
									<li>Enter counters for re-filled cash cassettes on the screen keyboard</li>
									<li>Press "Continue" button</li>
									<li>Save printed receipt</li>
									<li>Insert re-filled cash cassettes back to cash dispenser</li>
									<li>Wait for the device go online</li>
								</ol>
							</li>
							<li>
								Cash validator (recycler):
								<ol>
									<li>Pull out filled cash cassettes</li>
									<li>Press "Continue" button</li>
									<li>Save printed receipt</li>
									<li>Insert empty cash cassettes back to cash validator</li>
									<li>Wait for the device go online</li>
								</ol>
							</li>
						</ol>
					</div>
				</div>
			</div>
		);
	}
}
