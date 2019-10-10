// eslint-disable-next-line
import React from 'react';
import { connect } from 'react-redux'
import app from '../components/app'

// Map Redux State to component props
const mapStateToProps = state => {
    // console.log(state, 123)
    return {
    }
}
// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
    }
}
// Connect component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(app)

export default App;
