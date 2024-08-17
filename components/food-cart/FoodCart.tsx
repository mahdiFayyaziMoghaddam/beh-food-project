'use client'
import Image from "next/image"
import AddCart from '../buttons/AddCart'
import {  Modal,Box,Typography } from "@mui/material"
import {useState} from "react"
import '@/app/globals.css'

export default function Cart({ name , title, image, price, prevPrice,onAddFood}: any) {

  const [isModalOpen, setIsModalOpen] = useState(false)  
  
  return (
    <>
    <div className="flex relative mr-[1px] w-[426px] h-[132px] rounded-[10px] bg-white border-[0.2px] border-[#00000040] font-Vazir">
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
      <div className="absolute top-4 left-4 w-[281px] h-[65px]">
      <p className="w-full h-[25px] font-semibold text-[18px] leading-[25px] text-end">{name}</p>
      <p className="w-full h-[18.75px] font-normal text-[12px] leading-[18.75px] text-right overflow-hidden text-ellipsis whitespace-nowrap" style={{direction: 'rtl'}}>
        {title}
      </p>
      </div>
      <Image className="absolute top-[12px] right-[12px] rounded-[10px]" width={108} height={108} src={image} alt="Food"/>
      </div>
      {
        prevPrice && (
          <del className="absolute bottom-[34px] right-[130px] font-medium text-[10px] text-[#969696]">{prevPrice}</del>
        )
      }
      <div className="flex items-center justify-center absolute bottom-3 right-[130px] w-[85px] h-[22px] gap-[2px]">
        <span className="text-[16px] font-medium select-none">تومان</span>
        <span className="text-[16px] font-semibold">{price}</span>
        </div>
      <AddCart classNameProp="absolute bottom-3 left-[15px]" size='sm' onClickProp={onAddFood}/>
    </div>

    {
      isModalOpen ? (
        <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{backgroundColor: '#FFF', textAlign: 'right', width: '538px', height: '697px', position: 'fixed', top: 'calc(50vh - 348px)', left: 'calc(50vw - 269px)',outline: 'none', borderRadius: '10px'}}>

      <Image className="absolute top-[20px] right-[19px] rounded-[50px] border-[#00000040] border-[0.2px]" width={500} height={500} src={image} alt="Food"/>

        <div className="flex flex-col justify-between absolute top-[529px] left-[19px] w-[500px] h-[75px] text-right">
      <p className="w-full h-[28px] font-semibold text-[25px] leading-[28px] text-end">{name}</p>
      <p className="w-full h-[40px] font-normal text-[17px] leading-[20px] text-right overflow-hidden text-ellipsis" style={{direction: 'rtl'}}>
        {title}
      </p>
      </div>

      <div className="flex flex-row-reverse justify-start absolute bottom-[31px] right-[19px] w-[140px] h-[31px] gap-1 ">
        <span className="text-[20px] font-bold text-center leading-[31px]">{price}</span>
        <span className="text-[16px] font-medium select-none text-center leading-[31px]">تومان</span>
        </div>
        
            <AddCart classNameProp="absolute bottom-[23px] left-[19px]" size='lg' onClickProp={onAddFood} closeAfterClick={() => setIsModalOpen(false)} />
        </Box>

      </Modal>
      ) : null
    }

    </>
  )
}
