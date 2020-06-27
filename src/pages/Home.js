import {connect} from 'react-redux'
import {getUserFromCookies} from "../state/actions";
import Login from '../components/Login'
import React, {Component} from "react";
import Wall from "../components/Wall";
import {Loader} from "../components/Loader";

class Home extends Component {

    componentDidMount() {
        this.props.getUserFromCookies()
    }

    render () {
        return (
            <>
                {this.props.loading ? <Loader/> :
                !this.props.loggedUser.email ? <Login {...this.props}/> : <Wall/>}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        errorLogin: state.app.errorLogin,
        loggedUser: state.userAuth.loggedUser,
        loading: state.userAuth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserFromCookies: () => dispatch(getUserFromCookies())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)