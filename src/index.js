import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './views/app'
import reducers from './redux/reducers'
import './public/css/index.css';
import './public/images/test.png';
import {BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';

const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();


