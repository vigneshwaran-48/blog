import React from 'react'
import { ColorRing } from 'react-loader-spinner';

interface Props {
    width?: number,
    height?: number
}

const CircleLoader = ({ width = 80, height = 80 }: Props) => {
    return (
        <ColorRing
            height={width}
            width={height}
            colors={["hsl(206, 93%, 52%)", "hsl(206, 93%, 52%)", "hsl(206, 93%, 52%)", "hsl(206, 93%, 52%)", "hsl(206, 93%, 52%)"]}
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
        />
    )
}

export default CircleLoader;