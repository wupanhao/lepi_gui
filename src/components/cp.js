import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
import y1 from '../public/images/y1.png';
import y2 from '../public/images/y2.png';
class CP extends Component {
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
                    <div className="s-roll">
                        <a onClick={() => this.onClick()}><img src={this.state.isClick ? y1 : y2} alt=""/></a>
                    </div>
                    <div className="text-p1"><select className="p-select">
                        <option>P1</option>
                        <option>P2</option>
                        <option>P3</option>
                        <option>P4</option>
                        <option>P5</option>
                    </select></div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default CP


