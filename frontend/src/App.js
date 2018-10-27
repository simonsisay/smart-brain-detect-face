import React from 'react'
import Routes from './routes'
import Particles from 'react-particles-js'
import { AuthProvider } from './AuthContext'


const particlesOptions = {
        particles: {
         number:{
            value:30,
            density:{
              enable:true,
              value_area:500
            } 
          }
      }
  }

const App = (props) => {
  return(
	  	<AuthProvider>
        <Particles className="particles" params={particlesOptions} />
	     <Routes />
	   </AuthProvider>
  )
}


export default App