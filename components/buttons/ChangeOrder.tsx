'use client'

import {useState} from 'react'

export default function ChangeOrder({className,onDelete,getCount}: any) {

  const [count,setCount] = useState(1)
  getCount(count)
  
  return (
    <div className={`relative flex flex-nowrap justify-around items-center w-[80px] h-6 border-[#D03F01] border-[0.2px] rounded-[5px] ${className}`} >

<button onClick={() => {setCount((prev:any) => prev+1)}} className='absolute left-[7px]'>
<svg width="14" height="16" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.625 0.5C5.625 0.29375 5.45625 0.125 5.25 0.125C5.04375 0.125 4.875 0.29375 4.875 0.5V4.625H0.75C0.54375 4.625 0.375 4.79375 0.375 5C0.375 5.20625 0.54375 5.375 0.75 5.375H4.875V9.5C4.875 9.70625 5.04375 9.875 5.25 9.875C5.45625 9.875 5.625 9.70625 5.625 9.5V5.375H9.75C9.95625 5.375 10.125 5.20625 10.125 5C10.125 4.79375 9.95625 4.625 9.75 4.625H5.625V0.5Z" fill="#D03F01"/>
</svg>
</button>

<p className='h-full w-auto px-[2px] text-[#D03F01] text-center leading-6 select-none'>{count}</p>

<button onClick={() => {
  setCount((prev:any) => prev-1)
  count <= 1 ? onDelete() : null
  }} className='absolute right-[7px]'>
<svg width="14" height="16" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.125 1C10.125 1.20625 9.95625 1.375 9.75 1.375H0.75C0.54375 1.375 0.375 1.20625 0.375 1C0.375 0.79375 0.54375 0.625 0.75 0.625H9.75C9.95625 0.625 10.125 0.79375 10.125 1Z" fill="#D03F01"/>
</svg>
</button>

    </div>
  )
}
