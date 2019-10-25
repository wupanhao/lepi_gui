import React from 'react';
import {
    Component
} from 'react';
import ly1 from '../public/images/ly1.png';
import yy from '../public/images/yy.png';
import sy from '../public/images/yl2.png';
import zt from '../public/images/zt.png';
import czcp from '../public/images/czcp.png';
import bbxx from '../public/images/bbxx.png';
import Header from './header';
import Footer from './foot';
import {
    Link
} from 'react-router-dom';
import $ from 'jquery';

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            s: -1,
        }
        this.listenTestDiv = this.listenTestDiv.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

    }
    componentDidMount() {
        document.addEventListener("keydown", this.listenTestDiv)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.listenTestDiv)
    }
    listenTestDiv = (e) => {
        const _this = this;
        const divs = $('.s-img-l');
        const i = _this.state.s;
        if(i === -1){
            _this.setState({s: 0});
        }
        if (e && e.keyCode) {
            switch (e.keyCode) {
                case 13: //回车事件
                    const links = $('a[name="set-a"]');
                    if (links.length > 0 && i != -1) {
                        links[this.state.s].click();
                    }
                   /* if (i === -1) {
                        _this.setState({
                            s: 0
                        });
                    }*/
                    break;
                case 38:
                    if (i - 2 >= 0 && i - 2 < divs.length) {
                        _this.setState({
                            s: i - 2
                        });
                    }
                    break;
                case 40:
                    if (i >= 0 && i + 2 < divs.length) {
                        _this.setState({
                            s: i + 2
                        });
                    }
                    break;
                case 37:
                    if (i >= 1 && i - 1 < divs.length) {
                        _this.setState({
                            s: i - 1
                        });
                    }
                    break;
                case 39:
                    if (i >= 0 && i + 1 < divs.length) {
                        _this.setState({
                            s: i + 1
                        });
                    }
                    break;
            }
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="s-body">
                    <div className={`s-img-l ${this.state.s === 0 ? 'active' : ''}`}>
                        <Link to="/ly" name="set-a"><img src={ly1} alt=""/><div>蓝牙</div></Link>
                    </div>
                    <div className={`s-img-l ${this.state.s === 1 ? 'active' : ''}`}>
                        <Link to="/yy" name="set-a"><img src={yy} alt=""/><div>语言</div></Link>
                    </div>
                    <div className={`s-img-l ${this.state.s === 2 ? 'active' : ''}`}>
                        <Link to="/yl" name="set-a"><img src={sy} alt=""/><div>声音</div></Link>
                    </div>
                    <div className={`s-img-l ${this.state.s === 3 ? 'active' : ''}`}>
                        <img src={zt} alt=""/>
                        <div>主题</div>
                    </div>
                    <div className={`s-img-l ${this.state.s === 4 ? 'active' : ''}`}>
                        <Link to="/czcp" name="set-a"><img src={czcp} alt=""/><div>重置磁盘</div></Link>
                    </div>
                    <div className={`s-img-l ${this.state.s === 5 ? 'active' : ''}`}>
                        <Link to="/bbxx" name="set-a"><img src={bbxx} alt=""/><div>版本信息</div></Link>
                    </div>
                </div>
                <Footer/>
                </div>
        )
    }
}

export default Setting