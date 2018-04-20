import { Switch, Route } from 'react-router-dom';

import { Profile } from './containers';
import DataComponent from './HOC/DataComponent';
import List from './ui/List';
import Header from './ui/Header';
import Whoops404 from './ui/Whoops404';

import '../style/app.css';

const PersonsList = DataComponent(List, '/api/persons');

const App = () => (
    <div className="app">
        <Header />
        <Switch>
            <Route exact path="/" component={PersonsList} />
            <Route path="/profile" component={Profile} />
            <Route component={Whoops404} />
        </Switch>
    </div>
);

export default App;