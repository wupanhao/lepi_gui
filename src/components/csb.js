import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
import $ from  'jquery';

class CSB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: 367
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
        const v = $('#sel-csb').val();
        console.log('v : ', v);
        this.setState({val: v});
    }
    listenCsbDiv = (e) => {
        const _this = this;
        if(e && e.keyCode){
            switch(e.keyCode) {
                case 67://Choose 'C' 67
                    $('#sel-csb').focus()
                    break;
                case 13://'enter ' 13
                    _this.onClick();
                    break;
            }
        }

    }

    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <div>
                        <div className="p-text"><select className="p-select" id="sel-csb">
                            <option value="367">P1</option>
                            <option value="368">P2</option>
                            <option value="369">P3</option>
                            <option value="360">P4</option>
                            <option value="361">P5</option>
                        </select></div>
                    </div>
                    <div className="p-center">
                        <div className="p-line"></div>
                    </div>
                    <div className="p-bottom">
                        <div>距离障碍物：{this.state.val} &nbsp;CM</div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default CSB


