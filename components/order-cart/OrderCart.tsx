'use client'

import React, {useEffect, useState} from 'react'
import ChangeOrder from "@/components/buttons/ChangeOrder";

export default function OrderCart({name,price,onRemove,onChangeCount,setValue}:any) {
  
  return (
    <>
      <div className="flex flex-row-reverse justify-between items-end relative w-full h-[72px] border-[#00000040] border-y-[0.2px] bg-white">
        <p className="absolute top-2 right-[10px] w-[281px] h-6 text-[18px] text-right font-semibold">{name}</p>
        <div className="flex flex-row-reverse justify-start w-[120px] h-[22px] gap-[1px] mb-[7px] mr-[10px]">
          <span className="text-[16px] font-bold text-center leading-[22px]">{price}</span>
          <span className="text-[14px] font-medium select-none text-center leading-[22px]">تومان</span>
        </div>
        <ChangeOrder className='mb-2 ml-3' onDelete={onRemove} getCount={(num:number) => {onChangeCount(num),setValue()}} />
      </div> 

    </>
  )
}
