'use client'

import {useState, useEffect} from "react"
import Image from "next/image"
import {Backdrop, CircularProgress, Button, Modal, Box, Typography, Tooltip} from "@mui/material"
import {useRouter} from "next/navigation"

export default function Login() {
  // First Phase
  const [phone, setPhone]=useState<string>('')
  const [isPhoneValid, setIsPhoneValid]=useState<boolean>(false)
  const phoneRegex=/^(\+98|0)?9\d{9}$/

  // Second Phase
  const [code, setCode]=useState<string>('')
  const [generatedCode, setGeneratedCode]=useState<number|null>(null)
  const [isLogin, setIsLogin]=useState<boolean>(false)

  // Timer for login
  const [timeLeft, setTimeLeft]=useState<number>(20) // 20s

  // Other Settings
  const [isBackdropOpen, setIsBackdropOpen]=useState(false)

  const [isModalOpen, setIsModalOpen]=useState(false);
  const modalHandleOpen=() => setIsModalOpen(true);
  const modalHandleClose=() => setIsModalOpen(false);

  const router=useRouter()

  useEffect(() => {
    if (isPhoneValid&&timeLeft>0&&!isModalOpen) {
      const timer=setInterval(() => {
        setTimeLeft((prev) => prev-1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft===0) {
      setGeneratedCode(null)
    }
  }, [timeLeft, isPhoneValid, isModalOpen])

  const phoneInputHandler=(e: any) => {
    if (e.key==='Enter') {
      phoneValidation()
      e.target.value=''
    }
  }

  const phoneValidation=() => {
    let i=0
    if (phoneRegex.test(phone)) {
      setIsBackdropOpen(true)
      new Promise(res => {
        setInterval(() => {
          i===2? (
            setIsBackdropOpen(false),
            res(null)
          )
            :null
          i++
        }, 1000)
      }).then(() => {
        setIsPhoneValid(true)
        generateCode()
      })
    }
  }

  const codeInputHandler=(e: any) => {
    if (e.key==='Enter') {
      validateCode()
      e.target.value=''
    }
  }

  const generateCode=() => {
    const newCode=Math.floor(10000+Math.random()*90000)
    setGeneratedCode(newCode)
    setTimeLeft(20)
    modalHandleOpen()
  }

  const validateCode=() => {
    if (+code===generatedCode) {
      localStorage.setItem('isLoggedIn', 'true')
      setIsLogin(true)
    }
  }

  if (isLogin||localStorage.getItem('isLoggedIn')) {
    router.push('/')
  }

  return (
    <div className="relative z-50 bg-white w-full h-full">
      <Backdrop
        sx={{
          color: '#fff',
          outline: 'none',
          zIndex: 100,
          position: 'fixed',
        }}
        open={isBackdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={isModalOpen}
        onClose={modalHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '350px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            outline: 'none',
            p: 4,
            zIndex: 110,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p className="font-Vazir text-right">
              !پیام
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2, direction: 'rtl'}}>
            <span className="font-Vazir text-right ml-[2px] h-3 leading-3">
              کد شما جهت ورود:
            </span>
            <Tooltip title="برای کپی کلیک کنید" arrow><span className="cursor-pointer font-Vazir h-3 leading-3" onClick={() => {navigator.clipboard.writeText(`${generatedCode}`), modalHandleClose()}}>{generatedCode}</span></Tooltip>
          </Typography>
        </Box>
      </Modal>

      <div className="flex flex-col justify-between items-center w-[117px] h-[164px] absolute top-[150px] sm:top-[220px]" style={{left: '50%', transform: 'translateX(-50%)'}}>
        <Image onDragStart={(e) => e.preventDefault()} className="select-none" src={'images/icon.svg'} width={117} height={117} alt="logo" />
        <div className="flex justify-between w-[117px] h-[36px]">
          <span className="w-[44px] h-[36px] font-medium text-lg text-center text-black select-none font-Vazir">BEH</span>
          <span className="w-[69px] h-[36px] font-extrabold text-lg text-center text-[#F6510B] select-none font-Vazir">FOOD</span>
        </div>
      </div>

      {isPhoneValid? (
        <>
          <input
            placeholder={`کد فعالسازی`}
            className="absolute block w-[90%] max-w-[280px] h-[47px] rounded-[8px] px-4 py-3 border-[0.5px] top-[350px] sm:top-[433px] text-right text-black font-Vazir text-sm"
            style={{left: '50%', transform: 'translateX(-50%)'}}
            type="number"
            onChange={(e) => setCode(e.target.value)}
            onKeyUp={codeInputHandler}
            value={code}
          />
          <button
            className="block w-[90%] max-w-[280px] h-[47px] rounded-[8px] px-4 py-[10px] text-white bg-[#F6510B] absolute top-[400px] sm:top-[497px] font-Vazir text-sm"
            style={{left: '50%', transform: 'translateX(-50%)'}}
            onClick={validateCode}
          >
            ورود
          </button>
          <button
            className={`w-[280px] h-5 text-[#1C1B1F] fixed opacity-[38%] bottom-5 font-Vazir text-sm font-bold ${timeLeft===0? 'hover:underline':'cursor-auto'}`}
            onClick={generateCode}
            style={{marginLeft: 'calc(50% - 140px)'}}
          >
            {`ارسال مجدد کد فعالسازی (${Math.floor(timeLeft/60).toString().padStart(2, '0')}:${(timeLeft%60).toString().padStart(2, '0')})`}
          </button>
        </>
      ):(
        <>
          <input
            placeholder={`شماره تلفن همراه`}
            className="block w-[90%] max-w-[280px] h-[47px] rounded-[8px] px-4 py-3 border-[0.5px] absolute top-[350px] sm:top-[433px] text-right text-black font-Vazir text-sm"
            style={{left: '50%', transform: 'translateX(-50%)'}}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            onKeyUp={phoneInputHandler}
          />
          <button
            className="block w-[90%] max-w-[280px] h-[47px] rounded-[8px] px-4 py-[10px] text-white bg-[#F6510B] absolute top-[400px] sm:top-[497px] font-Vazir text-sm"
            style={{left: '50%', transform: 'translateX(-50%)'}}
            onClick={phoneValidation}
          >
            دریافت کد فعالسازی
          </button>
        </>
      )}
    </div>
  )
}