import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
class MD extends Component {
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
                    <div className="s-list">
                        M1：&nbsp;&nbsp;+100
                    </div>
                    <div className="s-list">
                        M2：&nbsp;&nbsp;+100
                    </div>
                    <div className="s-list">
                        M3：&nbsp;&nbsp;+100
                    </div>
                    <div className="s-list">
                        M4：&nbsp;&nbsp;-100
                    </div>
                    <div className="s-list">
                        编码器：+100
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default MD


