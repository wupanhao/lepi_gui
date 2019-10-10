import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
class CSB extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <div>
                        <div className="p-text"><select className="p-select">
                            <option>P1</option>
                            <option>P2</option>
                            <option>P3</option>
                            <option>P4</option>
                            <option>P5</option>
                        </select></div>
                    </div>
                    <div className="p-center">
                        <div className="p-line"></div>
                    </div>
                    <div className="p-bottom">
                        <div>距离障碍物：367 &nbsp;CM</div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default CSB


