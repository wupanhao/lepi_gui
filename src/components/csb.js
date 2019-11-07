import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
import $ from  'jquery';

class CSB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: 367,
            i: -1,
            data: [367, 368, 369, 370, 371]
        }

        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.listenCsbDiv = this.listenCsbDiv.bind(this);
        this.onClick = this.onClick.bind(this);

    }
    componentDidMount(){
        document.addEventListener("keydown", this.listenCsbDiv)
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.listenCsbDiv)
    }
    onClick() {
        const data = this.state.data;
        const i = this.state.i;
        this.setState({val: data[i] || ''});
    }
    listenCsbDiv = (e) => {
        const _this = this;
        const divs = $('.p-text-span');
        const i = _this.state.i;
        if (i === -1) {
            _this.setState({
                i: 0
            });
        }
        if(e && e.keyCode){
            // console.log('keyCode : ', e.keyCode);
            switch(e.keyCode) {
                case 13:
                    _this.onClick();
                    break;
                case 37:
                    if (i >= 1 && i - 1 < divs.length) {
                        _this.setState({
                            i: i - 1
                        });
                    }
                    break;
                case 39:
                    if (i >= 0 && i + 1 < divs.length) {
                        _this.setState({
                            i: i + 1
                        });
                    }
                    break;
            }
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="s-body">

                    <div className="p-center">
                        <div className="p-line"></div>
                    </div>
                    <div className="p-bottom">
                        <div>距离障碍物：{this.state.val} &nbsp;CM</div>
                    </div>
                    <div>
                        <div className="p-text">
                            <span className={`p-text-span ${this.state.i === 0 ? 's-active' : ''}`} value="367">S1</span>
                            <span className={`p-text-span ${this.state.i === 1 ? 's-active' : ''}`} value="368">S2</span>
                            <span className={`p-text-span ${this.state.i === 2 ? 's-active' : ''}`} value="369">S3</span>
                            <span className={`p-text-span ${this.state.i === 3 ? 's-active' : ''}`} value="360">S4</span>
                            <span className={`p-text-span ${this.state.i === 4 ? 's-active' : ''}`} value="361">S5</span>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}

export default CSB


