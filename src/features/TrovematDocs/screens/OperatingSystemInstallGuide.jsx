import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Highlight from 'react-highlight';
import 'highlightjs/styles/github.css';

export class OperatingSystemInstallGuide extends Component {
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
						<h1>Operating System Install Guide</h1>
						<div class="faq-content__menu-list">
							<h2>Contents:</h2>
							<ol>
								<li>
									<a href="#Create bootable">Create bootable USB flash-drive</a>
								</li>
								<li>
									<a href="#Install OS">Install OS on Kiosk</a>
								</li>
								<li>
									<a href="#Installing software">Installing Trovemat software</a>
								</li>
								<li>
									<a href="#Setup software">Setup Trovemat software</a>
								</li>
								<li>
									<a href="#Links">Links</a>
								</li>
							</ol>
						</div>
						<h4 id="Create bootable">Create bootable USB flash-drive</h4>
						<p>First we need to create a bootable flash-drive with OS Ubuntu on it:</p>
						<ol>
							<li>
								Download Ubuntu ISO image using the following URL:
								<br />{' '}
								<a href="http://releases.ubuntu.com/16.04/ubuntu-16.04.6-server-amd64.iso">
									http://releases.ubuntu.com/16.04/ubuntu-16.04.6-server-amd64.iso
								</a>
							</li>
							<li>
								We can use Rufus:
								<br /> (
								<a href="https://github.com/pbatard/rufus/releases/download/v3.5/rufus-3.5.exe">
									https://github.com/pbatard/rufus/releases/download/v3.5/rufus-3.5.exe
								</a>
								)<br />
								for creating bootable flash-drive. Run that program.
							</li>
							<li>
								Insert USB flash drive, it must be available in the devices list. Make sure you choose the following
								settings: Create a bootable disk using ISO Image. Press on the button right to that option to choose ISO
								image file, locate downloaded Ubuntu ISO Image file and press “Start” button:
							</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/press start.png"
									alt="press start"
								/>
							</p>
							<li>If there is a need to download some files – press «Yes» button:</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/press Yes.png"
									alt="press Yes"
								/>
							</p>
							<li>Choose «Write in ISO Image mode» and press «ОК»:</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/press OK.png"
									alt="press OK"
								/>
							</p>
							<li>Press «OK» when program warns about deleting all data on USB flash drive:</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/deleting.png"
									alt="deleting"
								/>
							</p>
						</ol>
						<h4 id="Install OS">Install OS on Kiosk</h4>
						<p>Install Ubuntu on Kiosk:</p>
						<ol>
							<li>Attach keyboard and bootable USB flash drive with OS Ubuntu image installed.</li>
							<li>
								Restart computer by pressing button on it. Press F12 button while computer is starting to get to the
								boot menu.
							</li>
							<li>
								Choose USB flash drive as boot source (IMPORTANT: choose «WITHOUT UEFI» option) and press «Enter».
							</li>
							<li>
								Use following screenshots as an example (choose options as showed on the screenshots, press ENTER to go
								to the next step; some steps has more detailed comments):
							</li>
						</ol>
						<h3>STEP 1</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/language selection.png"
								alt="language selection"
							/>
						</p>
						<h3>STEP 2</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/install ubuntu.png"
								alt="install ubuntu"
							/>
						</p>
						<h3>STEP 3</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/select a language.png"
								alt="select a language"
							/>
						</p>
						<h3>STEP 4</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/select location.png"
								alt="select location"
							/>
						</p>
						<h3>STEP 5</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/configure.png"
								alt="configure"
							/>
						</p>
						<h3>STEP 6</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/country keyboard.png"
								alt="country keyboard"
							/>
						</p>
						<h3>STEP 7</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/keyboard layout.png"
								alt="keyboard layout"
							/>
						</p>
						<h3>STEP 8</h3>
						<p>Enter host name (or leave it by default):</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/configure network.png"
								alt="configure network"
							/>
						</p>
						<h3>STEP 9</h3>
						<p>Enter user name:</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/full name.png"
								alt="full name"
							/>
						</p>
						<h3>STEP 10</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/username.png"
								alt="username"
							/>
						</p>
						<h3>STEP 11</h3>
						<p>Enter password:</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/password.png"
								alt="password"
							/>
						</p>
						<h3>STEP 12</h3>
						<p>Repeat password:</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/repeat password.png"
								alt="repeat password"
							/>
						</p>
						<h3>STEP 13</h3>
						<p>
							If weak password warning appears – you can skip it and continue with the weak root password (WARNING: WEAK
							PASSWORD LOWER YOUR KIOSK SECURITY), or you can go back and change password to more secure:
						</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/use password.png"
								alt="use password"
							/>
						</p>
						<h3>STEP 14</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/encrypt directory.png"
								alt="encrypt directory"
							/>
						</p>
						<h3>STEP 15</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/configure clock.png"
								alt="configure clock"
							/>
						</p>
						<h3>STEP 16</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/partition disks.png"
								alt="partition disks"
							/>
						</p>
						<h3>STEP 17</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/select disc.png"
								alt="select disc"
							/>
						</p>
						<h3>STEP 18</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/changes to disks.png"
								alt="changes to disks"
							/>
						</p>
						<h3>STEP 19</h3>
						<p>Leave disk size unchanged (as entered):</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/amount volume.png"
								alt="amount volume"
							/>
						</p>
						<h3>STEP 20</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/write changes.png"
								alt="write changes"
							/>
						</p>
						<h3>STEP 21</h3>
						<p>Leave this field blank and press «Enter»:</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/configure manager.png"
								alt="configure manager"
							/>
						</p>
						<h3>STEP 22</h3>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/configure tasksel.png"
								alt="configure tasksel"
							/>
						</p>
						<h3>STEP 23</h3>
						<p>
							You need to check 2 options: «standart system utilities» and «OpenSSH Server». You can check option by
							pressing “Space” button, move between options – buttons “Up” and “Down”. When both options are checked –
							press “Enter” to continue.
						</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/software selection.png"
								alt="software selection"
							/>
						</p>
						<h3>STEP 24</h3>
						<p>
							Installation process can show you all available hard drives, where boot loader can be installed (on the
							following screenshot there is only one hard drive).
						</p>
						<p className="mid">
							<img
								className="press-Yes"
								src="/img/faq-image/Operating System Install Guide/install the BRUB.png"
								alt="install the BRUB"
							/>
						</p>
						<h3>STEP 25</h3>
						<p className="mid">
							<img className="press-Yes" src="/img/faq-image/Operating System Install Guide/finish.png" alt="finish" />
						</p>
						<h4 id="Installing software">Installing Trovemat software</h4>
						<p>Full Trovemat install guide available here:</p>
						<Link to="/faq/install-guide">https://jetcrypto.com/faq/install-guide</Link>
						<ol>
							<li>After OS is started enter login and press «Enter»:</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/enter login.png"
									alt="enter login"
								/>
							</p>
							<li>
								Enter password, created during OS install process (be aware that there is no symbols showed during
								typing):
							</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/enter pswd.png"
									alt="enter pswd"
								/>
							</p>
							<li>After successful login the screen will look like this:</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/will look.png"
									alt="will look"
								/>
							</p>
							<li>Enter following commands, press “Enter” and wait till command execution finishes.</li>
							<div className="copied_command">
								<p className="clickable_command">wget https://install.trovemat.com/release -O trovemat_installer.sh</p>
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
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/Operating System Install Guide/wget.png" alt="wget" />
							</p>
							<div className="copied_command">
								<p className="clickable_command">chmod +x trovemat_installer.sh</p>
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
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/Operating System Install Guide/chmod.png" alt="chmod" />
							</p>
							<h3>
								!!! ATTENTION !!! CURRENT COMMAND INSTALLS DEMO-VERSION OF THE TROVEMAT SOFTWARE !!! FOR THE UNLIMITED
								VERSION !!! EMAIL TO <a href="sales@trovemat.com">sales@trovemat.com</a>
							</h3>
							<div className="copied_command">
								<p className="clickable_command">sudo ./trovemat_installer.sh $USER</p>
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
							<p className="mid">
								<img className="press-Yes" src="/img/faq-image/Operating System Install Guide/sudo.png" alt="sudo" />
							</p>
							<p>Install license version of the Trovemat software:</p>
							<p>
								You need to install demo version of the Trovemat software, then you have to save login and password from
								Jetcrypto Wallet account with active Trovemat license and restart Trovemat software (see here).
							</p>
							<li>
								When you enter password, Trovemat software install process begins. Install process duration depends of
								the internet connection speed, can last more than 1 hour.
							</li>
							<li>
								At the end of the install process there will be message about touch-screen calibrating procedure. You’ll
								have to press any key to start calibrating procedure:
								<ol>
									<li>Press any key.</li>
									<li>The list of the devices will be displayed.</li>
									<li>Locate Touchscreen device and enter it’s id.</li>
									<li>Calibrate touchscreen by pressing appearing dots on the screen.</li>
									<li>
										When calibrating procedure is finished, OS will reboot and Trovemat software will start
										automatically.
									</li>
								</ol>
							</li>
						</ol>
						<h4 id="Setup software">Setup Trovemat software</h4>
						<p>For first setup of Trovemat software you need to do the following actions:</p>
						<ol>
							<li>Enter service menu by pressing sequentially F1 and F2 on the keyboard, attached to Kiosk.</li>
							<li>Press press «Find devices» button on the main screen of the service menu.</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/find devices.png"
									alt="find devices"
								/>
							</p>
							<li>
								When autosearch of devices is complete, press «Continue» button to save founded devices (there is no
								devices on the screenshot because it has been taken from the virtual machine without any devices
								attached):
							</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/continue.png"
									alt="continue"
								/>
							</p>
							<li>
								If some device, physically connected to kiosk, is missing in the devices list after search, then run
								device search procedure again.
							</li>
							<li>Press "Admin list" button:</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/adm list.png"
									alt="adm list"
								/>
							</p>
							<li>Press «Add administrator» button</li>
							<p className="mid">
								<img
									className="press-Yes"
									src="/img/faq-image/Operating System Install Guide/add adm.png"
									alt="add adm"
								/>
							</p>
							<li>
								Scan QR-code with «tox id». First added administrator will be created with the full rights, and also you
								can't delete that admin anymore using service menu.
							</li>
							<li>
								Following set-up actions can be done by using any available Tox clients (see “Trovemat software install
								guide”)
							</li>
							<h4 id="Links">Links</h4>
							<p>
								Trovemat Install guide:
								<br />
								<Link to="/faq/install-guide">https://jetcrypto.com/faq/install-guide</Link>
							</p>
							<p>
								Trovemat User Guide:
								<br />
								<Link to="/faq/user-guide">https://jetcrypto.com/faq/user-guide</Link>
							</p>
						</ol>
					</div>
				</div>
			</div>
		);
	}
}
