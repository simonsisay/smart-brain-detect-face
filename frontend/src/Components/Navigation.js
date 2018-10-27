import React from 'react'
import { Link } from 'react-router-dom'


const Navigation = (props) => {
		return (
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<Link to={props.navLink === 'Sign out' || props.navLink === 'Sign in' ? '/signin' : '/register'}>
					<p 
						className="f3 link dim black pa3 pointer underline"
						onClick={() => localStorage.removeItem('credential')}
					>
						{props.navLink}
					</p>
				</Link>
			</nav>
		)
}

export default Navigation