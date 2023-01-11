import React, { useState } from 'react'

import { ScaleLoader } from 'react-spinners'

const Spinner = () => {
    const [color, setColor] = useState('blue')
    return (
        <div className='sweet-loading'>
            <div className='container container-fluid d-flex justify-content-center'>
                <div className='ml-5 mt-5'>
                    <div className='mt-5'>
                        <ScaleLoader
                            color={color}
                            size={500}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            speedMultiplier={0.5}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spinner