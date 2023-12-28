import React from "react";

const MarsSolTimeline = () => {
  return (
    <div className='flex flex-row justify-start md:justify-center mx-auto py-4 px-2'>    
      <div className='flex group hover:bg-accent-300 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center w-16'>
        <div className='flex items-center px-4 py-4'>
          <div className='text-center'>
            <p className='text-gray-900 group-hover:text-gray-100 text-sm transition-all	duration-300'> Sun </p>
            <p className='text-gray-900 group-hover:text-gray-100 mt-3 group-hover:font-bold transition-all	duration-300'> 11 </p>
          </div>
        </div>
      </div>

      <div className='flex group bg-accent shadow-lg dark-shadow rounded-lg mx-1 cursor-pointer justify-center relative  w-16'>
        <span className="flex h-3 w-3 absolute -top-1 -right-1">
          <span className="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-accent-200"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-100"></span>
        </span>
        <div className='flex items-center px-4 py-4'>
          <div className='text-center'>
            <p className='text-gray-100 text-sm'> Wed </p>
            <p className='text-gray-100  mt-3 font-bold'> 14 </p>
          </div>
        </div>
      </div>
      
      <div className='flex group hover:bg-accent-300 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all	duration-300 cursor-pointer justify-center w-16'>
        <div className='flex items-center px-4 py-4'>
          <div className='text-center'>
            <p className='text-gray-900 group-hover:text-gray-100 text-sm transition-all	duration-300'> Thu </p>
            <p className='text-gray-900 group-hover:text-gray-100 mt-3 group-hover:font-bold transition-all	duration-300'> 15 </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarsSolTimeline;