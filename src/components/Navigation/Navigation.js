import React from 'react';

const Navigation = ({onChangeRoute, route}) => {
        switch(route) {
            case 'signIn':
                return (
                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <p onClick={() => onChangeRoute('regis')} className='f3 link dim black underline pa3 pointer'>Registration</p>
                    </nav>
                );
            case 'regis':
                return (
                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <p onClick={() => onChangeRoute('signIn')} className='f3 link dim black underline pa3 pointer'>Login</p>
                    </nav>
                );
            case 'home':
                return (
                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <p onClick={() => onChangeRoute('signIn')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                    </nav>
                );
            default:
                return <div></div>;
        }
}

export default Navigation;