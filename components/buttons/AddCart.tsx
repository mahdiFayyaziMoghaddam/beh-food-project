'use client'
import {useState} from "react"

export default function AddCart({classNameProp,size,onClickProp, closeAfterClick}: any) {

  const [onHover, setOnHover] = useState(false)

  return (
    <>
    <div className={`${classNameProp}`}>
    <button className={`flex justify-center items-center ${size === 'lg' ? ('w-12 h-12') : ('w-6 h-6')} ${onHover ? ('bg-[#F6510B] border-[#FFFFFF]') : ('bg-white border-[#F6510B]')} ${size === 'lg' ? ('border-[0.4px] rounded-[10px]') : ('border-[0.2px] rounded-[5px]')} cursor-pointer`} onMouseOver={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} onClick={() => {onClickProp(),size === 'lg' ? closeAfterClick() : null}}>
    <svg width={size === 'lg' ? 40 : 20} height={size === 'lg' ? 40 : 20} viewBox="0 0 14 16" fill={`${onHover ? ('#FFF') : ('#F6510B')}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M7.91574 3.0499C7.91574 2.55209 7.50717 2.1499 7.00145 2.1499C6.49574 2.1499 6.08717 2.55209 6.08717 3.0499V7.0999H1.97288C1.46717 7.0999 1.05859 7.50209 1.05859 7.9999C1.05859 8.49771 1.46717 8.8999 1.97288 8.8999H6.08717V12.9499C6.08717 13.4477 6.49574 13.8499 7.00145 13.8499C7.50717 13.8499 7.91574 13.4477 7.91574 12.9499V8.8999H12.03C12.5357 8.8999 12.9443 8.49771 12.9443 7.9999C12.9443 7.50209 12.5357 7.0999 12.03 7.0999H7.91574V3.0499Z"/>
    </svg>
    </button>
    </div>
    </>
  )
}
