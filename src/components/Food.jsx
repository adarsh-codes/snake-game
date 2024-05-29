import React from 'react'

const Food = ({food}) => {
  return (
    <div
    className="absolute bg-red-500"
    style={{
      left: `${food[0]}%`,
      top: `${food[1]}%`,
      width: '15px',
      height: '15px',
    }}
  ></div>
  )
}

export default Food
