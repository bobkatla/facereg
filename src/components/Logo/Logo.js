import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './logo.png';

const Logo = () => {
    return (
        <div className='na4 mt0 pa5'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 27 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner">
                    <img 
                        style={{paddingTop: '18px'}} 
                        alt='logo' 
                        src={brain} 
                    />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;