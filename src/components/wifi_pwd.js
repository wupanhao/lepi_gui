import React from 'react';
import {Component} from 'react';
import Header from './header';
import history from '../public/js/history';
import $ from  'jquery';
import Footer from './foot';

class LY extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        console.log(this.props.match.params);
    }
    render() {
        const name = this.props.match.params.name ? this.props.match.params.name: ''
        return (
            <div>
                <Header />
                <div className="s-body">
                    <div><p>{name}的密码</p><input type="text"/></div>
                </div>
               <Footer/>
            </div>
        )
    }
}

export default LY


