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
            fz: 1342312
        }

        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.listenHwDiv = this.listenHwDiv.bind(this);
        this.onClick = this.onClick.bind(this);

    }
    componentDidMount(){
        document.addEventListener("keydown", this.listenHwDiv)
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.listenHwDiv)
    }
    onClick() {
        const v = $('#sel-hw').val();
        console.log('v : ', v);
        this.setState({ gz: 1243123,
            fz: 1342312});
    }
    listenHwDiv = (e) => {
        const _this = this;
        if(e && e.keyCode){
            switch(e.keyCode) {
                case 67://Choose 'C' 67
                    $('#sel-hw').focus()
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
                    <div className="">
                        <div className="p-text"><select className="p-select" id="sel-hw">
                            <option value="">P1</option>
                            <option value="">P2</option>
                            <option value="">P3</option>
                            <option value="">P4</option>
                            <option value="">P5</option>
                        </select></div>
                    </div>
                    <div className="p-center">
                        <div className="p-text">光值：{this.state.gz}</div>
                    </div>
                    <div className="p-bottom">
                        <div className="p-text">阈值：{this.state.fz}</div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default HW


