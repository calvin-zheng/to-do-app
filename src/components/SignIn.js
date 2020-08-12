import React, {Component} from 'react';
import { Link } from "@reach/router";

class SignIn extends Component{
    constructor(){
        super();
        this.state = {email: '', password: '', error: null };
    }

    signInWithEmailAndPasswordHandler(event, email, password){
        event.preventDefault();
    }

    onChangeHandler(event) {
        const {name, value} = event.currentTarget;
        if(name === 'userEmail'){
            this.setState({email: value});
        }
        else if(name === 'userPassword'){
            this.setState({password: value});
        }
    }

    render(){
        return (
            <div className="mt-8">
                <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
                <div classname="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                    {this.state.error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{this.state.error}</div>}
                    <form classname="">
                        <label htmlFor="userEmail" className="block">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="my-1 p-1 w-full"
                            name="userEmail"
                            value={this.state.email}
                            placeholder="Email"
                            id="userEmail"
                            onChange = {e => this.onChangeHandler(e)}
                        />
                        <label htmlFor="userPassword" className="block">
                            Password:
                        </label>
                        <input
                            type="password"
                            className="mt-1 mb-3 p-1 w-full"
                            name="userPassword"
                            value={this.state.password}
                            placeholder={"Password"}
                            id="userPassword"
                            onChange = {e => this.onChangeHandler(e)}
                        />
                        <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(e) => {this.signInWithEmailAndPasswordHandler(e, this.state.email, this.state.password)}}>
                            Sign in
                        </button>
                    </form>
                    <p className="text-center my-3">or</p>
                    <button
                        className="bg-red-500 hover:bg-red-600 w-full py-2 text-white">
                        Sign in with Google
                    </button>
                    <p className="text-center my-3">
                        Don't have an account?{" "}
                        <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                            Sign up here
                        </Link>{" "}
                        <br />{" "}
                        <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>
        )
    };
}

export default SignIn;
