import React from 'react';
import {Component} from 'react';
import Header from './header';
import Footer from './foot';
class BBXX extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    <div className="s-czcp">
                        <ul>
                            <li><div className="s-label">名称：</div>乐派1号</li>
                            <li><div className="s-label">版本号：</div>0001</li>
                            <li><div className="s-label">出厂时间：</div>2019-09-1</li>
                            <li><div className="s-label">公司：</div> 京师智创（北京）科技有限公司</li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default BBXX


