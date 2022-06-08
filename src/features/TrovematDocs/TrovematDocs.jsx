import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const TrovematDocs = () => {
	useEffect(() => {
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
						doneIcon.style.display = 'block';

						setTimeout(() => {
							copyIcon.style.display = 'block';
							doneIcon.style.display = 'none';
						}, 5000);
					})
					.catch((err) => {
						console.log('Error: ', err);
					});
			}
		});
	}, []);

	return (
		<div className="faq-block">
			<h1>Trovemat Docs</h1>
			<div className="faq-block__container">
				<div className="faq-block__menu">
					<Link className="faq-block__menu-item" to="/trovemat-docs/questions">
						<div className="faq-block__menu-item-img">
							<img src="/img/faq-ico/Faq.svg" alt="FAQ" />
						</div>
						<div className="faq-block__menu-item-title">Frequently Asked Questions</div>
					</Link>
					<Link className="faq-block__menu-item" to="/trovemat-docs/advanced-questions">
						<div className="faq-block__menu-item-img">
							<img src="/img/faq-ico/Advanced_FAQ.svg" alt="Advanced FAQ" />
						</div>
						<div className="faq-block__menu-item-title">Advanced Frequently Asked Questions</div>
					</Link>
					<Link className="faq-block__menu-item" to="/trovemat-docs/install-guide">
						<div className="faq-block__menu-item-img">
							<img src="/img/faq-ico/Install_Guide.svg" alt="Install guide" />
						</div>
						<div className="faq-block__menu-item-title">Trovemat software install guide</div>
					</Link>
					<Link className="faq-block__menu-item" to="/trovemat-docs/user-guide">
						<div className="faq-block__menu-item-img">
							<img src="/img/faq-ico/User_Guide.svg" alt="User guide" />
						</div>
						<div className="faq-block__menu-item-title">Trovemat Kiosk User Guide</div>
					</Link>
					<Link className="faq-block__menu-item" to="/trovemat-docs/trovemat-dev">
						<div className="faq-block__menu-item-img">
							<img src="/img/faq-ico/VersionHistory.svg" alt="Version history" />
						</div>
						<div className="faq-block__menu-item-title">Version History</div>
					</Link>
					<Link className="faq-block__menu-item" to="/trovemat-docs/quick-start-guide">
						<div className="faq-block__menu-item-img">
							<img src="/img/faq-ico/QuickStart_Guide.svg" alt="QuickStart guide" />
						</div>
						<div className="faq-block__menu-item-title">Quick Start Guide</div>
					</Link>
					<Link className="faq-block__menu-item" to="/trovemat-docs/operating-system-install-guide">
						<div className="faq-block__menu-item-img">
							<img src="/img/faq-ico/OSInstall_Guide.svg" alt="OS Install guide" />
						</div>
						<div className="faq-block__menu-item-title">Operating System Install Guide</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
