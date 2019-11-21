import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import App from './views/app'
import reducers from './redux/reducers/index'
import './public/css/index.css';
import './public/images/test.png';
import {BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';

export let store = {};
if (Object.keys(reducers).length > 0) {
    const combined = combineReducers(reducers);
    store = createStore(combined, window.devToolsExtension && window.devToolsExtension());
}
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();


