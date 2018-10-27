import React, {Component} from 'react'
import Navigation from './Navigation'
import Logo from './Logo'
import ImageLinkForm from './ImageLinkForm'
import '../App.css'
import Rank from './Rank'
import Clarifai from 'clarifai'
import FaceRecognition from './FaceRecognition'
import SignInForm from './SignInForm'
import axios from 'axios'



const app = new Clarifai.App({apiKey: '765407f142ad45a888f78f8a622c9c37'});

// https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=350

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageUrl:'',
      detecting:'',
      box:{},
      entries:this.props.user.entries
    }
  }

  handleChange = (event) => {
    this.setState({imageUrl:event.target.value})
  }

  handleSubmit = () => {
    this.setState({detecting:'Detecting faces...'})
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, `${this.state.imageUrl}`)
    
    .then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response))
      this.setState({detecting:''})
    })
    .catch(err => {
      this.setState({detecting:'Please try again...'})
    })
 }

 calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol:face.left_col * width,
      topRow:face.top_row * height,
      rightCol:width - (face.right_col * width),
      bottomRow:height - (face.bottom_row * height)
    }
 }

 displayFaceBox = (box) => {
  this.setState({box:box, entries:this.state.entries + 1})
  this.increaseEntries()
 } 

 increaseEntries = () => {
    axios({
      method:'put', 
      url:'http://localhost:8000/image',
      data:{
        id:this.props.user.id
      }
    })
    .then(response => {
      console.log(response)
    })
 }

  render() {
    console.log(this.props)
    return(
        <div className='App'>
          <Navigation navLink={'Sign out'}/>
          <div>
           <Logo />
            <Rank user={this.props.user} rank={this.state.entries}/>
            <ImageLinkForm 
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit} 
              input={this.state.input} 
              detecting={this.state.detecting}
            />
            <FaceRecognition  link = {this.state.imageUrl} box={this.state.box}/>
          </div>
        </div>
    )
  }
}

export default App