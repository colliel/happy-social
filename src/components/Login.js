import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {fetchLogin} from "../state/actions";
import {connect} from "react-redux";

const Login = (props) => {
    const [input, setInput] = useState({email: '', password: ''})

    const onInputChange = event => {
        event.persist()
        setInput(prev => ({...prev, ...{
                [event.target.name]: event.target.value
            }}))
    }

    const handleSubmit = event => {
        event.preventDefault()
        const newLogin = {
            email: input.email,
            password: input.password,
            returnSecureToken: true
        }
        props.fetchLogin(newLogin)
    }

    return (
        <>
            <form className="form-signin" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={input.email || ''}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={input.password || ''}
                        onChange={onInputChange}
                    />
                </div>
{/*                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        name="checked"
                        className="form-check-input"
                        id="exampleCheck1"
                        checked={props.check || false}
                        onChange={props.onInputChange}
                    />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>*/}
                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                {props.errorLogin && <p className="error">Error: {props.errorLogin}</p>}
                <div className="text-center mt-3">
                    <NavLink to="/register">Register</NavLink>
                </div>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    fetchLogin
}

export default connect(null, mapDispatchToProps)(Login)