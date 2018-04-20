import { Switch, Route } from 'react-router-dom';

import DataComponent from './DataComponent';
import List from './List';
import Header from './Header';
import LogInForm from './LogInForm';

import '../style/app.css';

const PersonsList = DataComponent(List, '/api/persons');

const App = () => (
    <div className="app">
        <Header />
        <Switch>
            <Route exact path="/" component={PersonsList} />
            <Route path="/login" component={LogInForm} />
        </Switch>
    </div>
);

export default App;