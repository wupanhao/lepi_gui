import React from 'react';
import {Component} from 'react';
import Header from './header';
import bt1 from '../public/images/bt1.png';
import bt2 from '../public/images/bt2.png';
import history from '../public/js/history';
import $ from  'jquery';

class LY extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true,
            deviceId: null,
            isSelect: false,
            i: -1
        }
        this.onClick = this.onClick.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onChecked = this.onChecked.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onLyKeyDown = this.onLyKeyDown.bind(this);

    }

    componentDidMount() {
        document.addEventListener("keydown", this.onLyKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onLyKeyDown)
    }
    onLyKeyDown = (e) => {
        // console.log('keyCode : ', e.keyCode);
        const _this = this;
        const divs = $('.ly-down-li');
        const i = _this.state.i;
        if(i === -1){
            _this.setState({i: 0});
        }
        if(e && e.keyCode){
            switch(e.keyCode) {
                case 13://回车事件
                    const links = $('a[name="li-a"]');
                    if(links.length > 0 && i != -1){
                        links[this.state.i].click();
                    }
                   /* if(i === -1){
                        _this.setState({i: 0});
                    }*/
                    break;
                case 38://上
                    if (i - 1 >= 0 && i - 1 < divs.length) {
                        _this.setState({i: i - 1});
                    }
                    break;
                case 40://下
                    if (i >= 0 && i + 1 < divs.length) {
                        _this.setState({i: i + 1});
                    }
                    break;
                case 82:// 'R' 82
                    _this.onClick();
                    break;
                case 66://B, 返回
                    // console.log('li-back : ', $('#li-back'));
                    $('#li-back')[0].click();
                    break;
                case 67://C， 67
                    $('#ly-check')[0].click();
                    break;
            }
        }
    }
    onClick() {
        this.setState({isOpen: !this.state.isOpen});
    }
    goBack(){
        history.goBack(-1)
    }
    onSelected(devId){
        this.setState({deviceId: devId})
    }
    onChecked(){
        console.log(this.state.deviceId);
    }
    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <div className="ly-up"><div className="ly-l">蓝牙{this.state.isOpen ? '开启' : '关闭'}</div><div className="ly-r"><a onClick={() => this.onClick()}><img src={this.state.isOpen ? bt1 : bt2} alt=""/></a></div></div>
                    <div className="ly-down">
                        <ul>
                            <li className={`ly-down-li ${this.state.i === 0 ? 'li-active' : ''}`}>
                                <a name="li-a" onClick={() => this.onSelected('7F:6F18:78:BF:F6')}>设备1 7F:6F18:78:BF:F6</a> {this.state.deviceId === '7F:6F18:78:BF:F6' ? '√' : ''}
                            </li>
                            <li className={`ly-down-li ${this.state.i === 1 ? 'li-active' : ''}`}>
                                <a name="li-a" onClick={() => this.onSelected('7F:6F18:78:BF:F5')}>设备2 7F:6F18:78:BF:F5</a> {this.state.deviceId === '7F:6F18:78:BF:F5' ? '√' : ''}
                            </li>
                            <li className={`ly-down-li ${this.state.i === 2 ? 'li-active' : ''}`}>
                                <a name="li-a" onClick={() => this.onSelected('7F:6F18:78:BF:F4')}>设备3 7F:6F18:78:BF:F4</a> {this.state.deviceId === '7F:6F18:78:BF:F4' ? '√' : ''}
                            </li>
                            <li className={`ly-down-li ${this.state.i === 3 ? 'li-active' : ''}`}>
                                <a name="li-a" onClick={() => this.onSelected('7F:6F18:78:BF:F3')}>设备4 7F:6F18:78:BF:F3</a> {this.state.deviceId === '7F:6F18:78:BF:F3' ? '√' : ''}
                            </li>
                            <li className={`ly-down-li ${this.state.i === 4 ? 'li-active' : ''}`}>
                                <a name="li-a" onClick={() => this.onSelected('7F:6F18:78:BF:F2')}>设备5 7F:6F18:78:BF:F2</a> {this.state.deviceId === '7F:6F18:78:BF:F2' ? '√' : ''}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="s-bottom">
                    <div className="left"><a id="ly-check" onClick={() => this.onChecked()}>选择</a></div>
                    <div className="right"><a id="li-back" onClick={() => this.goBack()}>返回</a></div>
                </div>
            </div>
        )
    }
}

export default LY


