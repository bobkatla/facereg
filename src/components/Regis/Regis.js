import React from 'react';
import {addUser} from '../../api/api';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regisName: '',
            regisEmail: '',
            regisPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({regisName: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({regisEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({regisPassword: event.target.value});
    }

    onSubmitRegis = () => {
        const {regisName, regisEmail, regisPassword} = this.state;
        addUser(regisEmail, regisPassword, regisName)
            .then(user => {
                if(user.id) {
                    this.props.updateUser(user);
                    this.props.onChangeRoute('home');
                }
            });
        // addUser is a promise that returns data, using .then can access that returned data, can read more in api file
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw10 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 center">Registration</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name" 
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitRegis}
                                className="b shadow-3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
                                type="submit" 
                                value="Sign In"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;