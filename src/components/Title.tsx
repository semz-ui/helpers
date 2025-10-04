import React from 'react'

const Title = ({title}:{title:string}) => {
  return (
      <h2 className="text-center font-bold text-lg mb-4">{title}</h2>
  )
}

export default Title