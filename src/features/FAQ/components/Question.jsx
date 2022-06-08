import React, { useState, useEffect } from 'react';

export const Question = ({ question }) => {
	const [opened, setOpened] = useState(false);

	useEffect(() => {
		setOpened(false);
	}, []);

	const changeState = () => {
		setOpened((prevState) => !prevState);
	};

	return (
		<div className="question">
			<div className="question__title">
				<span dangerouslySetInnerHTML={{ __html: question.name }}></span>
				<button onClick={changeState}>{opened ? '-' : '+'}</button>
			</div>
			<p
				className={'support_answer ' + (opened ? '' : 'hidden-element')}
				dangerouslySetInnerHTML={{ __html: question.text }}
			></p>
		</div>
	);
};
