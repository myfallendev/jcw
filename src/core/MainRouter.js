import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Home } from 'features/Home';
import { Converter } from 'features/Converter';
import { FAQ } from 'features/FAQ';
import { PersonalPage } from 'features/PersonalPage';
import { Exchange } from 'features/Exchange';
import { DocsRouter } from 'features/TrovematDocs';

import { Notify } from './components/Notify';
import { PaymentResult } from './components/PaymentResult';

const MainRouterComponent = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/trovemat-docs" component={DocsRouter} />
			<Route path="/simplex/:operationResult" component={Home} />
			<Route path="/verify/:verifyCode" component={Home} />
			<Route path="/payments" component={Converter} />
			<Route exact path="/exchange" component={Exchange} />
			<Route path="/exchange/:filter" component={Exchange} />
			<Route path="/faq" component={FAQ} />
			<Route path="/personal-page" component={PersonalPage} />
			<Route path="/payment-result" component={PaymentResult} />
			<Route path="/notify" component={Notify} />
			<Redirect to="/" />
		</Switch>
	</main>
);

export const MainRouter = withRouter(MainRouterComponent);
