import Image from 'next/image'
import React from 'react'

export default function Cooking({list}: any) {
  return (
    <>
      <div className="relative top-0 w-full h-[122px] rounded-[10px] border-[#00000040] border-[0.2px] bg-white">
        <Image className="absolute top-[11px] right-[17px]" width={100} height={100} src={'images/hat.svg'} alt="paper" />
        <hr className="absolute top-[11px] right-[131px] w-[1px] h-20 border-[0.2px] border-[#00000033]" />
        <p className="absolute w-auto h-[16px] leading-4 top-[27px] right-[153px] font-medium text-[#AFAFAF] text-[10px]" style={{direction: 'rtl'}}>وضعیت سفارش:</p>
        <p className="absolute top-[46px] right-[153px] font-semibold w-auto h-[30px] leading-[30px]" style={{direction: 'rtl'}}>در حال آماده‌سازی</p>
        <div className="flex flex-nowrap flex-row-reverse justify-start overflow-hidden absolute top-[81px] left-[27px] w-[244px] h-[19px] gap-[13px]" >

          {
            list.map((item: {name: string, image: string, number: number}) => {
              return <>
                <div className="relative flex flex-nowrap  min-w-[90px] h-full" style={{direction: 'rtl'}}>
                  <div className="absolute right-0 bottom-0 w-[9px] h-[9px] bg-[#282E40] rounded-full">
                    <p className="absolute w-full h-full text-center text-[0.5px] font-bold leading-[9px] text-white">{item.number}</p>
                  </div>
                  <Image width={19} height={19} src={`images/${item.image}`} alt="food" />
                  <p className="w-auto h-full leading-[19px] text-[10px] mr-1 font-normal text-ellipsis overflow-hidden whitespace-nowrap">{item.name}</p>
                </div>
              </>
            })
          }

        </div>
      </div>
    </>
  )
}
