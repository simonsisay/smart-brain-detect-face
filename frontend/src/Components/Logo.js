import React, {Component} from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import brainLogo from './brain.png'

const Logo = () => {
	return (
		<div className = "ma4  mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 110, width: 110 }} >
			 	<div className="Tilt-inner"> 
			 		<img  className="brain-logo" src={brainLogo} alt="brain-logo" />
			 		<small style={{display:'block'}}> Smart brain</small>
			 	 </div>
			</Tilt>
		</div>
	)
}

export default Logo