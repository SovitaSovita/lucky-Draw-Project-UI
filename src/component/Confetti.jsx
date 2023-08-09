import { duration } from '@mui/material'
import { current } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { number } from 'yup'

export default function Confetti() {

const [winndowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
})

const detectSize = () => {
    setDimension({
        width: window.innerWidth,
        height: window.innerHeight
    })
}

useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
        window.removeEventListener('resize', detectSize)
    }
}, [])

  return (
    <div className=''>
        <ReactConfetti
            width={winndowDimension.width}
            height={winndowDimension.height}
            numberOfPieces={300}
            recycle={true} // This can affect duration
            gravity={0.085}
            wind={.01}
        />
    </div>
  )
}
