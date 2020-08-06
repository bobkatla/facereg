import React from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Regis from './components/Regis/Regis';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
// import {getAllUsers} from './api/api';
import {increaseEntry} from './api/api';

const app = new Clarifai.App({
    apiKey: '30d8c08c8fa7433583467d980e8b11f0'
});

const pacOptions = {
  "particles": {
      "number": {
          "value": 160,
          "density": {
              "enable": false
          }
      },
      "size": {
          "value": 10,
          "random": true
      },
      "move": {
          "direction": "bottom",
          "out_mode": "out"
      },
      "line_linked": {
          "enable": false
      }
  },
  "interactivity": {
      "events": {
          "onclick": {
              "enable": true,
              "mode": "remove"
          }
      },
      "modes": {
          "remove": {
              "particles_nb": 10
          }
      }
  }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgUrl: '',
            box: [],
            route: 'signIn',
            user: {
                id: 0,
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    // componentDidMount() {
    //     getAllUsers().then((data) => {
    //         console.log('testing api', data);
    //     });
    // }

    onInputChange = (e) => {
        this.setState({input: e.target.value});
    }

    calculateFaceBox = (data) => {
        let result = [];
        const img = document.getElementById('inputImg');
        const width = Number(img.width);
        const height = Number(img.height);

        data.outputs[0].data.regions.forEach(element => {
            let claFace = element.region_info.bounding_box;
            let box = {
                top: claFace.top_row * width,
                bot: height - (claFace.bottom_row * height),
                left: claFace.left_col * width,
                right: width - (claFace.right_col * width),
            };
            result.push(box);
        });

        return result;
    }

    showFaceBox = (box) => {
        this.setState({box});
    }

    onSubmit = () => {
        this.setState({imgUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                increaseEntry(this.state.user.id).then(entries => {
                    this.setState(Object.assign(this.state.user, {entries}));
                })
                this.showFaceBox(this.calculateFaceBox(response))
            })
            .catch(err => console.log(err));
    }

    onChangeRoute = (route) => {
        this.setState({route})
    }

    updateUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }});
    }

    render(){
        const {imgUrl, box, route, user} = this.state;
        return (
            <div className='App'>
                <Particles className='particles' params={pacOptions} />
                <Navigation 
                    onChangeRoute={this.onChangeRoute}
                    route={route}
                />
                { route === 'signIn'
                    ? <SignIn 
                        onChangeRoute={this.onChangeRoute}
                        updateUser={this.updateUser}
                        />
                    : route === 'regis'
                        ? <Regis 
                            onChangeRoute={this.onChangeRoute}
                            updateUser={this.updateUser}
                            />
                        : <div>
                            <Logo />
                            <Rank user={user}/>
                            <ImageLinkForm 
                                onInputChange={this.onInputChange} 
                                onSubmit={this.onSubmit}
                            />
                            <FaceRecognition 
                                box={box} 
                                imgUrl={imgUrl}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default App;
