import React, { Component } from 'react'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
			email:'',
			password:''
		}
	}


	handleInputChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSignUp = () => {
		axios({
			method:'post',
			url:'http://localhost:8000/register',
			data:{
				name:this.state.name,
				email:this.state.email,
				password:this.state.password
			}
		})
		.then(response => {
			if(response.status === 200){
				localStorage.setItem('credential', response.data.id)
				this.props.registerUser();
				this.props.history.push('/')
				this.props.loadUser(response.data)
			}
		})
		.catch(error => {
			console.log(error)
		})
	}

	render(){
		return(
			<div>
				<Navigation navLink={'Sign in'} />
					<div className="form-container">
						<div className="signin-form shadow-2">
							<h1>Register</h1>
							<form>
						   <div>
									<label>Name</label>
									<input 
										type="text" 
										name="name"
										value={this.state.name}
										onChange={this.handleInputChange}
									/>
								</div>
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
								<button className="reg-link grow" onClick={this.handleSignUp}>
									Register
								</button>
						</div>
					</div>
			</div>
		)
	}
}

export default Register
