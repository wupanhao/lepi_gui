import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
import $ from  'jquery';

class CP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '陀螺仪',
            X: 0,
            Y: 0,
            Z: 0,
            l: -1
        }
        this.onClick = this.onClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onTlyKeyDown = this.onTlyKeyDown.bind(this);

    }

    componentDidMount() {
        document.addEventListener("keydown", this.onTlyKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onTlyKeyDown)
    }

    onTlyKeyDown = (e) => {
        const _this = this;
        const divs = $("[name='tly-a']");
        const i = _this.state.l;
        if (i === -1) {
            _this.setState({l: 0});
        }
        if (e && e.keyCode) {
            switch (e.keyCode) {
                case 13://回车事件
                    const links = $('a[name="tly-a"]');
                    if (links.length > 0 && i != -1) {
                        links[this.state.l] ? links[this.state.l].click() : null;
                    }
                    /*if (i === -1) {
                        _this.setState({l: 0});
                    }*/
                    break;
                case 37:
                    if (i >= 1 && i - 1 < divs.length) {
                        _this.setState({l: i - 1});
                    }
                    break;
                case 39:
                    if (i >= 0 && i + 1 < divs.length) {
                        _this.setState({l: i + 1});
                    }
                    break;
            }
        }
    }

    onClick(str, x, y, z) {
        this.setState({name: str, X: x, Y: y, Z: z});
    }

    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <div className="s-top">
                        <table>
                            <tbody>
                            <tr>
                                <td></td>
                                <td>X：{this.state.X}</td>
                            </tr>
                            <tr>
                                <td>{this.state.name}</td>
                                <td>Y：{this.state.Y}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Z：{this.state.Z}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="s-center">
                        <div className={`s-center-div ${this.state.l === 0 ? 's-active' : ''}`}>
                            <a name="tly-a"
                               onClick={() => this.onClick('陀螺仪', 123, 123, 123)}>陀螺仪</a>
                        </div>
                        <div className={`s-center-div ${this.state.l === 1 ? 's-active' : ''}`}>
                            <a
                                name="tly-a" onClick={() => this.onClick('加速度', 213, 213, 213)}>加速度</a></div>
                        <div className={`s-center-div ${this.state.l === 2 ? 's-active' : ''}`}>
                            <a name="tly-a"
                               onClick={() => this.onClick('地磁', 321, 321, 321)}>地&nbsp;
                                磁</a></div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default CP


