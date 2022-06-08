import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class InstallGuide extends Component {
    componentDidMount() {
        document.body.addEventListener('click', e => {
            const check = (node) => node.classList.contains("write-btn") || node.classList.contains("button_overlay");
            if (check(e.target)) {
                let btn = e.target;

                if (btn.classList.contains("button_overlay")) {
                    btn = btn.parentNode;
                }
                let text = btn.parentNode.querySelector('.clickable_command').textContent.trim();
                const copyIcon = btn.querySelector('.copy-icon');
                const doneIcon = btn.querySelector('.done-icon');

                navigator.clipboard.writeText(text)
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
                    })
            }
        });
    }

    render() {
        return (
            <div className="faq-block">
                <div className="wrapper">
                    <Link className="btn btn-primary account-transfer-button account-fill-button account-wallet__btn"
                          to="/faq">Prev
                    </Link>
                </div>
                <div className="faq-content">
                    <svg display="none">
                        <symbol id="copy-icon" height="24" viewBox="0 0 24 24" width="24"
                                xmlns="http://www.w3.org/2000/svg">
                            <rect fill="none" height="13" rx="2" ry="2" stroke="#555" strokeLinecap="round"
                                  strokeLinejoin="round" strokeWidth="2" width="13" x="9" y="9"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="#555"
                                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </symbol>
                        <symbol id="done-icon" fill="none" height="32" stroke="#239d60" strokeLinecap="round"
                                strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="32"
                                xmlns="http://www.w3.org/2000/svg">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </symbol>
                    </svg>
                    <div className="wrapper">
                        <h1>Trovemat software install guide</h1>
                        <p>OS for running Trovemat software is <a
                            target="_blank" rel="noopener noreferrer"
                            href="http://releases.ubuntu.com/16.04/">Ubuntu 16.04 Server
                            x64</a>. Install script contains all security settings, required for secure running Trovemat
                            software.</p>
                        <div className="faq-content__menu-list">
                            <h2>List of sections:</h2>
                            <ol>
                                <li><a href="#install_for_ubuntu">Installing Trovemat software with Ubuntu 16.04 Server
                                    x64</a></li>
                                <li><a href="#settings_devices">Setup devices by running autosearch from service
                                    menu</a></li>
                                <li><a href="#commands_list">Typical commands, used for Trovemat software set-up from
                                    TOX messenger</a></li>
                            </ol>
                        </div>
                        <h2 id="install_for_ubuntu">Installing Trovemat software with Ubuntu 16.04 Server x64</h2>
                        <ol>
                            <li>Install Ubuntu 16.04 Server x64</li>
                            <ol>
                                <li>Make sure that you check “OpenSSH Server” option while installing OS.</li>
                                <li>Use default settings while installing OS.</li>
                            </ol>

                            <li>Install Trovemat software (by running following command in the OS command shell)</li>
                            <ol>
                                <li>Install demo version of the Trovemat software
                                    <blockquote>
                                        <p>!!! ATTENTION</p>
                                        <p>!!! CURRENT COMMAND INSTALLS DEMO-VERSION OF THE TROVEMAT SOFTWARE</p>
                                        <p>!!! FOR THE UNLIMITED VERSION</p>
                                        <p>!!! EMAIL TO <a href="mailto:sales@trovemat.com">sales@trovemat.com</a></p>
                                    </blockquote>
                                    <div className="copied_command">
                                        <p className="clickable_command">wget https://install.trovemat.com/release -O
                                            trovemat_installer.sh</p>
                                        <button className="write-btn">
                                            <span className="button_overlay"></span>
                                            <span className="copy-icon">
                                                <svg width="30" height="30">
                                                    <use xlinkHref="#copy-icon"/>
                                                </svg>
                                            </span>
                                            <span className="done-icon" style={{display: "none"}}>
                                                <svg width="30" height="30">
                                                    <use xlinkHref="#done-icon"/>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="copied_command">
                                        <p className="clickable_command">chmod +x trovemat_installer.sh</p>
                                        <button className="write-btn">
                                            <span className="button_overlay"></span>
                                            <span className="copy-icon">
                                                <svg width="30" height="30">
                                                    <use xlinkHref="#copy-icon"/>
                                                </svg>
                                            </span>
                                            <span className="done-icon" style={{display: "none"}}>
                                                <svg width="30" height="30">
                                                    <use xlinkHref="#done-icon"/>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="copied_command">
                                        <p className="clickable_command">sudo ./trovemat_installer.sh $USER</p>
                                        <button className="write-btn">
                                            <span className="button_overlay"></span>
                                            <span className="copy-icon">
                                                <svg width="30" height="30">
                                                    <use xlinkHref="#copy-icon"/>
                                                </svg>
                                            </span>
                                            <span className="done-icon" style={{display: "none"}}>
                                                <svg width="30" height="30">
                                                    <use xlinkHref="#done-icon"/>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </li>
                                <li>Install license version of the Trovemat software
                                    <p>You need to install demo version of the Trovemat software, then you have to send
                                        to JetCrypto support (using any available method) public key from JetCrypto
                                        Wallet. Use</p>
                                    <div className="copied_command">
                                        <p className="clickable_command">settings get
                                            'config.gateways.jetcrypto_wallet->public_key</p>
                                        <button className="write-btn">
                                            <span className="button_overlay"></span>
                                            <span className="copy-icon">
                                                <svg width="30" height="30">
                                                    <use xlinkHref="#copy-icon"/>
                                                </svg>
                                            </span>
                                            <span className="done-icon" style={{display: "none"}}>
                                                <svg width="30" height="30">
                                                    <use xlinkHref="#done-icon"/>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </li>
                            </ol>

                            <li>When install is complete, computer will reboot. After system start Trovemat software
                                will start automatically.
                            </li>
                            <li>Trovemat software will automatically updates to latest version.</li>
                            <li>Setup devices (launch autosearch of devices from service menu) (see “Setup devices by
                                running autosearch from service menu” section)
                            </li>
                            <li>Setup TOX admins list from service menu (see “Setup admin list from TOX messenger”
                                paragraph)
                            </li>
                            <li>Setup Trovemat software according to your needs more precisely using <a
                                href='./user-guide' target='_blank' rel="noopener noreferrer">“Trovemat software User Guide”</a>
                            </li>
                        </ol>
                        <h2 id="settings_devices">Setup devices by running autosearch from service menu</h2>
                        <ol>
                            <li>Enter service menu by pressing sequentially F1 and F2 on the keyboard, attached to
                                Kiosk.
                            </li>
                            <li>Press “Find devices” - Trovemat will display list of all available communication port in
                                OS and will search for available devices using that ports.
                            </li>
                            <li>When autosearch is complete, there will be a list of founded devices with device type,
                                communication port name and device model. Usually, Trovemat needs the following devices
                                to operate normally: bill validator, receipts printer, camera, cash dispenser (if it’s a
                                2-way Kiosk - with cash-out function).
                            </li>
                        </ol>
                        <h2 id="commands_list">Typical commands, used for Trovemat software set-up from TOX
                            messenger</h2>
                        <p>You can set-up Trovemat software by sending commands from any application, supporting <a
                            target="_blank" rel="noopener noreferrer"
                            href="https://tox.chat/download.html/">TOX protocol</a>.</p>
                        <h3>Setup admin list from TOX messenger</h3>
                        <p>Before sending any commands to Trovemat Kiosk, you need to add your “tox id” to Kiosk’s
                            friend list:</p>
                        <ol>
                            <li>Enter service menu by pressing sequentially F1 and F2 on the keyboard, attached to
                                Kiosk.
                            </li>
                            <li>Press “Add admin” - first added administrator will be created with the full rights, and
                                also you can’t delete that admin anymore using service menu.
                            </li>
                            <li>In TOX client you need to accept request from Trovemat software and wait till Trovemat
                                goes online in the client application’s friends list.
                            </li>
                        </ol>
                        <h3>Startup TOX commands</h3>
                        <p>Below, there are several main commands, that needs to be run when you setup your Trovemat
                            software for the first time (in that document we give some test data in the commands
                            description just for example). Full description of all available commands can be viewed in
                            document <a href='./user-guide' target='_blank' ref='noreferrer noopener'>“Trovemat software User
                                Guide”</a>. You can use any
                            quotes in the commands - double quotes, single quotes, and quotes from the smartphone
                            onscreen keyboars etc.</p>
                        <blockquote>
                            <p>!!! ATTENTION</p>
                            <p>!!! You have to restart Kiosk's OS after running all set-up commands, using the following
                                command from TOX client:</p>
                            <div className="copied_command">
                                <p className="clickable_command">service close</p>
                                <button className="write-btn">
                                    <span className="button_overlay"></span>
                                    <span className="copy-icon">
                                        <svg width="30" height="30">
                                            <use xlinkHref="#copy-icon"/>
                                        </svg>
                                    </span>
                                    <span className="done-icon" style={{display: "none"}}>
                                        <svg width="30" height="30">
                                            <use xlinkHref="#done-icon"/>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </blockquote>
                        <p>In the descriptions below we use angle brackets (’&lt;’ and ‘&gt;’) to identify parameters,
                            that needs to be filled up with concrete values, according to Trovemat software installation
                            details. For example, string like “&lt;INTEGER NUMBER - ID OF THE KIOSK&gt;” in text of real
                            command will look like “2” - please notice, that angle brackets are special symbols, and you
                            have to remove them when you place a real values.</p>
                        <p>In the descriptions below we use square brackets (’[’ and ‘]’) to select parameters, that can
                            be omitted in the command. For example, string like “cmd ‘&lt;Param 1&gt;’
                            [’&lt;Param2&gt;’]” tells you that you can send command like “cmd ‘111’” and also you can
                            send command like “cmd ‘111’ ‘222’” - both are ok.</p>
                        <ol>
                            <li>Change Kiosk name:
                                <div className="copied_command">
                                    <p className="clickable_command">settings set "config.parameters.point_name"
                                        "&lt;KIOSK NAME&gt;"</p>
                                    <button className="write-btn">
                                        <span className="button_overlay"></span>
                                        <span className="copy-icon">
                                            <svg width="30" height="30">
                                                <use xlinkHref="#copy-icon"/>
                                            </svg>
                                        </span>
                                        <span className="done-icon" style={{display: "none"}}>
                                            <svg width="30" height="30">
                                                <use xlinkHref="#done-icon"/>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li>Change Kiosk ID:
                                <div className="copied_command">
                                    <p className="clickable_command">settings set "config.parameters.point_id"
                                        "&lt;INTEGER NUMBER - ID OF THE KIOSK&gt;"</p>
                                    <button className="write-btn">
                                        <span className="button_overlay"></span>
                                        <span className="copy-icon">
                                            <svg width="30" height="30">
                                                <use xlinkHref="#copy-icon"/>
                                            </svg>
                                        </span>
                                        <span className="done-icon" style={{display: "none"}}>
                                            <svg width="30" height="30">
                                                <use xlinkHref="#done-icon"/>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li>Save key pair (private and public keys) for Jetcrypto Wallet account:
                                <ol>
                                    <li>Private key:
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set
                                                "config.gateways.jetcrypto_wallet->private_key"
                                                "crypto.jetcrypto_wallet_private_key"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set -secure
                                                "crypto.jetcrypto_wallet_private_key" "&lt;JetCrypto Wallet private
                                                key&gt;"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                    <li>Public key:
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set
                                                "config.gateways.jetcrypto_wallet->public_key" "&lt;JetCrypto Wallet
                                                public key&gt;"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                </ol>
                            </li>
                            <li>Select one of several options, available by default, for accessing supported
                                cryptocurrency exchanges (full list of available templates - use command “template
                                list”):
                                <div className="copied_command">
                                    <p className="clickable_command">template list</p>
                                    <button className="write-btn">
                                        <span className="button_overlay"></span>
                                        <span className="copy-icon">
                                            <svg width="30" height="30">
                                                <use xlinkHref="#copy-icon"/>
                                            </svg>
                                        </span>
                                        <span className="done-icon" style={{display: "none"}}>
                                            <svg width="30" height="30">
                                                <use xlinkHref="#done-icon"/>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <div className="copied_command">
                                    <p className="clickable_command">template use "&lt;Template Name From List&gt;"
                                        ["&lt;Contents of the public key&gt;" "&lt;Contents of the secret key&gt;"]</p>
                                    <button className="write-btn">
                                        <span className="button_overlay"></span>
                                        <span className="copy-icon">
                                            <svg width="30" height="30">
                                                <use xlinkHref="#copy-icon"/>
                                            </svg>
                                        </span>
                                        <span className="done-icon" style={{display: "none"}}>
                                            <svg width="30" height="30">
                                                <use xlinkHref="#done-icon"/>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <p>Example using Poloniex:</p>
                                <div className="copied_command">
                                    <p className="clickable_command">template use "poloniex"
                                        "00000000-00000000-00000000-00000000"
                                        "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"</p>
                                    <button className="write-btn">
                                        <span className="button_overlay"></span>
                                        <span className="copy-icon">
                                            <svg width="30" height="30">
                                                <use xlinkHref="#copy-icon"/>
                                            </svg>
                                        </span>
                                        <span className="done-icon" style={{display: "none"}}>
                                            <svg width="30" height="30">
                                                <use xlinkHref="#done-icon"/>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </li>
                            <li>Setup min and max amount for accepted cash for one payment (defaults: min amount 1, max
                                amount 15000) in currently accepted currency (for all operators):
                                <ol>
                                    <li>Min limit:
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set "config.payments.limit_min"
                                                "&lt;MIN AMOUNT OF THE ACCEPTED CASH&gt;"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <p>Example - set 200 as min accepted cash in currently accepted currency:</p>
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set "config.payments.limit_min"
                                                "200"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                    <li>Max limit:
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set "config.payments.limit_max"
                                                "&lt;MAX AMOUNT OF THE ACCEPTED CASH&gt;"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                    <li>Example - set 15000 as max accepted cash in currently accepted currency:
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set "config.payments.limit_max"
                                                "15000"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                    <li>Fiat currency setup for displaying prices/rates for cryptocurrencies on the main
                                        screen of the Trovemat software:
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set "config.payments.currency"
                                                "&lt;ISO-4217 SYMBOL CODE OF THE ACCEPTED FIAT CURRENCY&gt;"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <p>Example: Display all prices/rates on the main screen using US Dollars
                                            (USD):</p>
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set "config.payments.currency"
                                                "USD"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                    <li>Setup list of accepted fiat currencies and/or banknotes (default: all banknotes,
                                        accepted by cash identification module, is enabled):
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set
                                                "config.peripherals.validator->enabled_currencies" "&lt;LIST OF ACCEPTED
                                                CURRENCIES/BANKNOTES&gt;"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <p>Example: Enable to acceptance EUR banknotes of the following nominals: 20,
                                            50, 100, 200:</p>
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set
                                                "config.peripherals.validator->enabled_currencies"
                                                "EUR:20,EUR:50,EUR:100,EUR:200"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                    <li>Setup the value of the convinience fee:
                                        <ol>
                                            <li>Setup the condition for applying fee value for payments with the minimum
                                                amount value in the current currency:
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.payments.fee.part->min" "&lt;MIN PAYMENT AMOUNT, FOR
                                                        WHICH THAT FEE VALUE WILL BE APPLIED&gt;"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                                <p>Example: Setup non-zero amount limit for that convinience fee
                                                    rule:</p>
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.payments.fee.part->min" "0"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                            <li>Setup up convinience fee value in percents from payment amount:
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.payments.fee.part->percent" "&lt;INTEGER NUMBER -
                                                        PERCENT FROM PAYMENT AMOUNT FOR FEE&gt;"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                                <p>Example: Setup fee 7% from payment amount (i.e. if client inserts
                                                    $100 in cash, he gets $93 converted in crypto, $7 - trovemat owner
                                                    income):</p>
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.payments.fee.part->percent" "7"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                            <li>Setup fix fee rate in current currency:
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.payments.fee.part->fix" "&lt;INTEGER NUMBER - FIX FEE
                                                        RATE&gt;"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                                <p>Example: Setup fix fee rate 10 in currently accepted fiat currency
                                                    (if client inserts $50 in cash, he gets $40 converted in crypto, $10
                                                    - trovemat owner income):</p>
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.payments.fee.part->fix" "50"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>Setup Kiosk parameters (name, address, etc):
                                        <ol>
                                            <li>Owner’s name:
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.point_info.dealer_name->value" "&lt;NAME OF THE KIOSK
                                                        OWNER&gt;"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                            <li>Owner’s address:
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.point_info.dealer_address->value" "&lt;KIOSK OWNER
                                                        ADDRESS&gt;"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                            <li>Owner’s phone number:
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.point_info.dealer_phone->value" "&lt;KIOSK OWNER PHONE
                                                        NUMBER&gt;"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                            <li>Address of the Kiosk’s location:
                                                <div className="copied_command">
                                                    <p className="clickable_command">settings set
                                                        "config.point_info.point_address->value" "&lt;ADDRESS OF THE
                                                        KIOSK'S LOCATION&gt;"</p>
                                                    <button className="write-btn">
                                                        <span className="button_overlay"></span>
                                                        <span className="copy-icon">
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#copy-icon"/>
                                                            </svg>
                                                        </span>
                                                        <span className="done-icon" style={{display: "none"}}>
                                                            <svg width="30" height="30">
                                                                <use xlinkHref="#done-icon"/>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>Change the phone prefix number, displayed by default on the “Enter phone number”
                                        screen (for KYC procedure):
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set
                                                "config.interface->default_phone_code" "&lt;ISO 3166-1 COUNTRY PHONE
                                                PREFIX&gt;"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <p>Example: Setup phone prefix by default for USA +1:</p>
                                        <div className="copied_command">
                                            <p className="clickable_command">settings set
                                                "config.interface->default_phone_code" "US"</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                    <li>Restart Kiosk to apply all previously entered settings:
                                        <div className="copied_command">
                                            <p className="clickable_command">service close</p>
                                            <button className="write-btn">
                                                <span className="button_overlay"></span>
                                                <span className="copy-icon">
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#copy-icon"/>
                                                    </svg>
                                                </span>
                                                <span className="done-icon" style={{display: "none"}}>
                                                    <svg width="30" height="30">
                                                        <use xlinkHref="#done-icon"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}