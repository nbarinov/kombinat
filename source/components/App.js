import { Switch, Route } from 'react-router-dom';

import { Profile, Admin } from './containers';
import DataComponent from './HOC/DataComponent';
import List from './ui/List';
import Header from './ui/Header';
import Whoops404 from './ui/Whoops404';

import '../style/app.css';

const PersonsList = DataComponent(List, '/api/persons');

const App = () => (
    <div className="app">
        <Header className="app__header" />
        <Switch>
            <Route exact path="/" component={PersonsList} />
            <Route path="/admin" component={Admin} />
            <Route path="/profile" component={Profile} />
            <Route component={Whoops404} />
        </Switch>
    </div>
);

export default App;