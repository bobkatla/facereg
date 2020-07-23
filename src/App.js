import React from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';

// const pacOptions = {
//   "particles": {
//       "number": {
//           "value": 50
//       },
//       "size": {
//           "value": 3
//       }
//   },
//   "interactivity": {
//       "events": {
//           "onhover": {
//               "enable": true,
//               "mode": "repulse"
//           }
//       }
//   }
// }

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
        }
    }

    onInputChange = (e) => {
        this.setState({input: e.target.value});
    }

    calculateFaceBox = (data) => {
        // console.log(data);
        let result = [];
        const img = document.getElementById('inputImg');
        const width = Number(img.width);
        const height = Number(img.height);
        // console.log(width, height);

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
        // console.log(box);
        this.setState({box: box});
    }

    onSubmit = () => {
        this.setState({imgUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.showFaceBox(this.calculateFaceBox(response)))
            .catch(err => console.log(err));
    }

    render(){
        return (
            <div className='App'>
                <Particles className='particles' params={pacOptions} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onSubmit={this.onSubmit}
                />
                <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
            </div>
          );
    }
}

export default App;
