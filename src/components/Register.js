import React, {Component} from "react";
import {fetchRegister, showError} from "../state/actions";
import {connect} from "react-redux";

class Register extends Component {
    constructor(props) {
        super(props);
        this.submitHandler=this.submitHandler.bind(this)
        this.changeInputHandler=this.changeInputHandler.bind(this)
        this.state = {
            email: '', password: '', passwordAgain: ''
        }
    }

    submitHandler = event => {
        event.preventDefault()
        const email = this.state.email
        const password = this.state.password
        const passwordAgain = this.state.passwordAgain

        const profile = {
            email,
            password,
            returnSecureToken: true
        }

        if (password !== passwordAgain) {
            const obj = {message: 'Password mismatch'}
            this.props.showError(obj)
        } else {
            this.props.fetchRegister(profile)
                .then(() => this.props.history.push('/'))
            //this.setState({email: '', password: '', passwordAgain: ''})
        }
    }

    changeInputHandler = event => {
        event.persist()
        this.setState(prev => ({...prev, ...{
                [event.target.name]: event.target.value
            }}))
    }

    render(){
        return (
            <>
                <form className="form-signin" onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={this.state.email}
                            onChange={this.changeInputHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={this.state.password}
                            onChange={this.changeInputHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password again</label>
                        <input
                            type="password"
                            name="passwordAgain"
                            className="form-control"
                            value={this.state.passwordAgain}
                            onChange={this.changeInputHandler}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Register</button>
                    {this.props.errorLogin && <p className="error">Error: {this.props.errorLogin}</p>}
                </form>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errorLogin: state.app.errorLogin
    }
}
const mapDispatchToProps =  {
    fetchRegister, showError
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)