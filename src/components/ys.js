import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
import $ from  'jquery';
class YS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            R: 132,
            B: 180,
            G: 120,
            C: 55,
            M: 16,
            Y: 63,
            K: 0
        }
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
                    $('#p-select').focus()
                    break;
                case 13://Choose 'C' 67
                    const p = $('#p-select').val();
                    _this.setState({R: 132,
                        B: 180,
                        G: 120,
                        C: 55,
                        M: 16,
                        Y: 63,
                        K: 0});
                    break;

            }
        }

    }

    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <table>
                        <tbody>
                        <tr><td colSpan="1" className="td-r" style={{paddingLeft: '0px'}}><select className="p-select" id="p-select">
                            <option>P1</option>
                            <option>P2</option>
                            <option>P3</option>
                            <option>P4</option>
                            <option>P5</option>
                        </select></td><td className="td-l" colSpan="3"><div className="g-div"></div></td></tr>
                        <tr><td className="td-l">R：{this.state.R}</td><td className="td-r">C：{this.state.C}%</td></tr>
                        <tr><td className="td-l">B：{this.state.B}</td><td className="td-r">M：{this.state.M}%</td></tr>
                        <tr><td className="td-l">G：{this.state.G}</td><td className="td-r">Y：{this.state.Y}%</td></tr>
                        <tr><td className="td-l"><div></div></td><td className="td-r">K：{this.state.K}%</td></tr>
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        )
    }
}

export default YS


