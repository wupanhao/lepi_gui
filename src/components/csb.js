import React from 'react';
import {
    Component
} from 'react';
import Header from './header';
import Footer from './foot';
import $ from 'jquery';

class CSB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            i: -1,
            data: {
                port: 0,
                id: 0,
                value: 0
            }
        }

        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.listenCsbDiv = this.listenCsbDiv.bind(this);
        this.onClick = this.onClick.bind(this);
        this.updateState = this.updateState.bind(this);

    }
    componentDidMount() {
        document.addEventListener("keydown", this.listenCsbDiv)
        this.update = true
        this.updateState()
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.listenCsbDiv)
        this.update = false
    }
    updateState() {
        var i = this.state.i
        if (i < 0 || i > 4) {
            return setTimeout(this.updateState, 500)
        }
        var ros = document.ros
        if (!(ros && ros.isConnected)) {
            console.log(ros)
            setTimeout(this.updateState, 1000)
            return
        }
        // var that = this
        ros.getSensorInfo(i + 1).then(data => {
            console.log(data)
            if (data.value != -101) {
                if (data.id != 30) {
                    data.value = 0
                }
                this.setState({
                    data: data
                })

            }
            if (this.update) {
                setTimeout(this.updateState, 200)
            }
        })
    }
    onKeyDown(e) {
        const navigation = document.navigation
        if (navigation && navigation(e)) {
            return
        }
    }

    onClick() {
        const data = this.state.data;
        const i = this.state.i;
        this.setState({
            val: data[i] || ''
        });
    }
    listenCsbDiv = (e) => {
        this.onKeyDown(e)
        const _this = this;
        const divs = $('.p-text-span');
        const i = _this.state.i;
        if (i === -1) {
            _this.setState({
                i: 0
            });
        }
        if (e && e.keyCode) {
            // console.log('keyCode : ', e.keyCode);
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
                        <div className="p-line" style={{width:this.state.data.value < 400 ? this.state.data.value*0.5:200 + 'px'}}></div>
                    </div>
                    <div className="p-bottom">{( ()=>{

                        if (this.state.data.value<2000) {
                            return <div> {`${this.state.data.id === 30 ? '距离障碍物：'+this.state.data.value/10.0+' CM' : '未连接'}`} </div>
                        } else {
                            return <div> 超出量程 </div>
                        }
                    })()
                    }

                    </div>
                    <div>
                        <div className="p-text">
                            <span className={`p-text-span ${this.state.i === 0 ? 's-active' : ''}`} value="{this.state.data.value}">S1</span>
                            <span className={`p-text-span ${this.state.i === 1 ? 's-active' : ''}`} value="{this.state.data.value}">S2</span>
                            <span className={`p-text-span ${this.state.i === 2 ? 's-active' : ''}`} value="{this.state.data.value}">S3</span>
                            <span className={`p-text-span ${this.state.i === 3 ? 's-active' : ''}`} value="{this.state.data.value}">S4</span>
                            <span className={`p-text-span ${this.state.i === 4 ? 's-active' : ''}`} value="{this.state.data.value}">S5</span>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}

export default CSB