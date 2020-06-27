import React, {Component} from "react";
import {connect} from "react-redux";
import {editProfileAtDB, getUserFromCookies} from "../state/actions";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.submitHandler=this.submitHandler.bind(this)
        this.changeInputHandler=this.changeInputHandler.bind(this)
        this.state = {
            displayName: (this.props.displayName !== 'undefined') ? this.props.displayName : ''
        }
    }

    componentDidMount() {
        this.props.getUserFromDB()
    }

    submitHandler = event => {
        event.preventDefault()
        const displayName = this.state.displayName

        const profile = {
            displayName,
            photoUrl: '',
            idToken: this.props.idToken,
            returnSecureToken: false
        }

        console.log(this.props.history)

        this.props.editProfileAtDB(profile, this.props.hashid)
            .then(() => this.props.history.push('/profile/'+this.props.hashid))

        //this.setState({displayName: ''})
    }

    changeInputHandler = event => {
        event.persist()
        this.setState(prev => ({...prev, ...{
                [event.target.name]: event.target.value
            }}))
    }

    render(){
        return (
            <div className="profile">

                <div style={{textAlign: "center"}}>
                    <h1>Edit profile</h1>
                </div>
                <form className="form-signin" onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Display Name</label>
                        <input
                            type="text"
                            name="displayName"
                            className="form-control"
                            value={this.state.displayName}
                            onChange={this.changeInputHandler}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                    >Save</button>
                </form>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        idToken: state.userAuth.loggedUser.idToken,
        displayName: state.userAuth.loggedUser.displayName,
        hashid: state.userAuth.loggedUser.hashid
    }
}

const mapDispatchToProps = dispatch =>  {
    return {
        editProfileAtDB: (profile, hashid) => dispatch(editProfileAtDB(profile, hashid)),
        getUserFromDB: () => dispatch(getUserFromCookies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
