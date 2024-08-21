'use client'

import Image from "next/image"

export default function Navbar() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-[74px] border-b-[0.2px] shadow-[2px_2px_10px_0px_#0000000D] fixed top-0 z-50 bg-white">
        <div className="flex justify-around items-center w-[157px] h-[36px]">
          <span className="w-[44px] h-[36px] font-medium text-lg text-center text-black select-none font-Vazir">BEH</span>
        <Image onDragStart={(e) => e.preventDefault()} className="select-none" src={'images/icon.svg'} width={'36'} height={'36'} alt="logo" />
          <span className="  w-auto h-[36px] font-extrabold text-lg text-center text-[#F6510B] select-none font-Vazir">FOOD</span>
        </div>
      </div>
    </>
  )
}


//box-shadow: 2px_2px_10px_0px_#0000000D;
