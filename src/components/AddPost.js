import React from "react";
import {connect} from "react-redux";
import {addPost} from "../state/actions";

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.submitHandler=this.submitHandler.bind(this)
        this.changeInputHandler=this.changeInputHandler.bind(this)
        this.state = {
            text: ''
        }
    }

    submitHandler = event => {
        event.preventDefault()
        const text = this.state.text

        const newPost = {
            text,
            id: Date.now().toString()
        }

        this.props.addPost(newPost)

        this.setState({text: ''})
    }

    changeInputHandler = event => {
        event.persist()
        this.setState(prev => ({...prev, ...{
                [event.target.name]: event.target.value
            }}))
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="form-group">
                    <label htmlFor="text">What is on your mind?</label>
                    <textarea
                           className="form-control"
                           id="text"
                           name="text"
                           value={this.state.text}
                           onChange={this.changeInputHandler}
                    />
                    <button className="btn btn-success btn-block" type="submit">POST</button>
                </div>
            </form>
        )
    }

}

const mapDispatchToProps = {
    addPost
}

export default connect(null, mapDispatchToProps)(AddPost)