import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
import $ from  'jquery';

class MD extends Component {
    constructor(props) {
        super(props)
        this.state = {
            t: -1,
            M1: {v: 0, val: 0},
            M2: {v: 0, val: 0},
            M3: {v: 0, val: 0},
            M4: {v: 0, val: 0},
            M5: {v: 0, val: 0}
        }
        this.onClick = this.onClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onMDKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onMDKeyDown)
    }

    onMDKeyDown = (e) => {
        const _this = this;
        const divs = $('.s_table_tr');
        const i = _this.state.t;
        if (i === -1) {
            _this.setState({
                t: 0
            });
        }
        if (e && e.keyCode) {
            switch (e.keyCode) {
                case 13: //回车事件
                    const links = $('.t_td');
                    if (links.length > 0 && i != -1) {
                        links[this.state.t] ? links[this.state.t].click() : null;
                    }
                    break;
                case 38://上
                    if (i - 1 >= 0 && i - 1 < divs.length) {
                        _this.setState({t: i - 1});
                    }
                    break;
                case 40://下
                    if (i >= 0 && i + 1 < divs.length) {
                        _this.setState({t: i + 1});
                    }
                    break;
                case 37:
                    _this.md_reduce();
                    break;
                case 39:
                    _this.md_increase();
                    break;
            }
        }
    }

    md_reduce() {
        if(this.state.t == 0){
            if (this.state.M1.v > -100 && this.state.M1.v <= 100) {
                this.setState({M1: {v: this.state.M1.v - 1, val: Math.round(Math.random()*10)}});
            }
        }
        if(this.state.t == 1){
            if (this.state.M2.v > -100 && this.state.M2.v <= 100) {
                this.setState({M2: {v: this.state.M2.v - 1, val: Math.round(Math.random()*10)}});
            }
        }
        if(this.state.t == 2){
            if (this.state.M3.v > -100 && this.state.M3.v <= 100) {
                this.setState({M3: {v: this.state.M3.v - 1, val: Math.round(Math.random()*10)}});
            }
        }
        if(this.state.t == 3){
            if (this.state.M4.v > -100 && this.state.M4.v <= 100) {
                this.setState({M4: {v: this.state.M4.v - 1, val: Math.round(Math.random()*10)}});
            }
        }
        if(this.state.t == 4){
            if (this.state.M5.v > -100 && this.state.M5.v <= 100) {
                this.setState({M5: {v: this.state.M5.v - 1, val: Math.round(Math.random()*10)}});
            }
        }

    }

    md_increase() {
        if(this.state.t == 0){
            if (this.state.M1.v >= -100 && this.state.M1.v < 100) {
                this.setState({M1: {v: this.state.M1.v + 1, val: Math.round(Math.random()*10)}});
            }
        }
        if(this.state.t == 1){
            if (this.state.M2.v >= -100 && this.state.M2.v < 100) {
                this.setState({M2: {v: this.state.M2.v + 1, val: Math.round(Math.random()*10)}});
            }
        }
        if(this.state.t == 2){
            if (this.state.M3.v >= -100 && this.state.M3.v < 100) {
                this.setState({M3: {v: this.state.M3.v + 1, val: Math.round(Math.random()*10)}});
            }
        }
        if(this.state.t == 3){
            if (this.state.M4.v >= -100 && this.state.M4.v < 100) {
                this.setState({M4: {v: this.state.M4.v + 1, val: Math.round(Math.random()*10)}});
            }
        }
        if(this.state.t == 4){
            if (this.state.M5.v >= -100 && this.state.M5.v < 100) {
                this.setState({M5: {v: this.state.M5.v + 1, val: Math.round(Math.random()*10)}});
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
                <div className="s-body-md">
                    <table className="s_table" rules="none">
                        <tbody>
                        <tr>
                            <th>M名</th>
                            <th>速度</th>
                            <th>编码器</th>
                        </tr>
                        <tr className={`s_table_tr ${this.state.t === 0 ? 'active' : ''}`}>
                            <th>M1</th>
                            <td className="t_td">{this.state.M1.v}</td>
                            <td>{this.state.M1.val}</td>
                        </tr>
                        <tr class={`s_table_tr ${this.state.t === 1 ? 'active' : ''}`}>
                            <th>M2</th>
                            <td className="t_td">{this.state.M2.v}</td>
                            <td>{this.state.M2.val}</td>
                        </tr>
                        <tr class={`s_table_tr ${this.state.t === 2 ? 'active' : ''}`}>
                            <th>M3</th>
                            <td className="t_td">{this.state.M3.v}</td>
                            <td>{this.state.M3.val}</td>
                        </tr>
                        <tr class={`s_table_tr ${this.state.t === 3 ? 'active' : ''}`}>
                            <th>M4</th>
                            <td className="t_td">{this.state.M4.v}</td>
                            <td>{this.state.M4.val}</td>
                        </tr>
                        <tr class={`s_table_tr ${this.state.t === 4 ? 'active' : ''}`}>
                            <th>M5</th>
                            <td className="t_td">{this.state.M5.v}</td>
                            <td>{this.state.M5.val}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        )
    }
}

export default MD


