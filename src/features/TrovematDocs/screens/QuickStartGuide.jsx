import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Highlight from 'react-highlight';
import 'highlightjs/styles/github.css';

export class QuickStartGuide extends Component {
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
					<div className="wrapper">
						<h1>Quick Start Guide</h1>
						<p>Congratulations!</p>
						<p>
							You get your Trovemat unpacked, and ready to work. All our Trovemat’s shipped with pre-installed OS and
							Trovemat software. If you filled our questionnaire after payment process, then we prepare your Trovemat
							with your info (phone, address, etc). However, you still need to do some actions, in order for Trovemat to
							start working.
						</p>
						<ol>
							<li>
								Install TOX (<a href="https://tox.chat">https://tox.chat</a>) client (iOS – Antidote, Android – Antox,
								Windows – qTox, MAС OS – qTox, uTox)
							</li>
							<li>Plug-in Trovemat to electrical outlet</li>
							<li>Attach keyboard to Trovemat computer.</li>
							<li>
								Connect Trovemat to Internet (Ethernet cable, Wireless).
								<ol>
									<li>
										For wireless connection please follow these steps:
										<ol>
											<li>
												Wait for Trovemat to start (when started first time, it will show “OUT OF SERVICE” screen),
											</li>
											<li>While Trovemat software is running (regardless of the screen), press F1 twice.</li>
											<li>On the "Trovemat interface is starting" screen press ALT + F4 on keyboard</li>
											<li>Press "Logout" button in the dialog</li>
											<li>
												Run the following command:
												<br />
												<span className="code">nmtui</span>
											</li>
											<li>Choose "Activate a connection" menu item using TAB key</li>
											<li>Choose your WiFi network from the list</li>
											<li>Enter password, if your WiFi network requires it</li>
											<li>Check if it's connected (star symbol must appear near WiFi network name)</li>
											<li>
												Run the following command:
												<br />
												<span className="code">exit</span>
											</li>
										</ol>
									</li>
								</ol>
							</li>
							<li>Wait for Trovemat to start (when started first time, it will show “OUT OF SERVICE” screen)</li>
							<li>Go to Trovemat service menu by pressing F1 and F2 sequentially. You will see something like that:</li>
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/service_menu.png" alt="Service menu" />
							</p>
							<li>Press “Admin List” button</li>
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/admin_list.png" alt="Press “Admin List” button" />
							</p>
							<li>Press “Add administrator” button</li>
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/add_administrator.png" alt="Add administrator" />
							</p>
							<li>Scan you TOX id from the client, you installed in step 1.</li>
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/scan.png" alt="Camera" />
							</p>
							<li>Wait for friend request from Trovemat</li>
							<li>
								When Trovemat will be added to your contacts list in TOX client – you can send commands to Trovemat just
								chatting with it.
							</li>
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/chat.png" alt="Commands to Trovemat" />
							</p>
							<li>
								Generate API keys for Trovemat on your cryptocurrency exchange account. <br />
								E.g. Bittrex cryptocurrency exchange API keys generating screen:
							</li>
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/generate.png" alt="Generate keys" />
							</p>
							<li>
								Send command to Trovemat using your TOX client:
								<br />
								<div className="copied_command">
									<p className="clickable_command">template use 'TEMPLATE_NAME' 'API_PUBLIC_KEY' 'API_SECRET_KEY'</p>
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
								<br />
								<span className="code">TEMPLATE_NAME</span> – it’s a name of your cryptocurrency exchange
								<br />
								<span className="code">API_PUBLIC_KEY</span> – public key from exchange
								<br />
								<span className="code">API_SECRET_KEY</span> – secret key from exchange
								<br />
								E.g. command for Bittrex:
								<br />
								<div className="copied_command">
									<p className="clickable_command">
										template use 'Bittrex' '2ebb3ffc34264cbfbb38da47c74234b8' '77430d1ec579421ba2b8a4a0e0785b97'
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
								<br />
							</li>
							<li>
								Send command to Trovemat using your TOX client:
								<br />
								<span className="code">service close</span>
							</li>
							<li>
								Wait for Trovemat starts. When it starts – it need 5-10 minutes to load balances from cryptocurrency
								exchange. When balances is available and positive, you will see Trovemat main screen with coin buttons,
								available for purchase.
							</li>
							<img className="press-Yes" src="/img/faq-image/ready.png" alt="ready" />
						</ol>
					</div>
				</div>
			</div>
		);
	}
}
