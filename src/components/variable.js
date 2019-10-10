import React from 'react';
import { Component } from 'react';
import Header from './header';
import Footer from './foot';
class Variable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="v-body">
                    <div className="v-img-l">
                        <div className="v-div-variable v-color-y">变量1</div>
                    </div>
                    <div className="v-img-r">
                        <div className="v-div-variable v-color-b"></div>
                    </div>
                    <div className="v-img-l">
                        <div className="v-div-variable v-color-b"></div>
                    </div>
                    <div className="v-img-r">
                        <div className="v-div-variable v-color-b"></div>
                    </div>
                    <div className="v-img-l">
                        <div className="v-div-variable v-color-b"></div>
                    </div>
                    <div className="v-img-r">
                        <div className="v-div-variable v-color-b"></div>
                    </div>
                    <div className="v-img-l">
                        <div className="v-div-variable v-color-b"></div>
                    </div>
                    <div className="v-img-r">
                        <div className="v-div-variable v-color-b"></div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Variable


