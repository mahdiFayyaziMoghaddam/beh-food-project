'use client'

import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import {useRouter} from "next/navigation";
import Cart from '@/components/food-cart/Cart'
import {useEffect, useState} from "react";
//import NoOrder from '@/public/no-order.svg'

export default function Home() {

  const [time, setTime] = useState(new Date().getHours()* 60 + new Date().getMinutes())
  const [showBreakfast, setShowBreakfast] = useState(true)
  const [showLunch, setShowLunch] = useState(true)
  const [shoppingCart, setShoppingCart] = useState([1])
  const router = useRouter()

  useEffect(() => {
    setInterval(()=>{
      setTime(new Date().getHours()* 60 + new Date().getMinutes())
    },60000)

    if(time >= 510){
      setShowBreakfast(false)
    }

    if(time >= 660){
      setShowLunch(false)
    }

  },[time])
  
  return (
    <>
    {!localStorage.getItem('isLoggedIn') && router.push('/login')}
    <Navbar/>
    <div className="flex justify-center items-start fixed z-10 w-[424px] min-h-[750px] top-[92px] left-[66px] ">
      
      {
        shoppingCart.length > 0 ? (
          <div className="relative flex justify-center items-start w-full h-[572px] rounded-[10px] border-[0.2px] border-[#00000040] bg-white">
            <p className="absolute top-[25px] text-[20px] font-semibold">لـیـست سـفـارشـات</p>
            <div className="flex flex-col items-center justify-start absolute bottom-0 w-full h-[480px] gap-2">
              <div className="w-full h-[288px] border-[0.2px] border-[#79747E] "></div>
              <input type="text" placeholder="توضیحات سفارش..." className="w-[404px] h-[100px] text-right leading-[50px] pt-4 px-3 pb-[60px] border-[0.2px] border-[#79747E] rounded-[8px]" style={{direction: 'rtl'}}/>
              <button className="w-[404px] h-[60px] bg-[#F6510B] text-white rounded-[5px] ">ثــبــت سـفـارش</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center absolute z-20 w-[190px] h-[180px] select-none mt-[285px]">
          <Image width="158" height="126" src={'no-order.svg'} alt="no-order" onDragStart={e => e.preventDefault()}/>
          <p className="w-[190px] h-[28px] text-center font-extrabold text-xs font-Vazir text-nowrap text-[#BEBEBE]" onDragStart={e => e.preventDefault()}>!سبد سفارش شما خالیه</p>
          </div>
        )
      }
          
    </div>

    <div className="absolute w-[890px] overflow-y-auto h-auto top-[92px] right-[66px] gap-[16px] z-10">
      <div className="flex flex-nowrap justify-between items-center w-full h-[47px] gap-4">

        <div className="flex justify-between w-[304px] h-[19px]">
          <span className="h-[19px] w-[280px] text-center text-[12px] font-extrabold"> .برای ثبت سفارش تا ساعت 8:30 فرصت دارید</span>
          <Image width={16} height={16} src={'info.svg'} alt="info"/>
        </div>
          <span className="h-full text-[20px] font-semibold leading-[47px]">وعــده صــبـحـانــه</span>
      </div>

      <div className="flex flex-row-reverse justify-start items-end content-start flex-wrap w-full max-h-[440px] overflow-auto z-20 box-border gap-4">
        {
          showBreakfast ? (
            <>
        <Cart onAddClick={() => alert('clicked on add btn')} name='پیتزا پپرونی' title='خمیر پیتزا، پنیر پیتزا، سوسیس پپرونی، گوجه فرنگی، فلفل دلمه‌ای، قارچ، نمک، فلفل، آویشن و جوز هندی' image='pizza.svg' price={17_000} prevPrice={45_000}/>
            </>
          ) : null
        }
        <Cart onAddClick={() => alert('clicked on add btn')} name='پیتزا پپرونی' title='خمیر پیتزا، پنیر پیتزا، سوسیس پپرونی، گوجه فرنگی، فلفل دلمه‌ای، قارچ، نمک، فلفل، آویشن و جوز هندی' image='pizza.svg' price={17_000} prevPrice={45_000}/>
      </div>

      <div className="flex flex-nowrap justify-between items-center w-full h-[47px] gap-4 ">
        <div className="flex justify-between w-[323px] h-[19px]">
          <span className="h-[19px] w-[295px] text-right text-[12px] font-extrabold">.برای ثبت سفارش فقط تا ساعت 11 فرصت دارید</span>
          <Image width={16} height={16} src={'info.svg'} alt="info"/>
        </div>
          <span className="h-full text-[20px] font-semibold leading-[47px]">وعــده نــهــار </span>
      </div>

      <div className="flex flex-row-reverse justify-start items-end content-start flex-wrap w-full max-h-[440px] overflow-auto z-20 box-border gap-4">
      {
        showLunch ? (
          <>
          <Cart onAddClick={() => alert('clicked on add btn')} name='پیتزا پپرونی' title='خمیر پیتزا، پنیر پیتزا، سوسیس پپرونی، گوجه فرنگی، فلفل دلمه‌ای، قارچ، نمک، فلفل، آویشن و جوز هندی' image='pizza.svg' price={17_000} prevPrice={45_000}/>
            </>
          ) : null
      }
      </div>

    </div>
      {/*<div></div>
      <div></div>
      <div></div>*/}

    </>
  );
}
