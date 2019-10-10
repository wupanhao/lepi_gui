import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
class YS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isClick: true
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({isClick: !this.state.isClick});
    }

    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <table>
                        <tbody>
                        <tr><td colSpan="1" className="td-r" style={{paddingLeft: '0px'}}><select className="p-select">
                            <option>P1</option>
                            <option>P2</option>
                            <option>P3</option>
                            <option>P4</option>
                            <option>P5</option>
                        </select></td><td className="td-l" colSpan="3"><div className="g-div"></div></td></tr>
                        <tr><td className="td-l">R：132</td><td className="td-r">C：55%</td></tr>
                        <tr><td className="td-l">B：180</td><td className="td-r">M：16%</td></tr>
                        <tr><td className="td-l">G：120</td><td className="td-r">Y：63%</td></tr>
                        <tr><td className="td-l"><div></div></td><td className="td-r">K：0%</td></tr>
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        )
    }
}

export default YS


