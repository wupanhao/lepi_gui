import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
import $ from  'jquery';

class HW extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gz: 1243123,
            fz: 1342312,
            i: -1,
            data: [{gz: 1243123, fz: 1342312}, {gz: 111111, fz: 121212}, {gz: 222222, fz: 232323},
                {gz: 333333, fz: 343434},{gz: 444444, fz: 454545}]
        }

        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.listenHwDiv = this.listenHwDiv.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    componentDidMount() {
        document.addEventListener("keydown", this.listenHwDiv)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.listenHwDiv)
    }

    onClick() {
        const data = this.state.data;
        let i = this.state.i;
        if(i == -1){i = 0;}
        this.setState({
            gz: data[i].gz,
            fz: data[i].fz
        });
    }

    listenHwDiv = (e) => {
        const _this = this;
        const divs = $('.p-text-span');
        const i = _this.state.i;
        if (i === -1) {
            _this.setState({
                i: 0
            });
        }
        if (e && e.keyCode) {
            switch (e.keyCode) {
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
                        <div className="p-text">光值：{this.state.gz}</div>
                    </div>
                    <div className="p-bottom">
                        <div className="p-text">阈值：{this.state.fz}</div>
                    </div>
                    <div className="">
                        <div className="p-text">
                            <span class={`p-text-span ${this.state.i === 0 ? 's-active' : ''}`}>P1</span>
                            <span class={`p-text-span ${this.state.i === 1 ? 's-active' : ''}`}>P2</span>
                            <span class={`p-text-span ${this.state.i === 2 ? 's-active' : ''}`}>P3</span>
                            <span class={`p-text-span ${this.state.i === 3 ? 's-active' : ''}`}>P4</span>
                            <span class={`p-text-span ${this.state.i === 4 ? 's-active' : ''}`}>P5</span>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}

export default HW


