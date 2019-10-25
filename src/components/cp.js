import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
import y1 from '../public/images/y1.png';
import y2 from '../public/images/y2.png';
import $ from  'jquery';

class CP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isClick: true
        }
        this.onClick = this.onClick.bind(this);
        this.listenCPDiv = this.listenCPDiv.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        document.addEventListener("keydown", this.listenCPDiv)
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.listenCPDiv)
    }
    listenCPDiv = (e) => {
        const _this = this;
        if(e && e.keyCode){
            switch(e.keyCode) {
                case 67://Choose 'C' 67
                    $('.p-select').focus()
                    break;
                case 82://'R' 82
                    _this.onClick();
                    break;

            }
        }

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


