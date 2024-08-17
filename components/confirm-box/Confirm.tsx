import React, {useState} from 'react'
import {Box, Typography, Modal} from '@mui/material'

export default function Confirm() {

  const [modalOpen,setModalOpen] = useState(true)
  

  return (
    <>
    <Modal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{position: 'relative',zIndex: '50',width: '342px',height: '350px', borderRadius: '10px', border: '0.2px solid #00000040', top: 'calc(50% - 175px)', left: 'calc(50% - 171px)',backgroundColor: '#FFFFFF',outline:'none'}}>

      <svg className='absolute top-[57px] left-[111px]' width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 110C87.6125 110 110 87.6125 110 60C110 32.3875 87.6125 10 60 10C32.3875 10 10 32.3875 10 60C10 87.6125 32.3875 110 60 110Z" fill="url(#paint0_linear_3_1612)" />
        <path d="M40 65C45.5228 65 50 60.5228 50 55C50 49.4772 45.5228 45 40 45C34.4772 45 30 49.4772 30 55C30 60.5228 34.4772 65 40 65Z" fill="white" />
        <path d="M80 65C85.5228 65 90 60.5228 90 55C90 49.4772 85.5228 45 80 45C74.4772 45 70 49.4772 70 55C70 60.5228 74.4772 65 80 65Z" fill="white" />
        <path d="M40 60C42.7614 60 45 57.7614 45 55C45 52.2386 42.7614 50 40 50C37.2386 50 35 52.2386 35 55C35 57.7614 37.2386 60 40 60Z" fill="#343434" />
        <path d="M80 60C82.7614 60 85 57.7614 85 55C85 52.2386 82.7614 50 80 50C77.2386 50 75 52.2386 75 55C75 57.7614 77.2386 60 80 60Z" fill="#343434" />
        <path d="M60 97.5C48.955 97.5 40 88.545 40 77.5C40 76.12 41.12 75 42.5 75H77.5C78.88 75 80 76.12 80 77.5C80 88.545 71.045 97.5 60 97.5Z" fill="#343434" />
        <path d="M73.8425 80H46.1575C45.5175 80 45 79.4825 45 78.8425V75H75V78.8425C75 79.4825 74.4825 80 73.8425 80Z" fill="white" />
        <path d="M48.02 93.4875C51.3625 95.995 55.5 97.5 60 97.5C64.5 97.5 68.6375 95.995 71.98 93.4875C69.2425 89.855 64.9 87.5 60 87.5C55.1 87.5 50.7575 89.855 48.02 93.4875Z" fill="url(#paint1_linear_3_1612)" />
        <defs>
          <linearGradient id="paint0_linear_3_1612" x1="25.0775" y1="25.0775" x2="95.275" y2="95.275" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FEDE00" />
            <stop offset="0.519" stop-color="#FECC00" />
            <stop offset="1" stop-color="#FFB700" />
          </linearGradient>
          <linearGradient id="paint1_linear_3_1612" x1="60" y1="103.01" x2="60" y2="90.02" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F05964" />
            <stop offset="1" stop-color="#D4414C" />
          </linearGradient>
        </defs>
      </svg>

      <p className='absolute w-[310px] h-[31px] text-[18px] font-semibold leading-[31px] text-center left-[16px] bottom-[109px]' style={{direction: 'rtl'}}>سفارش شما با موفقیت ثبت شد!</p>
      <p className='absolute w-[232px] h-[36px] text-[14px] font-medium leading-[18px] text-center left-[55px] bottom-[58px]' style={{direction: 'rtl'}}>کافیه چند دقیقه دیگه منتظر بمونی تا با یه غذای خوشمزه از خجالتت دربیایم :)</p>
  </Box>
</Modal>


    </>
  )
}
