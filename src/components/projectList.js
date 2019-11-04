import React from 'react';
import {
    Component
} from 'react';
import Header from './header';
import Footer from './foot';
import {
    Link
} from 'react-router-dom';
import $ from 'jquery';
import file from '../public/images/p.png';

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            i: -1,
            data: [],
            indexList: [], //当前渲染的页面数据
            current: 1, //当前页码
            pageSize: 6, //每页显示的条数
            goValue: 0, //要去的条数index
            totalPage: 0, //总页数
            num: 0,
            isOpen: false
        }
        this.onClick = this.onClick.bind(this);
        this.pageNext = this.pageNext.bind(this);
        this.setPage = this.setPage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onLyKeyDown = this.onLyKeyDown.bind(this);
        this.setNext = this.setNext.bind(this);
        this.setUp = this.setUp.bind(this);
    }

    componentWillMount() {
        const _this = this;
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/getUrlList',
            data: {},
            success: (data) => {
                _this.setState({
                    data: data,
                    totalPage: Math.ceil(data.length / _this.state.pageSize),
                    indexList: data.slice(_this.state.num, _this.state.num + _this.state.pageSize)
                });
            },
            dataType: 'jsonp',

        });
        this.pageNext(this.state.goValue)
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onLyKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onLyKeyDown)
    }
    //设置内容
    setPage(num) {
        this.setState({
            indexList: this.state.data.slice(num, num + this.state.pageSize)
        })
    }
    pageNext(num) {
        this.setPage(num)
    }
    onLyKeyDown = (e) => {
        console.log('keyCode : ', e.keyCode);
        const _this = this;
        const divs = $('.pl-img-l');
        const i = _this.state.i;
        if (i === -1) {
            _this.setState({
                i: 0
            });
        }
        if (e && e.keyCode) {
            switch (e.keyCode) {
                case 13: //回车事件
                    const links = $('a[name="pl-a"]');
                    if (_this.state.i <= links.length && links.length > 0 && i != -1) {
                        links[_this.state.i].click();
                    }
                    if (_this.state.i > links.length || _this.state.i < 0) {
                        _this.setState({
                            i: 0
                        });
                    }
                    /*if (i === -1) {
                     _this.setState({
                     i: 0
                     });
                     }*/
                    break;
                case 27: // Ese
                    $.ajax({
                        type: 'get',
                        url: 'http://localhost:3000/hide_scratch_window',
                        data: {},
                        success: (data) => {
                            console.log(data)
                        },
                        dataType: 'jsonp',
                    });
                case 38:
                    /*if (i - 2 >= 0 && i - 2 < divs.length) {
                        _this.setState({
                            i: i - 2
                        });
                    }*/
                    if (i >= 1 && i - 1 < divs.length) {
                        _this.setState({
                            i: i - 1
                        });
                    }
                    break;
                case 40:
                    /*if (i >= 0 && i + 2 < divs.length) {
                        _this.setState({
                            i: i + 2
                        });
                    }*/
                    if (i >= 0 && i + 1 < divs.length) {
                        _this.setState({
                            i: i + 1
                        });
                    }
                    break;
                case 37:
                    _this.setUp();
                    /*if (i >= 1 && i - 1 < divs.length) {
                        _this.setState({
                            i: i - 1
                        });
                    }*/
                    break;
                case 39:
                    _this.setNext();
                    /*if (i >= 0 && i + 1 < divs.length) {
                        _this.setState({
                            i: i + 1
                        });
                    }*/
                    break;
            }
        }
    }
    onClick(item) {
        console.log(item)
        if (this.state.isOpen) {
            console.log("program running")
            return
        } else {
            if (this.state.i < 0 || this.state.i > this.state.indexList.length) {
                return
            }
            this.setState({
                isOpen: true
            });
            const _this = this;
            const file_path = this.state.indexList[this.state.i]
            $.ajax({
                type: 'get',
                url: 'http://localhost:3000/run_scratch',
                data: {
                    file_path: file_path
                },
                success: (data) => {
                    console.log(data)
                },
                dataType: 'jsonp',
            });
        }
    }
    //下一页
    setNext() {
        if (this.state.current < this.state.totalPage) {
            this.setState({
                num: this.state.num + this.state.pageSize,
                current: this.state.current + 1
            }, function() {
                // console.log(this.state)
                this.pageNext(this.state.num)
            })
        }
    }

    //上一页
    setUp() {
        if (this.state.current > 1) {
            this.setState({
                num: this.state.num - this.state.pageSize,
                current: this.state.current - 1
            }, function() {
                // console.log(this.state)
                this.pageNext(this.state.num)
            })
        }
    }
    render() {
        return (
            <div>
                <Header />
                <div className="s-body">
                    {this.state.indexList.map((d, index) => {
                        return <div key={index} onClick={ this.onClick } className={`pl-img-l ${this.state.i === index ? 'active' : ''}`}>
                                <Link name="pl-a"><img src={file} alt=""/>
                                    <div>{d.substr(d.lastIndexOf('/')+1, d.lastIndexOf('.') - d.lastIndexOf('/') -1)}</div>
                                </Link>
                            </div>
                    })}
                    <div className="page"><span className="page-btn" onClick={ this.setUp } >上一页</span>
                        <span className="common">{ this.state.current }/ { this.state.totalPage }页</span>
                        <span  className="page-btn" onClick={ this.setNext }>下一页</span></div>
                </div>

                <Footer />
            </div>
        )
    }
}

export default ProjectList