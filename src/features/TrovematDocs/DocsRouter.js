import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TrovematDocs } from './TrovematDocs.jsx';
import { InstallGuide } from './screens/InstallGuide.jsx';
import { UserGuide } from './screens/UserGuide.jsx';
import { Questions } from './screens/Questions.jsx';
import { AdvancedQuestions } from './screens/AdvancedQuestions.jsx';
import { TrovematDev } from './screens/TrovematDev.jsx';
import { QuickStartGuide } from './screens/QuickStartGuide.jsx';
import { OperatingSystemInstallGuide } from './screens/OperatingSystemInstallGuide.jsx';

const DocsRouterComponent = () => (
	<Switch>
		<Route exact path="/trovemat-docs" component={TrovematDocs} />
		<Route path="/trovemat-docs/user-guide" component={UserGuide} />
		<Route path="/trovemat-docs/questions" component={Questions} />
		<Route path="/trovemat-docs/advanced-questions" component={AdvancedQuestions} />
		<Route path="/trovemat-docs/install-guide" component={InstallGuide} />
		<Route path="/trovemat-docs/trovemat-dev" component={TrovematDev} />
		<Route path="/trovemat-docs/quick-start-guide" component={QuickStartGuide} />
		<Route path="/trovemat-docs/operating-system-install-guide" component={OperatingSystemInstallGuide} />
	</Switch>
);

export const DocsRouter = withRouter(DocsRouterComponent);
