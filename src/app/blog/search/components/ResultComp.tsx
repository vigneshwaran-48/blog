import Image from 'next/image';
import React from 'react'

const ResultComp = () => {
    return (
        <div className="w-full h-fit flex align-middle p-7">
            <Image 
                src={"/person.jpg"}
                alt="search result image"
                width={40}
                height={40}
                className="w-14 h-14 rounded-full"
            />
            <div>
                <p>Vigneshwaran</p>
                <b><p>User</p></b>
            </div>
        </div>
    )
}

export default ResultComp;