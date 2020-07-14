import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {`why don't you try a link of image below to see is there any person inside?`}
            </p>
            <div className='center form pa3 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' />
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;