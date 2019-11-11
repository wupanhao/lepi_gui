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
import PROJECTLIST from './projectList';

import {
    HashRouter,
    Route,
    Switch
} from "react-router-dom";

import ros_client from './ros'


class App extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        console.log('app.js componentDidMount')
        this.ros = new ros_client('ws://192.168.50.150:9090')
        this.ros.conectToRos(() => {
            console.log('success')
            document.ros = this.ros
        })

    }
    componentWillUnmount() {
        console.log('app.js componentWillUnmount')
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
                        <Route exact path="/projectList" component={PROJECTLIST}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App