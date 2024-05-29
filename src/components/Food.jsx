import React from 'react'

const Food = ({food}) => {
  return (
    <div
    className="absolute bg-red-500"
    style={{
      left: `${food[0]}%`,
      top: `${food[1]}%`,
      width: '1%',
      height: '2%',
    }}
  ></div>
  )
}

export default Food
