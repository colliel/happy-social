import React, {Component} from "react";
import {NavLink, withRouter} from "react-router-dom";
import {getUserFromCookies, removeUserFromCookies} from "../state/actions";
import {connect} from "react-redux";

class Navbar extends Component {

    componentDidMount() {
        this.props.getUserFromCookies()
    }

    handleLogout = () => {
        this.props.logout()
            .then(() => this.props.history.push('/'))
    }

    render(){
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                <div className="navbar-brand">
                    Happy Social
                </div>
                <ul className="navbar-nav justify-content-end">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" exact>Home</NavLink>
                    </li>
                    {this.props.loggedUser &&
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/feed">Feed</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/profile/${this.props.loggedUser}`}>My profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/users"}>Users</NavLink>
                        </li>
                    </>
                    }
                    {!this.props.loggedUser ?
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>
                        :
                        <li className="nav-item">
                            <button className="btn btn-primary" onClick={() => this.handleLogout()}>Log Out</button>
                        </li>
                    }
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.userAuth.loggedUser.hashid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserFromCookies: () => dispatch(getUserFromCookies()),
        logout: () => {
            return dispatch(removeUserFromCookies())
        }
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navbar))