import React from 'react';
import {
    Component
} from 'react';
import Main from './main';
import Test from './test';
import Setting from './setting';
import Sensors from './sensors';
import Variables from './variable';
import CSB from './csb';
import DYGL from './dygl';
import HW from './hw';
import CP from './cp';
import MD from './md';
import YS from './ys';
import TLY from './tly';
import YL from './yl';
import MKF from './mkf';
import YY from './yy';
import LY from './ly';
import CZCP from './czcp';
import BBXX from './bbxx';
import CXGL from './cxgl';

import {
    HashRouter,
    Route,
    Switch
} from "react-router-dom";

import * as ROSLIB from 'roslib'

class App extends Component {
    constructor(props) {
        super(props)

    }
    onBtnEvent(message) {
        // console.log('Received message on ' + listener.name + ': ', message);
        console.log(message)
        // listener.unsubscribe();
        if (message.type == 1) {
            var e = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                // key: message.value,
                keyCode: message.value,
                // code: "KeyQ",
                // shiftKey: true
            });

            document.dispatchEvent(e);
        }

    }
    conectToRos() {
        console.log('trying to conect to ros server:')

        try {
            var ros = new ROSLIB.Ros({
                url: 'ws://localhost:9090'
            });
        } catch (e) {
            console.log('ros client init error:', e)
            console.log('trying to reconect after 3 seconds')
            return this.conectToRos()
        }

        var listener = new ROSLIB.Topic({
            ros: ros,
            name: '/ubiquityrobot/pi_driver_node/button_event',
            messageType: 'pi_driver/ButtonEvent'
        });

        ros.on('connection', () => {
            console.log('Connected to websocket server.');
            listener.subscribe(this.onBtnEvent);
        });

        ros.on('error', function(error) {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.on('close', () => {
            console.log('Connection to websocket server closed.');
            this.conectToRos()
        });

        this.ros = ros
        this.listener = listener
    }
    componentDidMount() {
        console.log('app.js componentDidMount')
        this.conectToRos()
    }
    componentWillUnmount() {
        console.log('app.js componentWillUnmount')
        this.listener.unsubscribe();
    }
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/main" component={Main}/>
                        <Route exact path="/home" component={Main}/>
                        <Route exact path="/test" component={Test}/>
                        <Route exact path="/setting" component={Setting}/>
                        <Route exact path="/sensors" component={Sensors}/>
                        <Route exact path="/variable" component={Variables}/>
                        <Route exact path="/csb" component={CSB}/>
                        <Route exact path="/dygl" component={DYGL}/>
                        <Route exact path="/hw" component={HW}/>
                        <Route exact path="/cp" component={CP}/>
                        <Route exact path="/ys" component={YS}/>
                        <Route exact path="/tly" component={TLY}/>
                        <Route exact path="/md" component={MD}/>
                        <Route exact path="/yl" component={YL}/>
                        <Route exact path="/mkf" component={MKF}/>
                        <Route exact path="/yy" component={YY}/>
                        <Route exact path="/ly" component={LY}/>
                        <Route exact path="/czcp" component={CZCP}/>
                        <Route exact path="/bbxx" component={BBXX}/>
                        <Route exact path="/cxgl" component={CXGL}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App
