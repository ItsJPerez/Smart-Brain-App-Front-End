import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SingIn';
import Register from './components/Register/Register';

// const returnClarifaiOptions = (imageUrl) => {
//     const PAT = 'ecde3d39e62a4739b605b38da19010d9';
//     const USER_ID = 'f86l451r7pzt';       
//     const APP_ID = 'my-first-application';
//     const IMAGE_URL = imageUrl;

//     const raw = JSON.stringify({
//       "user_app_id": {
//           "user_id": USER_ID,
//           "app_id": APP_ID
//       },
//       "inputs": [
//           {
//               "data": {
//                   "image": {
//                       "url": IMAGE_URL
//                   }
//               }
//           }
//       ]
//     }); 

//     const requestOptions = {
//       method: 'POST',
//       headers: {
//           'Accept': 'application/json',
//           'Authorization': 'Key ' + PAT
//       },
//       body: raw
//     };
//     return requestOptions
// }

const initialState ={
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
     email: '',
    entries: 0,
    joined: ''
  }
}
  
class App extends Component {

  constructor(){
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
  }})
}

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onBtnSubmit = () => {
    this.setState({imageURL: this.state.input})
    fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
}

  onRouteChange = (route) => {
    if(route === 'signedout'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route:route})
  }

  render(){
    const {isSignedIn, imageURL, route, box } = this.state;
    return(
      <div className='App'>
        <ParticlesBg type="cobweb" num={175} bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo/>
        {
          route === 'home' 
          ? <div>
              <Rank name= {this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit}/>
              <FaceRecognition box={box} imageURL={imageURL}/>
          </div>
          : (
            route === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>
          ) 
        }
      </div>
    )
  }
}
export default App;

/* Image Recognition API
  We need STATE so our app knows what the value is the user enters, updates it anytime it gets changes
  The way we get the value of the input is event.target.value
  onInputChange & onBtnSubmit add functionality to the input and the button
 */