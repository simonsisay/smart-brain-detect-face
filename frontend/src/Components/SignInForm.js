import React, { Component } from 'react'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import axios from 'axios'


class SignInForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:'',
			error:''
		}
	}

	handleInputChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}


	handleSignIn = (event) => {
		axios({
			method:'post',
			url:'http://localhost:8000/signin',
			data:{
				email:this.state.email,
				password:this.state.password
			}
		})
		.then(response => {
				this.props.signInUser(response.data);
				this.props.loadUser(response.data)
				this.props.history.push('/')
		})
		.catch(error => {
			console.log(error)
		})
	}



	render(){
		return(
			<div>
				<Navigation navLink={'Register'} />
				<div className="form-container">
					<div className="signin-form shadow-2">
						<h1>Sign in</h1>
						<form>
						   <div>
								<label>Email</label>
								<input 
									type="email" 
									name="email" 
									value={this.state.email} 
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label>Password</label>
								<input 
									type="password" 
									name="password"  
									value={this.state.password}
									onChange={this.handleInputChange}
								/>
							</div>
						</form>

						<div>
							<button className="grow" onClick={this.handleSignIn}>Sign in</button>
							<Link to="/register">
								<p className="reg-link">Register</p>
							</Link>
						</div>

					</div>
				</div>
			</div>
		)
	}
}


export default SignInForm