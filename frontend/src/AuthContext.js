import React, { Component } from 'react'
import axios from 'axios'

export const AuthContext = React.createContext();

export class AuthProvider extends Component{
	constructor(props){
		super(props);
		this.state = {
			isAuth:false,
			user:{}
		}
	}

	componentDidMount(){
		if(localStorage.getItem('credential')){
			const userId = localStorage.getItem('credential');
			axios.get(`http://localhost:8000/profile/${userId.toString()}`)
			.then(response => {
				this.setState({user:response.data, isAuth:true})
			})
		}
	}

	registerUser = () => {
		this.setState({isAuth:true})
	}

	signInUser = (data) => {
		localStorage.setItem('credential', data.id)
		this.setState({isAuth:true})
	}

	loadUser = (user) => {
		this.setState({user})
	}

	render(){
		return(
			<AuthContext.Provider value={{
				isAuth:this.state.isAuth,
				registerUser:this.registerUser,
				signInUser:this.signInUser,
				loadUser:this.loadUser,
				user:this.state.user
			}}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
}

