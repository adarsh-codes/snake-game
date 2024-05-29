import React from 'react'

const Snake = ({segment}) => {
  return (
    <>
    {
        segment.map((segment, index) => {
          return (
            <div key={index} className="snake absolute bg-green-500 w-4 h-4" style={{left: `${segment[0]}%`, top: `${segment[1]}%`, width: '2%',
            height: '2%',position:''}}></div>
          )
        })
    }
      
    </>
  )
}

export default Snake
