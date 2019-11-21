// eslint-disable-next-line
import React from 'react';
import { connect } from 'react-redux';
import wifi_pwd from '../components/wifi_pwd';
import actions from '../redux/actions/keyboard';

const mapStateToProps = (state) => ({
    str: state.keyValue.str
});
const mapDispatchToProps = (dispatch) => ({
    setKeyBoardValue(str) {
        dispatch(actions.setValue(str));
    }
});
const WifiPwd = connect(
    mapStateToProps,
    mapDispatchToProps
)(wifi_pwd)

export default WifiPwd;
