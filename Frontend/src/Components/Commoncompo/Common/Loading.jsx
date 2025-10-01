import React from 'react';
import { Spinner } from '@radix-ui/themes';
import { assets } from '@/assets/assets';

const Loading = () => {
  return (
    <div className='h-screen flex items-center justify-center flex-col gap-5'>
        <img src={assets.logo} alt="" className="w-[20%] max-sm:w-[40%]" />
        <Spinner size="3" className=""/>
    </div>
  )
}

export default Loading ;