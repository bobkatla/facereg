import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imgUrl, box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImg' alt='' src={imgUrl} width='500px' height='auto'/>
                {/* <div className='bounding-box' style={{top: box.top, right: box.right, bottom: box.bot, left:box.left}}></div> */}
                {
                    box.map((el, i) => {
                        return <div key={i} className='bounding-box' style={{top: el.top, right: el.right, bottom: el.bot, left:el.left}}></div>
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;