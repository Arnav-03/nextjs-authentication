import React from 'react'

const idpage = ({params}:any) => {
  return (
    <div className="flex flex-col items-center bg-gray-300 h-screen justify-center">
        <h1>profile page</h1>
        <p> user - <span className='text-red-700 font-bold p-2'>{params.id}</span></p>
    </div>
  )
}

export default idpage
