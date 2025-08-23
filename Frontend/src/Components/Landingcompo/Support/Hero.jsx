import React from 'react'

const Hero = () => {
  return (
    <div className="w-full bg-blue-700">
    <div className="container grid md:grid-cols-2 gap-10 md:px-20">
      <div className="">
        <p>Support portal</p>
        <div className=" flex flex-col">
          <p>Search for an answer or browse help topics to create a ticket</p>
          <input type="text" className='text-center w-80 text-sm opacity-80 bg-white rounded-2xl' placeholder='Eg :how do I activat F&O,why my order is getting rejected...' />
          <a href="">Track account opening</a>
          <a href="">Track segement activation </a>
          <a href="">intraday</a>
          <a href="">margins</a>
          <a href="">kite user manual</a>
        </div>
      </div>
      <div className=""></div>
    </div>
    </div>
  )
}

export default Hero