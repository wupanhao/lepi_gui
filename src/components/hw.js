import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
class HW extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <div className="">
                        <div className="p-text"><select className="p-select">
                            <option value="">P1</option>
                            <option>P2</option>
                            <option>P3</option>
                            <option>P4</option>
                            <option>P5</option>
                        </select></div>
                    </div>
                    <div className="p-center">
                        <div className="p-text">光值：1243123</div>
                    </div>
                    <div className="p-bottom">
                        <div className="p-text">阈值：1342312</div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default HW


