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
import {getAllUsers, test} from './api/api';
import {increaseEntry, apiCall} from './api/api';

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

const intialState = {
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
class App extends React.Component {
    constructor() {
        super();
        this.state = intialState;
    }

    componentDidMount() {
        getAllUsers().then(data => {
            console.log('testing api', data);
        });
        test().then(data => {
            console.log('testing cors', data)
        })
    }

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
        apiCall(this.state.input)
            .then(response => {
                increaseEntry(this.state.user.id).then(entries => {
                    this.setState(Object.assign(this.state.user, {entries}));
                }).catch(console.log)
                this.showFaceBox(this.calculateFaceBox(response))
            })
            .catch(err => console.log(err));
    }

    onChangeRoute = (route) => {
        if (route !== 'home') {
            this.setState(intialState);
        }
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
