import React from 'react'

interface Props {
    image: string,
    isRight?: boolean,
    heading: string,
    content: string
}

const FeatureSection = ({ image, isRight = true, heading, content }: Props) => {
    return (
        <div className="my-[50px] w-full">
            <h2 className="text-3xl font-bold py-2">{ heading }</h2>
            <div className="grid grid-rows-2 space-between sm:grid-cols-3 sm:grid-rows-1">
                { isRight && <p className="text-[20px] col-span-1 p-1 leading-relaxed">{ content }</p> }
                <div className="col-span-2">
                    <img 
                        className="w-full h-full" 
                        src={image} 
                        alt={image} />
                </div>
                { !isRight && <p className="text-[20px] col-span-1 p-1 leading-relaxed">{ content }</p> }
            </div>
        </div>
    )
}

export default FeatureSection;
