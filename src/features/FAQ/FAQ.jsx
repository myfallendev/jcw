import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSendQuestion, resetSendQuestion } from './faqSlice';
import { ModalContainer } from 'core/components/ModalContainer';
import { Question } from './components/Question';
import { Loader } from 'core/components/Loader';

export const FAQ = () => {
	const dispatch = useDispatch();
	const [textFieldIsEmpty, setTextFieldIsEmpty] = useState(true);
	const { questionSendingSuccess, fetching, errors } = useSelector((state) => state.faq);
	const { activeLanguage: currentLanguage, languages } = useSelector((state) => state.language);
	const activeLanguage = languages[currentLanguage];

	const title = useRef();
	const text = useRef();

	useEffect(() => {
		dispatch(resetSendQuestion());
	}, []);

	const sendQuestion = () => {
		if (textFieldIsEmpty) return;

		dispatch(fetchSendQuestion(title.current.value, text.current.value));
		title.current.value = '';
		text.current.value = '';
	};

	const handleTextTyping = (e) => {
		setTextFieldIsEmpty(e.target.value < 3);
	};

	const closeSendMessagePopup = () => {
		dispatch(resetSendQuestion());
	};

	const submitButtonClassName = 'btn btn-large btn-orange send-question' + (!!textFieldIsEmpty ? ' disabled' : '');

	return (
		<div className="content support">
			<div className="faq">
				<div>
					<h1>FAQ</h1>
					<p className="px20-semipale-text">{activeLanguage.support_text}</p>
					<div className="question-list">
						{activeLanguage.faq.sections.map((section, index) =>
							section.questions.length ? (
								<div key={'q' + index}>
									<h3>{section.title}</h3>
									{section.questions.map((q, i) => (
										<Question key={i} question={q} />
									))}
								</div>
							) : (
								''
							)
						)}
					</div>
				</div>
			</div>
			<p className="question-hint">{activeLanguage.support_hint}</p>
			<div className="faq-form">
				{fetching && <Loader />}
				<div className={fetching ? ' blur' : ''}>
					<input
						className={'question-title ' + (errors.length > 0 ? 'unvalidated' : '')}
						ref={title}
						placeholder={activeLanguage.support_question_placeholder}
						onClick={() => dispatch(resetSendQuestion())}
					/>
					<textarea
						className={errors.length > 0 ? 'unvalidated' : ''}
						ref={text}
						onClick={() => dispatch(resetSendQuestion())}
						onChange={handleTextTyping}
					></textarea>
					<button className={submitButtonClassName} onClick={sendQuestion} disabled={textFieldIsEmpty}>
						{activeLanguage.support_question_button}
					</button>
				</div>
			</div>
			{questionSendingSuccess && (
				<ModalContainer
					title={activeLanguage.support_menu}
					fnmodalvisible={closeSendMessagePopup}
					additionalClass="support-send-message-popup"
				>
					<h3 className="support-send-message-popup__title">
						{questionSendingSuccess && activeLanguage.support_question_success_text}
						{errors.length > 0 && errors[0].value}
					</h3>
					<button className="btn btn-orange" onClick={closeSendMessagePopup}>
						{activeLanguage.ok_btn}
					</button>
				</ModalContainer>
			)}
		</div>
	);
};
