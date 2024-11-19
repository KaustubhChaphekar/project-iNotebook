import React from 'react'
import Loading from "../assets/loading.gif"

export const Spinner = () => {
  return (
    <div className='text-center'>
        <img className='my-3 ' src={Loading} alt="Loading" />
    </div>
  )
}
