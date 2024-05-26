import React from 'react'
import DolphinLoader from './(blog)/components/loaders/DolphinLoader';

const loading = () => {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <DolphinLoader />
      </div>
    )
}

export default loading;