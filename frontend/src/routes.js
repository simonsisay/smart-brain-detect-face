import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './Components/App'
import SignInForm from './Components/SignInForm'
import Register from './Components/Register'
import { AuthContext } from './AuthContext'


const Routes = () => {
	return(
		<AuthContext.Consumer>
		{context => (
				<Router>
					<Switch>
						<Route 
							path="/signin" 
							render={(props) => 
								<SignInForm 
									{...props} 
									signInUser={context.signInUser} 
									loadUser={context.loadUser}
								/>
						} />
						<Route 
								path="/" 
								render={(props) => context.isAuth ?
									 <App {...props} user={context.user}/> :
									 <SignInForm 
									 	 {...props} 
									 	 signInUser={context.signInUser} 
									 	 loadUser={context.loadUser} 
									  /> } 
								exact 
						/>
						<Route 
							path="/register" 
							render={(props) => 
								<Register 
									{...props} 
									registerUser={context.registerUser} 
									loadUser={context.loadUser} 
								/> }
						/>
					</Switch>
				</Router>
			)
		}
		</AuthContext.Consumer>
	)
}

export default Routes