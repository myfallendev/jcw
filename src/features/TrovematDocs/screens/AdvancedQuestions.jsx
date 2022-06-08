import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Highlight from 'react-highlight';
import 'highlightjs/styles/github.css';

export class AdvancedQuestions extends Component {
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
                    <div className="wrapper">
                        <Link
                            className="btn btn-primary account-transfer-button account-fill-button account-wallet__btn"
                            to="/faq">Prev
                        </Link>
                    </div>
                    <div className="faq-content">
                        <svg display="none">
                            <symbol id="copy-icon" height="24" viewBox="0 0 24 24" width="24"
                                    xmlns="http://www.w3.org/2000/svg">
                                <rect fill="none" height="13" rx="2" ry="2" stroke="#555" strokeLinecap="round"
                                      strokeLinejoin="round" strokeWidth="2" width="13" x="9" y="9"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none"
                                      stroke="#555"
                                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </symbol>
                            <symbol id="done-icon" fill="none" height="32" stroke="#239d60" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="32"
                                    xmlns="http://www.w3.org/2000/svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </symbol>
                        </svg>
                        <h1>Advanced Frequently Asked Questions</h1>
                        <div className="faq-content__menu-list">
                            <h2>List of questions:</h2>
                            <ol>
                                <li><a href="#afaq1">Exit to console</a></li>
                                <li><a href="#afaq2">Setup 4G modem without internet connection on the
                                    kiosk.</a></li>
                                <li><a href="#afaq3">Connect to WiFi network using WiFi adapter (before
                                    Trovemat is installed)</a></li>
                                <li><a href="#afaq4">Connect to WiFi network using WiFi adapter (after
                                    Trovemat is installed)</a></li>
                                <li><a href="#afaq5">List of commands for received Trovemat</a></li>
                                <li><a href="#afaq6">List of usefull commands</a></li>
                                <li><a href="#afaq7">Web-camera doesn't work</a></li>
                                <li><a href="#afaq8">How to add another coin</a></li>
                                <li><a href="#afaq9">How to activate "HELP" and "INFO" buttons or Disclaimer on the main
                                    screen of Trovemat</a></li>
                                <li><a href="#afaq10">How to setup "Cash withdrawal" scenario</a></li>
                                <li><a href="#afaq11">How to switch fiat currency rate requests to
                                    apilayer.com</a></li>
                                <li><a href="#afaq12">How to reset validator accepted cash counters after
                                    removing cash from validator (screen show
                                    automatically when you remove cash cassette)</a></li>
                                <li><a href="#afaq13">How to reset cash dispenser counters after changing
                                    dispenser cash cassettes</a></li>
                                <li><a href="#afaq14">How to change timezone on Trovemat</a></li>
                                <li><a href="#afaq15">How to use XMPP-based monitoring</a></li>
                            </ol>
                        </div>

                        <h2 id="afaq1">Exit to console</h2>
                        <ol>
                            <li>While Trovemat software is running (regardless of the screen), press F1+F1.</li>
                            <li>On the "Trovemat interface is starting" screen press ALT + F4 on keyboard</li>
                            <li>Press "Logout" button in the dialog</li>
                            <li>To launch Trovemat run command "exit" in the console.</li>
                        </ol>

                        <h2 id="afaq2">Setup 4G modem without internet connection on the kiosk</h2>
                        <ol>
                            <li>Go to console.</li>
                            <li>Run the following command:

                                <div className="copied_command">
                                    <p className="clickable_command">ip link show</p>
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
                            <li>In the output of the previous command locate interface id (usually it looks like
                                'enx1234568' for 4G modem). Remember that name, we will refer to that name as
                                NETWORK_INTERFACE_NAME in next steps.
                            </li>
                            <li>Run the following commands:
                                <div className="copied_command">
                                    <p className="clickable_command">sudo dhclient NETWORK_INTERFACE_NAME</p>
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
                                    <p className="clickable_command">sudo ifup NETWORK_INTERFACE_NAME</p>
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
                            <li>Ping known web site to be sure that Internet connection is up (i.e. 8.8.8.8).</li>
                        </ol>


                        <h2 id="afaq3">Connect to WiFi network using WiFi adapter (before Trovemat is installed)</h2>
                        <ol>
                            <li>Go to console.</li>
                            <li>Run the following commands:
                                <div className="copied_command">
                                    <p className="clickable_command">sudo su</p>
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
                                    <p className="clickable_command">wpa_passphrase 'WI-FI NETWORK NAME' 'WI-FI NETWORK
                                        PASSWORD' > /etc/wpa_supplicant/wpa.conf</p>
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
                                    <p className="clickable_command">iwlist scan</p>
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
                            <li>In the output of the previous command locate interface id (usually it looks like
                                'wlx1234568' for WiFi adapter). Remember that name, we will refer to that name as
                                NETWORK_INTERFACE_NAME in next steps.
                            </li>
                            <li>Run the following commands:
                                <div className="copied_command">
                                    <p className="clickable_command">wpa_supplicant -iNETWORK_INTERFACE_NAME
                                        -c/etc/wpa_supplicant/wpa.conf -B</p>
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
                                    <p className="clickable_command">dhclient NETWORK_INTERFACE_NAME</p>
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
                                    <p className="clickable_command">exit</p>
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
                            <li>Check internet connection by running following command:
                                <div className="copied_command">
                                    <p className="clickable_command">ping 8.8.8.8</p>
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


                        <h2 id="afaq4">Connect to WiFi network using WiFi adapter (after Trovemat is installed)</h2>
                        <ol>
                            <li>Go to console.</li>
                            <li>Run the following command:
                                <div className="copied_command">
                                    <p className="clickable_command">nmtui</p>
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
                            <li>Choose "Activate a connection" menu item</li>
                            <li>Choose your WiFi network from the list</li>
                            <li>Enter password, if your WiFi network requires it</li>
                            <li>Check if it's connected (star symbol must appear near WiFi network name)</li>
                            <li>Launch Trovemat software</li>
                        </ol>


                        <h2 id="afaq5">List of commands for received Trovemat</h2>
                        <ul>
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.parameters.point_name' ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.parameters.point_id' ''</p>
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
                        </ul>
                        <br/>
                        <ul>
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.payments.currency' ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.payments.limit_min' ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.payments.limit_max' ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.payments.fee.part->min' ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.payments.fee.part->percent' ''</p>
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
                        </ul>
                        <br/>
                        <ul>
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.interface->lang' ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.interface->default_phone_code'
                                        ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.interface.menu.limit_max->ISO4217_CURRENCY_CODE' ''</p>
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
                        </ul>
                        <br/>
                        <ul>
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.point_info.dealer_name->value'
                                        ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.point_info.dealer_address->value' ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.point_info.dealer_phone->value' ''</p>
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
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.point_info.point_address->value' ''</p>
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
                        </ul>
                        <br/>
                        <ul>
                            <li>
                                <div className="copied_command">
                                    <p className="clickable_command">template use 'TEMPLATE_NAME' 'API_PUBLIC_KEY'
                                        'API_SECRET_KEY'</p>
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
                            <li>
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
                        </ul>


                        <h2 id="afaq6">List of usefull command</h2>
                        <ul>
                            <li><b>Download all logs in one archive</b>
                                <div className="copied_command">
                                    <p className="clickable_command">download "logs" "*2018-08-01*"</p>
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
                            <li><b>Download config file</b>
                                <div className="copied_command">
                                    <p className="clickable_command">download "configs/config.xml"</p>
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
                            <li><b>Get a screenshot</b>
                                <div className="copied_command">
                                    <p className="clickable_command">screenshot</p>
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
                            <li><b>Get settings</b>
                                <div className="copied_command">
                                    <p className="clickable_command">settings get 'config' -xml</p>
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
                            <li><b>Set settings</b>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.tag_name.child_tag_name->attribute_name' 'new_value'</p>
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
                            <li><b>Check Trovemat software version</b>
                                <div className="copied_command">
                                    <p className="clickable_command">service build info</p>
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
                            <li><b>Check status of the Trovemat</b>
                                <div className="copied_command">
                                    <p className="clickable_command">status</p>
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
                            <li><b>See cash status till last cash collection</b>
                                <div className="copied_command">
                                    <p className="clickable_command">accounting info</p>
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
                            <li><b>Add another TOX user</b>
                                <div className="copied_command">
                                    <p className="clickable_command">tox user add -admin "NEW_USER_NICKNAME_IN_TROVEMAT"
                                        "NEW_USER_TOX_ID"</p>
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
                            <li><b>Remove TOX user</b>
                                <div className="copied_command">
                                    <p className="clickable_command">tox user remove
                                        "USER_NICKNAME_IN_TROVEMAT_TO_REMOVE"</p>
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
                            <li><b>Change API keys</b>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set -secure 'crypto.xxx_secret_key'
                                        'API_SECRET_KEY'</p>
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
                                    <p className="clickable_command">settings set
                                        'config.payments.common_params.xxx_public_key' 'API_PUBLIC_KEY'</p>
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
                                <span style={{
                                    color: '#777',
                                    fontSize: '.9rem'
                                }}>where xxx is the name of the exchange</span>
                            </li>
                            <li><b>Change user permissions level to full admin rights</b>
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.gateways.tox.users.USER_TAG_NAME->tasks' '3</p>
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
                        </ul>


                        <h2 id="afaq7">Web-camera doesn't work</h2>
                        <p>Check if the camera attached to USB port on computer. If camera attached to USB-hub, then
                            it's possible that camera can't start because it doesn't receive enough power through
                            USB-hub.
                            Reconnect camera directly to computer and restart Trovemat.</p>

                        <h2 id="afaq8">How to add another coin</h2>
                        <ol>
                            <li>Answer the following questions:
                                <ol>
                                    <li>Name of the coin</li>
                                    <li>It's ticker name on the cryptocurrency exchange</li>
                                    <li>Withdrawal fee</li>
                                    <li>Regexp for address validating</li>
                                    <li>Balance threshold, when coin button will be unavailable because of the low
                                        balance
                                    </li>
                                </ol>
                            </li>
                            <li>Download configs/operators.xml from Trovemat using command "download
                                'configs/operators.xml'"
                            </li>
                            <li>Add coin description to operators.xml. Please note, that image path should be like
                                this:
                                &#39;&#60;new_coin ... image=&#34;../../../user/new_coin.png&#34;&#39;.
                            </li>
                            <li>Download configs/menu.xml from Trovemat</li>
                            <li>Change one of the coin to your new one in menu.xml (use tag name of the coin from
                                operators.xml as tag name for item in menu.xml).
                            </li>
                            <li>Send logo file (PNG, any appropriate size - i.e. 100x100, 300x300 - anyone, Trovemat
                                will resize it).
                            </li>
                            <li>Copy logo file to user data directory using command
                                <div className="copied_command">
                                    <p className="clickable_command">run 'cp
                                        /opt/trovemat/temp/receive/&#60;COIN_FILE_NAME_HERE&#62; /opt/trovemat/user/'</p>
                                    <button className="write-btn">
                                        <span className="button_overlay"/>
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
                            <li>Send edited menu.xml and operators.xml file to Trovemat (just send them as usual
                                files, for desktop clients it can be done by drag&drop method to Trovemat's
                                conversation).
                            </li>
                            <li>Send TOX command
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


                        <h2 id="afaq9">How to activate "HELP" and "INFO" buttons or Disclaimer on the mainscreen of
                            Trovemat:</h2>

                        <ol>
                            <li>Create file called user.js (UTF-8 encoded), with following content:
                                <Highlight className='javascript'>
                                    {
                                        `var _termsText = 'USER TERMS TEXT';
var _faqContent = 'USER FAQ TEXT';
var _disclaimer = 'USER DISCLAIMER TEXT';`
                                    }
                                </Highlight>
                            </li>
                            <li>Replace 'USER TERMS TEXT' words with your Terms And Conditions text, 'USER FAQ
                                TEXT' with your FAQ (Help) text, 'USER DISCLAIMER TEXT' with your dislaimer text.
                                In FAQ (Help) text you can use substring '&#123;dealer_phone&#125;', that will be
                                replaced to dealer phone number from Trovemat configs. In all texts you can use
                                HTML markup for formatting.
                            </li>
                            <li>Send created user.js to Trovemat in TOX</li>
                            <li>Run following command to place sended user.js to directory /opt/trovemat/user:
                                <div className="copied_command">
                                    <p className="clickable_command">run 'mv /opt/trovemat/temp/receive/user.js
                                        /opt/trovemat/user/user.js'</p>
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
                            <li>Switch to any coin page and go back to main page - INFO and HELP buttons should
                                display your text when pressed. Disclaimer will appear if corresponding setting flag is
                                set to 'true'.
                            </li>
                        </ol>

                        <h2 id="afaq10">How to setup "Cash withdrawal" scenario</h2>
                        <ol>
                            <li>Insert (or check the existence of) "cashout" operator in menu.xml
								E.g.:
								<Highlight className='xml'>
                                    {
                                        `<?xml version="1.0" encoding="utf-8"?>
<menu type="group" name="choose_your_currency" >
	...
	<cashout type="operator" />
</menu>
`
                                    }
                                </Highlight>
							
							</li>
                            <li>Insert (or check the existence of) "cashout" operator in operators.xml. Please request actual cashout scenario at support@jetcrypto.com</li>
							<li>Setup additional fee, specific for cashout scenario, if neccessary (you can leave it empty, and then common fee from configs.payment.fee will be applied):
								<ol>
									<li>Setup the condition for applying fee value for cash withdrawals with the minimum
										amount value in the dispensed currency:
										<div className="copied_command">
											<p className="clickable_command">settings set
												"operators.cashout.init_cashout.fee.part->min" "&lt;MIN PAYMENT AMOUNT, FOR
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
												"operators.cashout.init_cashout.fee.part->min" "0"</p>
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
									<li>Setup up convinience fee value in percents from withdrawal amount:
										<div className="copied_command">
											<p className="clickable_command">settings set
												"operators.cashout.init_cashout.fee.part->percent" "&lt;INTEGER NUMBER -
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
												"operators.cashout.init_cashout.fee.part->percent" "7"</p>
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
												"operators.cashout.init_cashout.fee.part->fix" "&lt;INTEGER NUMBER - FIX FEE
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
										<p>Example: Setup fix fee rate 10 in currently dispensed fiat currency
											(if client gets $50 in cash, he sends $60 converted from crypto, $10
											- trovemat owner income):</p>
										<div className="copied_command">
											<p className="clickable_command">settings set
												"operators.cashout.init_cashout.fee.part->fix" "50"</p>
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
                            <li>Set banknote nominals for cash dispenser cassettes (nominal in upper cassette must
                                be greater than nominal in lower cassette)
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.peripherals.dispenser->cassette_0' '100 USD'</p>
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
                                    <p className="clickable_command">settings set
                                        'config.peripherals.dispenser->cassette_1' '20 USD'</p>
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
                            <li>Set default capacity for each cassette
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        'config.peripherals.dispenser->default_capacity_0' '20'</p>
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
                                    <p className="clickable_command">settings set
                                        'config.peripherals.dispenser->default_capacity_1' '20'</p>
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
                            <li>Load banknotes into cash dispenser cassettes according to settings (nominal and
                                number of banknotes)
                            </li>
                            <li>Run incassation by using one of the options:
                                <ol>
                                    <li>While loading cassettes using Trovemat screen</li>
                                    <li>
                                        Using TOX command:
                                        <div className="copied_command">
                                            <p className="clickable_command">device dispenser incassation -quiet "20"
                                                "25"</p>
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


                                        where 20 and 25 - is the number of the banknotes, loaded into cassette 0
                                        (upper) and cassette 1 (lower)
                                    </li>
                                </ol>
                            </li>
                        </ol>
                        <p>If all done properly, "Cash withdrawal" button must be enabled on the main screen.</p>


                        <h2 id="afaq11">How to switch fiat currency rate requests to apilayer.com</h2>

                        <ol>
                            <li>Register at https://currencylayer.com/</li>
                            <li>Generate API key for your new account</li>
                            <li>Set apilayer API key by sending two TOX command:
                                <div className="copied_command">
                                    <p className="clickable_command">settings set -secure "crypto.apilayer_key"
                                        "&#060;apilayer generated APIkey&#062;"</p>
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
                                    <p className="clickable_command">settings set "config.payments->fiat_rates_key"
                                        "crypto.apilayer_key"</p>
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
                            <li>Set rate request source apilayer.com by sending TOX command:
                                <div className="copied_command">
                                    <p className="clickable_command">settings set "config.payments->fiat_rates_source"
                                        "apilayer"</p>
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
                            <li>Set rate request period in seconds (86400 = request once in a 24 hours) by sending
                                TOX command:
                                <div className="copied_command">
                                    <p className="clickable_command">settings set
                                        "config.payments->get_fiat_rates_interval" "86400"</p>
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
                            <li>Send TOX command
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


                        <h2 id="afaq12">How to reset validator accepted cash counters after
                            removing cash from validator (screen show
                            automatically when you remove cash cassette)</h2>
                        <ol>
                            <li>You can just press "continue" button when you removed cash validator cassette</li>
                            <li>If you forget to press "continue" button, you can just send TOX command:
                                <div className="copied_command">
                                    <p className="clickable_command">device validator incassation -quiet</p>
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


                        <h2 id="afaq13">How to reset cash dispenser counters after changing
                            dispenser cash cassettes</h2>
                        <ol>
                            <li>You can just enter new counters and press "continue" button when you changed cash
                                dispenser cassettes (screen show automatically when you removing one of cassettes)
                            </li>
                            <li>If you forget to enter new counters, you can just send TOX command:
                                <div className="copied_command">
                                    <p className="clickable_command">device dispenser incassation -quiet "NEW COUNTER
                                        VALUE FOR UPPER CASH
                                        CASSETTE" "NEW COUNTER VALUE FOR LOWER CASH CASSETTE"</p>
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


                        <h2 id="afaq14">How to change timezone on Trovemat</h2>
                        <ol>
                            <li>Run command line in TOX on Trovemat by using command:
                                <div className="copied_command">
                                    <p className="clickable_command">run -sync "sh"</p>
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
                            <li>Find your timezone by sending following command:
                                <div className="copied_command">
                                    <p className="clickable_command">timedatectl list-timezones</p>
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
                            <li>Set timezone by sending following command (replace NEW_TIMEZONE_NAME with timezone name
                                from "timedatectl list-timezones" command output) - please pay attention - that command
                                requires password for "trovemat" user in OS:
                                <div className="copied_command">
                                    <p className="clickable_command">sudo -S timedatectl set-timezone
                                        NEW_TIMEZONE_NAME</p>
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
                            <li>Restart OS on Trovemat by sending following command:
                                <div className="copied_command">
                                    <p className="clickable_command">sudo -S reboot</p>
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

                        <h2 id="afaq15">How to use XMPP-based monitoring</h2>
                        <ol>
                            <li>Register your Trovemat as separate user on any publicly available (or private)
                                XMPP-based servers (i.e. <a href="https://jabber.ru">jabber.ru</a>)
                            </li>
                            <li>Enable XMPP on Trovemat by sending following command:
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.gateways.xmpp->use' 'true'</p>
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
                            <li>Save username and password for XMPP-server by sending following commands:
                                <div className="copied_command">
                                    <p className="clickable_command">settings set 'config.gateways.xmpp->username' 'XMPP
                                        USERNAME IN FORM (i.e. login@jabber.ru)'</p>
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
                                    <p className="clickable_command">settings set 'config.gateways.xmpp->password' 'XMPP
                                        PASSWORD'</p>
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
                            <li>Restart Trovemat by sending following command:
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
                            <li>Register Trovemat owner account on any publicly available (or private) XMPP-based
                                servers (i.e. <a href="https://jabber.ru">jabber.ru</a>)
                            </li>
                            <li>Add Trovemat's owner as Trovemat admin:
                                <div className="copied_command">
                                    <p className="clickable_command">xmpp user add –admin 'user_1' 'login@jabber.ru'</p>
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
                            <li>Use and XMPP-compatible IM client, i.e. <a
                                href="https://gajim.org/downloads.php">Gaijim</a> or <a
                                href="https://www.pidgin.im/download">Pidgin</a> with Trovemat's owner XMPP account
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}