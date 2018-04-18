import { Switch, Route } from 'react-router-dom';
import DataComponent from './DataComponent';
import List from './List';

import '../style/app.css';

const PersonsList = DataComponent(List, '/api/persons');

const App = () => (
    <Switch>
        <Route path="/" component={() => <PersonsList />} />
    </Switch>
);

export default App;