import React from 'react';
import {Component} from 'react';
import Header from './header';
import history from '../public/js/history';
import $ from  'jquery';

class CZCP extends Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onYlKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onYlKeyDown)
    }
    onYlKeyDown = (e) => {
        if(e && e.keyCode){
            switch(e.keyCode) {
                case 66: //返回 B
                    $('#czcp-back')[0].click();
                    break;
                case 67: //确定 C
                    $('#czcp-go')[0].click();
                    break;
            }
        }
    }
    onClick() {
        //确定事件处理
    }
    goBack(){
        history.goBack(-1)
    }
    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <div className="s-czcp">
                        <div className="title">是否重置磁盘</div>
                        <div className="s-alert">重置磁盘后你保存的所有数据将丢失！</div>
                    </div>
                </div>
                <div className="s-bottom">
                    <div className="left"><a id="czcp-go" onClick={() => this.onClick()}>确定</a></div>
                    <div className="right"><a id="czcp-back" onClick={() => this.goBack()}>返回</a></div>
                </div>
            </div>
        )
    }
}

export default CZCP


