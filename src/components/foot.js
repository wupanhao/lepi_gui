import React from 'react';
import {Component} from 'react';
import history from '../public/js/history';
import $ from  'jquery';

import {
    Link
} from 'react-router-dom';
class Foot extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.goBack = this.goBack.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onFootKeyDown = this.onFootKeyDown.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onFootKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onFootKeyDown)
    }
    goBack(){
        history.goBack(-1)
    }
    onFootKeyDown = (e) => {
        const _this = this;
        if(e && e.keyCode) {
            switch (e.keyCode) {
                case 66:// 'B' 66，返回
                    _this.goBack();
                    break;
                case 72://'H'   对应Home键
                    $('a[name="jslp-home"]')[0].click();
                    break;
            }
        }

    }
    render() {
        return (
            <div className="s-bottom">
                <div className="left"><Link name="jslp-home" to="/main">主页</Link></div>
                <div className="right"><a onClick={() => this.goBack()}>返回</a></div>
            </div>
        )
    }
}

export default Foot


