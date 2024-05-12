import React from 'react'
import { ColorRing } from 'react-loader-spinner';

const CircleLoader = () => {
    return (
        <ColorRing
            height="80"
            width="80"
            colors={["hsl(206, 93%, 52%)", "hsl(206, 93%, 52%)", "hsl(206, 93%, 52%)", "hsl(206, 93%, 52%)", "hsl(206, 93%, 52%)"]}
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
        />
    )
}

export default CircleLoader;